"use client";

import FileUpload from "../components/FileUpload";
import DocumentViewer from "../components/DocumentViewer";
import SuggestionPanel from "../components/SuggestionPanel";
import { useDocumentStore } from "../store/useDocumentStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { originalText, improvedText } = useDocumentStore();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        AI Document Assistant
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <FileUpload />
        </CardContent>
      </Card>

      {originalText && improvedText && (
        <Card>
          <CardHeader>
            <CardTitle>Document Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentViewer
              originalText={originalText}
              improvedText={improvedText}
            />
          </CardContent>
        </Card>
      )}

      <SuggestionPanel />
    </main>
  );
}
