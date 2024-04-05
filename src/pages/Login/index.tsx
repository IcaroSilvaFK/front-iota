import { Github } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore.store";
import { baseApi } from "../../configs/axios";
import { constants } from "../../utils/constants";

type Response = {
  avatar_url: string;
  bio: string;
  email: string;
  name: string;
  url: string;
  access_token: string;
};

export function Login() {
  const navigate = useNavigate();
  const { setUser } = userStore((state) => state);

  const handleLoginWithCode = useCallback(async () => {
    const url = new URL(window.location.href);

    const code = url.searchParams.get("code");

    if (code) {
      try {
        const { data } = await baseApi.get<Response>(`/auth/${code}`);
        setUser(data);
        localStorage.setItem(constants.tokenStorage, data.access_token);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    }
  }, [setUser, navigate]);

  useEffect(() => {
    handleLoginWithCode();
  }, [handleLoginWithCode]);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <button
        onClick={() => {
          window.open(
            `https://github.com/login/oauth/authorize?client_id=${
              import.meta.env.VITE_APP_CLIENT_ID
            }`,
            "_self"
          );
        }}
        className="flex items-center gap-1 bg-impar-500 rounded px-4 py-2 text-zinc-50 shadow"
      >
        <Github />
        <span>Entrar com Github</span>
      </button>
    </div>
  );
}
