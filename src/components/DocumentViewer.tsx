"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentViewerProps {
  originalText: string;
  improvedText: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  originalText,
  improvedText,
}) => {
  return (
    <Tabs defaultValue="side-by-side" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
        <TabsTrigger value="improved-only">Improved Only</TabsTrigger>
      </TabsList>
      <TabsContent value="side-by-side">
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-lg mb-2">Original Document</h2>
            <ScrollArea className="h-[500px]">
              <pre className="whitespace-pre-wrap text-sm">{originalText}</pre>
            </ScrollArea>
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold text-lg mb-2">Improved Document</h2>
            <ScrollArea className="h-[500px]">
              <pre className="whitespace-pre-wrap text-sm">{improvedText}</pre>
            </ScrollArea>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="improved-only">
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-2">Improved Document</h2>
          <ScrollArea className="h-[500px]">
            <pre className="whitespace-pre-wrap text-sm">{improvedText}</pre>
          </ScrollArea>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentViewer;
