"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDocumentStore } from "@/store/useDocumentStore";
import { toast } from "sonner";

const FileUpload: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { setOriginalText, setImprovedText, setSuggestions } =
    useDocumentStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles?.length) return;

      const file = acceptedFiles[0];
      try {
        setIsProcessing(true);
        let extractedText = "";

        if (file.type === "application/pdf") {
          // Handle PDF file
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/pdfparse", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to process PDF");
          }

          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          extractedText = data.text;
        } else {
          // Handle text file
          extractedText = await file.text();
        }

        setOriginalText(extractedText);

        // After getting the text, enhance it
        const enhanceResponse = await fetch("/api/openrouter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: extractedText }),
        });

        if (!enhanceResponse.ok) {
          throw new Error("Failed to enhance text");
        }

        const enhancedData = await enhanceResponse.json();
        setImprovedText(enhancedData.enhancedText);

        // Create suggestions array from the differences
        const suggestions = [
          {
            id: "1",
            text: extractedText,
            suggestion: enhancedData.enhancedText,
            status: "pending" as const,
          },
        ];

        setSuggestions(suggestions);
        toast.success("File processed successfully!");
      } catch (error) {
        console.error("Error processing file:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to process file"
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [setOriginalText, setImprovedText, setSuggestions]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/plain": [".txt"], "application/pdf": [".pdf"] },
    disabled: isProcessing,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : isProcessing
          ? "border-gray-300 bg-gray-50 cursor-not-allowed"
          : "border-gray-300 hover:bg-gray-50"
      )}
    >
      <input {...getInputProps()} />
      <Upload
        className={cn(
          "mx-auto h-12 w-12",
          isProcessing ? "text-gray-300" : "text-gray-400"
        )}
      />
      <p className="mt-2 text-sm text-gray-600">
        {isProcessing
          ? "Processing file..."
          : isDragActive
          ? "Drop the file here ..."
          : "Drag 'n' drop a .txt or .pdf file, or click to select"}
      </p>
    </div>
  );
};

export default FileUpload;
