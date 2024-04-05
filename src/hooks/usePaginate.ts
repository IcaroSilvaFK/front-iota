import { useCallback, useEffect, useMemo, useState } from "react"

type Props = {
  pageSize: number
  totalPage: number
  page: number
}

export function usePaginate(props: Props) {
  const { pageSize, page: _page, totalPage } = props

  const [page, setPage] = useState(_page)


  useEffect(() => {
    setPage(_page)
  }, [_page])

  const hasNextPage = useMemo(() => page + 1 <= totalPage, [page, totalPage])
  const hasPreviewsPage = useMemo(() => page - 1 >= 1, [page])

  const next = useCallback((toLast = false) => {
    if (hasNextPage) {
      setPage(p => toLast ? totalPage : p + 1)
    }
  }, [hasNextPage, totalPage])

  const back = useCallback((toFirst = false) => {
    if (hasPreviewsPage) {
      setPage(p => toFirst ? 1 : p - 1)
    }
  }, [hasPreviewsPage])


  const go = useCallback((page: number) => {
    if (page >= 1 && totalPage <= totalPage) {
      setPage(page)
    }
  }, [totalPage])


  return {
    currentPage: page,
    pageSize,
    totalPage,
    hasNextPage,
    hasPreviewsPage,
    next,
    back,
    go,
  }
}