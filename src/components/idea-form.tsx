"use client";

import { FormEvent, useState } from "react";
import clsx from "clsx";

type IdeaFormProps = {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting: boolean;
};

export function IdeaForm({ onSubmit, isSubmitting }: IdeaFormProps) {
  const [value, setValue] = useState("");

  const disabled = isSubmitting || value.trim().length === 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;

    const trimmed = value.trim();
    try {
      await onSubmit(trimmed);
      setValue("");
    } catch {
      // 已在外層顯示錯誤
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-6"
    >
      <label className="sr-only" htmlFor="idea-input">
        新增想法
      </label>
      <input
        id="idea-input"
        type="text"
        placeholder="靈感來了？寫下你的想法..."
        value={value}
        onChange={(event) => setValue(event.target.value.slice(0, 240))}
        className="h-12 flex-1 rounded-xl border border-slate-200 px-4 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 "
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={disabled}
        className={clsx(
          "flex h-10 w-full items-center justify-center rounded-xl text-base font-semibold text-white transition sm:w-40 sm:h-12 ",
          disabled
            ? "bg-[#f1ad8b] text-white/80 cursor-not-allowed"
            : "bg-cta hover:bg-cta-hover"
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            處理中
          </span>
        ) : (
          "新增想法"
        )}
      </button>
    </form>
  );
}

