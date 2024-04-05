import { CircleX } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

type FormProps = {
  title: string;
  description: string;
  template: string;
};

type Props = {
  onRequestClose: () => void;
};

export function NewRepositoryModal(props: Props) {
  const { onRequestClose } = props;

  const [options, setOptions] = useState<{ title: string; url: string }[]>([]);
  const { register, handleSubmit } = useForm<FormProps>();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("@token");
      const { data } = await axios.get(
        "https://api.github.com/orgs/templatesIcaro/repos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOptions(
        data?.map((repo: { name: string; ssh_url: string }) => ({
          title: repo.name,
          url: repo.ssh_url,
        }))
      );
    })();
  }, []);

  const onSubmit = useCallback(async (data: FormProps) => {
    axios.post("http://localhost:8080/api/iota/repository", {
      name: data.title,
      description: data.description,
      template: data.template,
      organization: "Gois-Tech",
      email: "icaro@icaro.com",
      username: "Icaro Vieira",
      avatar_url: "cascascas",
      token: localStorage.getItem("@token"),
    });
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/10 flex items-center justify-center"
      onClick={onRequestClose}
    >
      <div
        className="p-4 rounded bg-slate-50 shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center gap-4 justify-between">
          <h3>Novo repositório</h3>

          <button className="text-red-500" onClick={onRequestClose}>
            <CircleX />
          </button>
        </header>

        <form
          className="flex flex-col gap-3 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-600"
            >
              Nome do repositório
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-impar-500 focus:border-impar-500 block w-full p-2.5 "
              placeholder="John"
              required
              {...register("title")}
            />
          </div>

          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-600"
            >
              Template inicial
            </label>
            <select
              id="countries"
              className="bg-zinc-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-impar-400 focus:border-impar-500 block w-full p-2.5 dark:bg-slate-50-700 dark:border-gray-300 dark:placeholder-gray-800 dark:text-zinc-800 dark:focus:ring-impar-500 dark:focus:border-impar-500"
              {...register("template")}
            >
              {options.map((opt) => (
                <option value={opt.title} key={opt.url}>
                  {opt.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-600"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
              {...register("description")}
            ></textarea>
          </div>

          <footer className="flex items-center justify-end mt-2">
            <button className="bg-impar-400 px-4 py-2 rounded shadow text-zinc-50">
              Enviar
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
