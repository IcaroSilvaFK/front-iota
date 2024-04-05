export function pagination(currentPage: number, nrOfPages: number, deltaValue: number) {
  const delta = deltaValue
  const range: number[] = []
  const rangeWithDots: string[] = []
  let l;

  if (nrOfPages <= 1) {
    return range
  }

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i)
    }
  }

  range.push(nrOfPages)

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(`${l + 1}`)
      } else if (i - l !== 1) {
        rangeWithDots.push("...")
      }
    }
    rangeWithDots.push(`${i}`)
    l = i
  }

  return rangeWithDots
}