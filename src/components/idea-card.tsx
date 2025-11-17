"use client";

import { Idea } from "@/types/idea";
import { humanizeTime } from "@/lib/datetime";
import clsx from "clsx";

type IdeaCardProps = {
  idea: Idea;
  onDeleteClick: (idea: Idea) => void;
  isDeleting: boolean;
  deleteTargetId: string | null;
};

export function IdeaCard({ idea, onDeleteClick, isDeleting, deleteTargetId }: IdeaCardProps) {
  const isCurrent = deleteTargetId === idea.id;

  return (
    <article className="idea-card-shadow relative flex min-h-[180px] flex-col gap-4 rounded-2xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        aria-label="刪除想法"
        onClick={() => onDeleteClick(idea)}
        className={clsx(
          "absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          isCurrent && "bg-accent/20 border-accent text-primary"
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="text-base text-slate-900">{idea.content}</p>
      <span className="mt-auto text-xs font-medium text-slate-400">{humanizeTime(idea.created_at)}</span>

      {isCurrent && isDeleting && (
        <div className="absolute inset-0 rounded-2xl bg-white/70 backdrop-blur-sm" aria-hidden>
          <div className="flex h-full items-center justify-center text-sm font-medium text-primary">
            刪除中...
          </div>
        </div>
      )}
    </article>
  );
}


