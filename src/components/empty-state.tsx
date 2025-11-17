export function EmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-2xl bg-white p-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/60 text-primary">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold text-slate-700">還沒有任何想法</p>
      <p className="text-sm text-slate-500">新增第一個想法吧！</p>
    </div>
  );
}

