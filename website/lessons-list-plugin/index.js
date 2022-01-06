const fs = require("fs")
const fm = require("front-matter")
const path = require("path")
const lesson_priority = require("../../grader/lesson_priority")

const difficulty = (lesson) => 6 - lesson.easiness

const lessons_points = (lessons) => {
  const level_points = {
    1: 10,
    2: 5,
    3: 3,
    4: 1.5,
    5: 0.5,
  }
  const level_total_difficulty = {}
  for (let level = 1; level <= 5; ++level) {
    level_total_difficulty[level] = lessons
      .filter((lesson) => lesson.level === level)
      .reduce((acc, lesson) => {
        return acc + difficulty(lesson)
      }, 0)
  }
  return lessons.map((lesson) => ({
    ...lesson,
    points:
      (level_points[lesson.level] * difficulty(lesson)) /
      level_total_difficulty[lesson.level],
  }))
}

module.exports = (context, options) => {
  return {
    name: "lessons-list-plugin",
    async loadContent() {
      // Grabs all the frontmatters of the lessons and convert the to Lessons
      const lessons_path = path.join(context.siteDir, "../../content/lessons")
      const files = fs.readdirSync(lessons_path)
      const allowed_tags = context.siteConfig.customFields.lessons_allowed_tags
      const lessons = files
        .map((file) => {
          const data = fs.readFileSync(path.join(lessons_path, file), "utf8")
          const attribs = fm(data).attributes
          const slug = path.parse(file).name
          // Check that all tags have been declared in lessons_allowed_tags
          ;(attribs.tags || []).forEach((tag) => {
            if (!allowed_tags.includes(tag)) {
              console.error(`ERROR: "${file}" has invalid tag: "${tag}"
Either fix this tag or add it to lessons_allowed_tags in website.config.js`)
              throw ""
            }
          })
          return {
            ...attribs,
            link: path.join(path.join(context.baseUrl, "lessons"), slug),
            slug: slug,
          }
        })
        .filter((lesson) => lesson.title !== "Introduction")
      const lessons_with_prio = lessons.map((lesson) => ({
        ...lesson,
        priority: lesson_priority(lesson),
      }))
      const lessons_with_points = lessons_points(lessons_with_prio)
      // Useful to copy-paste the full list of lessons to init a student_progress.json:
      //   console.log(
      //     lessons.reduce((obj, lesson) => {
      //       obj[lesson.slug] = 0
      //       return obj
      //     }, {})
      //   )
      const sorted_lessons = lessons_with_points.sort((a, b) => {
        const prio = b.priority - a.priority
        if (prio === 0) {
          return (b.bias || 0) - (a.bias || 0)
        } else {
          return prio
        }
      })
      return {
        lessons: sorted_lessons,
        lessons_tags: allowed_tags,
      }
    },
    async contentLoaded({ content, actions }) {
      await actions.createData("lessons.json", JSON.stringify(content.lessons))
      await actions.createData(
        "lessons_tags.json",
        JSON.stringify(content.lessons_tags)
      )
    },
  }
}
