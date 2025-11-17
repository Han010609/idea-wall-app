"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IdeaForm } from "./idea-form";
import { IdeaGrid } from "./idea-grid";
import { SkeletonList } from "./skeleton-list";
import { StateBanner } from "./state-banner";
import { EmptyState } from "./empty-state";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useIdeaStore } from "@/store/idea-store";
import type { Idea } from "@/types/idea";
import { fetchIdeas, insertIdea, removeIdea } from "@/lib/ideas";

type IdeaWallProps = {
  initialIdeas: Idea[];
  initialError?: string | null;
};

export function IdeaWall({ initialIdeas, initialError = null }: IdeaWallProps) {
  const listTopRef = useRef<HTMLDivElement | null>(null);
  const { ideas, initialized, setIdeas, addIdea, removeIdea: removeFromStore } = useIdeaStore();
  const [isCreating, setIsCreating] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [ideaToDelete, setIdeaToDelete] = useState<Idea | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setIdeas(initialIdeas);
    }
  }, [initialized, initialIdeas, setIdeas]);

  const handleCreate = async (content: string) => {
    setIsCreating(true);
    setErrorMessage(null);
    try {
      const idea = await insertIdea(content);
      addIdea(idea);
      toast.success("新增成功");
      requestAnimationFrame(() => {
        listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "新增失敗，請稍後再試";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!ideaToDelete) return;
    setPendingDeleteId(ideaToDelete.id);
    setErrorMessage(null);
    try {
      await removeIdea(ideaToDelete.id);
      removeFromStore(ideaToDelete.id);
      toast.success("刪除成功");
      setIdeaToDelete(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "刪除失敗，請稍後再試";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleRetry = async () => {
    setIsRefreshing(true);
    try {
      const fresh = await fetchIdeas();
      setIdeas(fresh);
      setErrorMessage(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "重新載入失敗";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!initialized) {
    return (
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-16 pt-28">
        <IdeaForm onSubmit={handleCreate} isSubmitting />
        <SkeletonList />
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-16 pt-28">
      <IdeaForm onSubmit={handleCreate} isSubmitting={isCreating} />

      {errorMessage && (
        <StateBanner
          variant="error"
          message={errorMessage}
          actionLabel="重新整理"
          onAction={handleRetry}
          loading={isRefreshing}
        />
      )}

      <div ref={listTopRef} />
      {ideas.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="max-w-idea mx-auto w-full">
          <IdeaGrid
            ideas={ideas}
            onDelete={(idea) => setIdeaToDelete(idea)}
            isDeleting={Boolean(pendingDeleteId)}
            deleteTargetId={pendingDeleteId}
          />
        </div>
      )}

      <ConfirmationDialog
        open={Boolean(ideaToDelete)}
        title="確定要刪除此想法嗎？"
        description="刪除後無法復原，請再次確認。"
        confirmLabel="確認刪除"
        onConfirm={handleDelete}
        onCancel={() => setIdeaToDelete(null)}
        loading={Boolean(pendingDeleteId)}
      />
    </section>
  );
}

