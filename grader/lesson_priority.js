/// Returns a number between 0 and 1 (maps range_begin to 0 and range_end to 1)
const normalize = (x, range_begin, range_end) =>
  (x - range_begin) / (range_end - range_begin)
/// Expects x in the [0, 1] range and returns a number in [range_begin, range_end]
const map = (x, range_begin, range_end) =>
  x * (range_end - range_begin) + range_begin

const validate = (name, lesson) => {
  const value = lesson[name]
  if (![1, 2, 3, 4, 5].includes(value)) {
    console.error(`Invalid '${name}' value : ${value}`)
    return false
  } else {
    return true
  }
}

const lesson_priority = (lesson) => {
  if (
    !validate("benefit", lesson) ||
    !validate("easiness", lesson) ||
    !validate("order", lesson)
  ) {
    return -1
  }
  const absolute_prio = normalize(
    lesson.benefit * 0.75 + lesson.easiness * 0.25,
    1,
    5
  )
  // prettier-ignore
  const relative_prio = lesson.order === 5 ? map(absolute_prio, 0.0, 0.2)
                      : lesson.order === 4 ? map(absolute_prio, 0.2, 0.4)
                      : lesson.order === 3 ? map(absolute_prio, 0.4, 0.6)
                      : lesson.order === 2 ? map(absolute_prio, 0.6, 0.8)
                      : lesson.order === 1 ? map(absolute_prio, 0.8, 1.0)
                      : -1
  return relative_prio
}

module.exports = lesson_priority
// export default lesson_priority
