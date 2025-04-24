"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useDocumentStore } from "@/store/useDocumentStore";

const SuggestionPanel: React.FC = () => {
  const { suggestions, acceptSuggestion, rejectSuggestion } =
    useDocumentStore();

  const handleAccept = (id: string) => {
    acceptSuggestion(id);
    toast.success("Suggestion Accepted");
  };

  const handleReject = (id: string) => {
    rejectSuggestion(id);
    toast("The suggestion has been discarded.");
  };

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
      <ul className="space-y-4">
        {suggestions.map(({ id, text, suggestion, status }) => (
          <li key={id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm">
                  <strong>Original:</strong> {text}
                </p>
                <p className="text-sm mt-1">
                  <strong>Suggestion:</strong> {suggestion}
                </p>
              </div>
              <Badge
                variant={
                  status === "accepted"
                    ? "default"
                    : status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {status}
              </Badge>
            </div>
            <div className="mt-3 space-x-2">
              <Button
                size="sm"
                variant={status === "accepted" ? "default" : "outline"}
                onClick={() => handleAccept(id)}
                disabled={status !== "pending"}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant={status === "rejected" ? "destructive" : "outline"}
                onClick={() => handleReject(id)}
                disabled={status !== "pending"}
              >
                Reject
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionPanel;
