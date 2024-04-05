import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useBoolean } from './useBoolean'


describe("#useBoolean", () => {
  it("Should default value is false", () => {
    const { result } = renderHook(useBoolean)


    expect(result.current[0]).toBe(false)
  })

  it("Should expect default value equal passed in params", () => {
    const { result } = renderHook(() => useBoolean(true))

    expect(result.current[0]).toBe(true)
  })

  it("Should set value to true on request change", () => {
    const { result } = renderHook(useBoolean)
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)
  })

  it("Should set value to false on request change", () => {
    const { result } = renderHook(() => useBoolean(true))

    act(() => {
      result.current[2]()
    })

    expect(result.current[0]).toBe(false)
  })

  it("Should a  toggle value when toggle function is called", () => {
    const { result } = renderHook(useBoolean)

    act(() => {
      result.current[3]()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[3]()
    })
    expect(result.current[0]).toBe(false)
  })
})