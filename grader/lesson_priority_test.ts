// Run me with ```deno test```
import lesson_priority from "./lesson_priority.js"
import { assert } from "https://deno.land/std@0.106.0/testing/asserts.ts"

const approx_equal = (
  a: number,
  b: number,
  epsilon = 128 * Number.EPSILON,
  abs_th = Number.MIN_VALUE
): boolean => {
  if (a == b) {
    return true
  }
  const diff = Math.abs(a - b)
  const norm = Math.min(Math.abs(a) + Math.abs(b), Number.MAX_VALUE)
  return diff < Math.max(abs_th, epsilon * norm)
}

Deno.test("Most important lesson has priority 1", () => {
  const prio = lesson_priority({ benefit: 5, easiness: 5, order: 1 })
  assert(approx_equal(prio, 1))
})

Deno.test("Least important lesson has priority 0", () => {
  const prio = lesson_priority({ benefit: 1, easiness: 1, order: 5 })
  assert(approx_equal(prio, 0))
})

Deno.test("Respect natural order", () => {
  const marks = [1, 2, 3, 4, 5]
  marks.forEach((benefit0) => {
    marks.forEach((easiness0) => {
      marks.forEach((benefit1) => {
        marks.forEach((easiness1) => {
          if (
            (benefit0 < benefit1 && easiness0 < easiness1) ||
            (benefit0 == benefit1 && easiness0 < easiness1) ||
            (benefit0 < benefit1 && easiness0 == easiness1)
          ) {
            assert(
              lesson_priority({
                benefit: benefit0,
                easiness: easiness0,
                order: 1,
              }) <
                lesson_priority({
                  benefit: benefit1,
                  easiness: easiness1,
                  order: 1,
                })
            )
          }
        })
      })
    })
  })
})
