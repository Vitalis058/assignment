import { create } from "zustand";

interface Suggestion {
  id: string;
  text: string;
  suggestion: string;
  status: "pending" | "accepted" | "rejected";
}

interface DocumentState {
  originalText: string;
  improvedText: string;
  suggestions: Suggestion[];
  setOriginalText: (text: string) => void;
  setImprovedText: (text: string) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  acceptSuggestion: (id: string) => void;
  rejectSuggestion: (id: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  originalText: "",
  improvedText: "",
  suggestions: [],
  setOriginalText: (text) => set({ originalText: text }),
  setImprovedText: (text) => set({ improvedText: text }),
  setSuggestions: (suggestions) => set({ suggestions }),
  acceptSuggestion: (id) =>
    set((state) => ({
      suggestions: state.suggestions.map((s) =>
        s.id === id ? { ...s, status: "accepted" } : s
      ),
      improvedText:
        state.suggestions.find((s) => s.id === id)?.suggestion ||
        state.improvedText,
    })),
  rejectSuggestion: (id) =>
    set((state) => ({
      suggestions: state.suggestions.map((s) =>
        s.id === id ? { ...s, status: "rejected" } : s
      ),
    })),
}));
