import { BookUp2 } from "lucide-react";
import { userStore } from "../../../store/userStore.store";

export function Header() {
  const { user } = userStore((state) => state);

  return (
    <header className="bg-gradient-to-tl to-impar-400 from-impar-500 ">
      <div className="max-w-screen-xl m-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-50">
          <BookUp2 />
          <h3>IOTA</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-md text-zinc-50">{user?.name}</span>
            <span className="text-sm text-zinc-300">{user?.email}</span>
          </div>
          <img
            src={user?.avatar_url}
            alt={user?.name}
            className="w-14 h-14 rounded-full shadow"
          />
        </div>
      </div>
    </header>
  );
}
