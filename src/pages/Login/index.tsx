import { useAuth0 } from "@auth0/auth0-react";
import { Github } from "lucide-react";

export function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="flex items-center justify-center h-full w-full">
      <button
        onClick={() => loginWithRedirect()}
        className="flex items-center gap-1 bg-impar-500 rounded px-4 py-2 text-zinc-50 shadow"
      >
        <Github />
        <span>Entrar com Github</span>
      </button>
    </div>
  );
}
