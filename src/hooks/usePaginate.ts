import { useCallback, useEffect, useMemo, useState } from "react"

type Props = {
  pageSize: number
  totalPage: number
  page: number
}

export function usePaginate(props: Props) {
  const { pageSize, page: _page, totalPage } = props

  const [currentPage, setCurrentPage] = useState(_page)

  const hasNextPage = useMemo(() => currentPage + 1 <= totalPage, [currentPage, totalPage])
  const hasPreviewsPage = useMemo(() => currentPage - 1 >= 1, [currentPage])

  useEffect(() => {
    setCurrentPage(_page)
  }, [_page])

  const next = useCallback((toLast = false) => {
    if (hasNextPage) {
      setCurrentPage(p => toLast ? totalPage : p + 1)
    }
  }, [hasNextPage, totalPage])

  const back = useCallback((toFirst = false) => {
    if (hasPreviewsPage) {
      setCurrentPage(p => toFirst ? 1 : p - 1)
    }
  }, [hasPreviewsPage])


  const go = useCallback((page: number) => {
    if (page >= 1 && totalPage <= totalPage) {
      setCurrentPage(page)
    }
  }, [totalPage])


  return {
    currentPage,
    pageSize,
    totalPage,
    hasNextPage,
    hasPreviewsPage,
    next,
    back,
    go,
  }
}
