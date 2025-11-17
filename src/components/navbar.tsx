export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-white nav-shadow">
      <div className="mx-auto flex h-20 max-w-screen-2xl flex-row items-center justify-between gap-2 px-6 sm:h-16 sm:flex-row sm:justify-between sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white font-semibold sm:h-10 sm:w-10">
            IW
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold text-slate-900">Idea Wall</span>
            <span className="text-sm text-slate-500 sm:text-xs">靈感一閃即上傳</span>
          </div>
        </div>
        <span className="text-sm font-medium text-primary sm:text-sm">
          歡迎使用
        </span>
      </div>
    </header>
  );
}

