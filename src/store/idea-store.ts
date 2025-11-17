import { create } from "zustand";
import type { Idea } from "@/types/idea";

type IdeaState = {
  ideas: Idea[];
  initialized: boolean;
  setIdeas: (ideas: Idea[]) => void;
  addIdea: (idea: Idea) => void;
  removeIdea: (id: string) => void;
};

export const useIdeaStore = create<IdeaState>((set) => ({
  ideas: [],
  initialized: false,
  setIdeas: (ideas) => set({ ideas, initialized: true }),
  addIdea: (idea) =>
    set((state) => ({
      ideas: [idea, ...state.ideas]
    })),
  removeIdea: (id) =>
    set((state) => ({
      ideas: state.ideas.filter((idea) => idea.id !== id)
    }))
}));

