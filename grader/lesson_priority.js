const levels_points = require("../../levels_points.json")

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
    !validate("level", lesson)
  ) {
    return -1
  }
  const absolute_prio = normalize(
    lesson.benefit * 0.75 + lesson.easiness * 0.25,
    1,
    5
  )
  const levels_count = Object.entries(levels_points).length
  const min_prio = map((lesson.level - 1) / (levels_count - 1), 0.8, 0.0)
  const max_prio = map((lesson.level - 1) / (levels_count - 1), 1.0, 0.2)
  const relative_prio = map(absolute_prio, min_prio, max_prio)
  return relative_prio
}

module.exports = lesson_priority
