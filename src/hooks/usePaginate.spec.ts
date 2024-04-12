import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { describe, expect, it } from 'vitest'
import { usePaginate } from './usePaginate'


describe("#usePaginate", () => {
  it("Should a check if current page is default passed page", () => {
    const { result } = renderHook(() => usePaginate({
      totalPage: 12,
      pageSize: 10,
      page: 1,
    }))

    const expected = 1
    
    expect(result.current.currentPage).toBe(expected)
  })

  it("Should not navigate to next page when not exists", () => {
     const {result} =  renderHook(() => usePaginate({
      totalPage: 1,
      pageSize: 10,
      page: 1
    }))

    act(() => {
      result.current.next()
    })
    
    const expected = 1

    expect(result.current.currentPage).toBe(expected)
  })
  
  it("Should navigate to next page", () => {
    const { result } = renderHook(() => usePaginate({
      totalPage: 12,
      pageSize: 10,
      page: 1
    }))

    act(() => {
      result.current.next()
    })

    const expected = 2
  
    expect(result.current.currentPage).toBe(expected)
  })

  it("Should not navigate to previous page when current page is first page", () => {
    const { result } = renderHook(() => usePaginate({
      totalPage: 12,
      pageSize: 10,
      page: 1,
    }))

    act(() => {
      result.current.back()
    })

    const expected = 1
  
    expect(result.current.currentPage).toBe(expected)
  })

  it("Should navigate to previous page when page is not first", () => {
    // tree a
    // arrange
    const { result } = renderHook(() => usePaginate({
      totalPage: 12,
      pageSize: 12,
      page: 2,
    }))

    // act
    act(() => {
      result.current.back()
    })

    const expected = 1
    // assert
    expect(result.current.currentPage).toBe(expected)
  })

  it("Should not navigate with go function when page not exists", () => {
    const {result} = renderHook(() => usePaginate({
      totalPage: 2,
      pageSize: 12,
      page: 1
    }))


    act(() => {
      result.current.go(10)
    })

    const expected = 1

    expect(result.current.currentPage).toBe(expected)    
  })


  it("Should navigate with go function when page exists",() => {
    const {result} = renderHook(() => usePaginate({
      totalPage: 12,
      pageSize: 12,
      page: 1,
    }))

    act(() => {
      result.current.go(10)
    })

    const expected = 10
    
    expect(result.current.currentPage).toBe(expected)
  })
})
