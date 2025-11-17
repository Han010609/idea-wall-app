import clsx from "clsx";

type StateBannerProps = {
  variant: "error" | "info";
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
};

export function StateBanner({ variant, message, actionLabel, onAction, loading }: StateBannerProps) {
  const isError = variant === "error";

  return (
    <div
      className={clsx(
        "flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm",
        isError ? "bg-red-100 text-red-700" : "bg-primary/10 text-primary"
      )}
    >
      <span>{message}</span>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          disabled={loading}
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline disabled:text-slate-400"
        >
          {loading ? "處理中..." : actionLabel}
        </button>
      )}
    </div>
  );
}

