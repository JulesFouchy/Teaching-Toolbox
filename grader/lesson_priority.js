const levels = require("../../levels.json")

const validate = (name, lesson) => {
  const value = lesson[name]
  if (![1, 2, 3, 4, 5].includes(value)) {
    console.error(
      `Invalid '${name}' value : ${value}, for lesson '${lesson.title}'`
    )
    return false
  } else {
    return true
  }
}

const validate_level = (level) => {
  return levels.find((lvl) => lvl.id === level) !== undefined
}

const lesson_priority = (lesson) => {
  if (
    !validate("benefit", lesson) ||
    !validate("easiness", lesson) ||
    !validate_level(lesson.level)
  ) {
    return -1
  }
  const absolute_prio = lesson.benefit * 0.75 + lesson.easiness * 0.25
  return absolute_prio
}

module.exports = lesson_priority
