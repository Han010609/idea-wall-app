import type { Idea } from "@/types/idea";
import { IdeaCard } from "./idea-card";

type IdeaGridProps = {
  ideas: Idea[];
  onDelete: (idea: Idea) => void;
  isDeleting: boolean;
  deleteTargetId: string | null;
};

export function IdeaGrid({ ideas, onDelete, isDeleting, deleteTargetId }: IdeaGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          onDeleteClick={onDelete}
          isDeleting={isDeleting}
          deleteTargetId={deleteTargetId}
        />
      ))}
    </div>
  );
}


