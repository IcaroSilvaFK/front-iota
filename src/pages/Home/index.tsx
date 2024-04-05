import {
  BookCheck,
  BookDashed,
  BookPlus,
  CircleChevronLeft,
  CircleChevronRight,
  CircleX,
} from "lucide-react";
import { NewRepositoryModal } from "../../components/templates/NewRepositoryModal";
import { Header } from "../../components/atoms";
import { useBoolean } from "../../hooks/useBoolean";
import ReactPaginate from "react-paginate";

import { faker } from "@faker-js/faker";
import { usePaginate } from "../../hooks/usePaginate";

const requestStatus = {
  PENDING: {
    classNames: "text-orange-500 bg-orange-500/30 w-fit px-4 rounded shadow",
    text: "pendente",
  },
  DONE: {
    classNames: "text-green-500 bg-green-500/30 w-fit px-4 rounded shadow",
    text: "finalizado",
  },
  REPROVED: {
    classNames: "text-red-500 bg-red-500/30 w-fit px-4 rounded shadow",
    text: "reprovado",
  },
};

const data = Array.from({ length: 150 }).map(() => ({
  id: faker.string.uuid(),
  username: faker.internet.displayName(),
  avatar: faker.image.avatarGitHub(),
  status: faker.helpers.arrayElement(["REPROVED", "DONE", "PENDING"]),
  template: faker.internet.domainName(),
}));

const DEFAULT_MAX_ITEMS_PER_PAGE = 12;

export function Home() {
  const [
    isOpenModalCreateNewCalled,
    handleOpenModalCreateNewCalled,
    handleCloseModalCreateNewCalled,
  ] = useBoolean();

  const totalPages = Math.floor(data.length / DEFAULT_MAX_ITEMS_PER_PAGE);

  const { currentPage, go } = usePaginate({
    page: 1,
    pageSize: DEFAULT_MAX_ITEMS_PER_PAGE,
    totalPage: totalPages,
  });

  const endSlice = currentPage * DEFAULT_MAX_ITEMS_PER_PAGE;
  const initSlice = endSlice - DEFAULT_MAX_ITEMS_PER_PAGE;
  const slice = data.slice(initSlice, endSlice);

  return (
    <div>
      <Header />
      <main className="max-w-screen-xl m-auto p-4 bg-zinc-200">
        <section className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-zinc-800">Repositórios</h3>
          <button
            className="bg-impar-400 text-zinc-50 flex items-center px-4 py-2 rounded shadow gap-2"
            onClick={handleOpenModalCreateNewCalled}
          >
            <BookPlus size={22} />
            Novo Repositório
          </button>
        </section>
        <section className="bg-white shadow rounded-lg p-4 pb-0 mt-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-zinc-300">
                  Usuário
                </th>
                <th className="p-2 border-b border-zinc-300">Template</th>
                <th className="p-2 border-b border-zinc-300">Status</th>
                <th className="p-2 border-b border-zinc-300"></th>
              </tr>
            </thead>
            <tbody>
              {slice.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border-b border-zinc-300">
                    <div className="flex items-center gap-2">
                      <img src={item.avatar} className="w-9 h-9 rounded-full" />
                      <span className="font-md text-zinc-600">
                        {item.username}
                      </span>
                    </div>
                  </td>
                  <td className="text-center p-2 border-b border-zinc-300">
                    <div className="flex items-center justify-center gap-2 text-zinc-600">
                      <BookDashed />
                      <span>{item.template}</span>
                    </div>
                  </td>
                  <td className="text-center p-2 border-b border-zinc-300">
                    <div className="flex items-center justify-center">
                      <div
                        className={
                          requestStatus[
                            item.status as keyof typeof requestStatus
                          ].classNames
                        }
                      >
                        {
                          requestStatus[
                            item.status as keyof typeof requestStatus
                          ].text
                        }
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border-b border-zinc-300">
                    <div className="w-full flex justify-end gap-4">
                      <button className="text-green-500">
                        <BookCheck />
                      </button>
                      <button className="text-red-500">
                        <CircleX />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className="p-4 flex items-center justify-center">
            <ReactPaginate
              pageCount={totalPages}
              forcePage={currentPage - 1}
              activeClassName="text-impar-500 border border-impar-500 bg-impar-500/15 hover:bg-impar-500/10 hover:text-impar-500 rounded"
              pageClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded"
              containerClassName="flex items-center"
              previousLabel={
                <CircleChevronLeft className="text-zinc-400 mr-2" />
              }
              nextLabel={<CircleChevronRight className="text-zinc-400 ml-2" />}
              onPageChange={(page) => {
                go(page.selected + 1);
              }}
            />
          </footer>
        </section>
      </main>
      {isOpenModalCreateNewCalled && (
        <NewRepositoryModal onRequestClose={handleCloseModalCreateNewCalled} />
      )}
    </div>
  );
}
