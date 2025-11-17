const skeletons = Array.from({ length: 4 });

export function SkeletonList() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      {skeletons.map((_, index) => (
        <div key={index} className="h-[120px] rounded-2xl bg-slate-200/80 animate-pulse" />
      ))}
    </div>
  );
}

