const fs = require("fs")
const fm = require("front-matter")
const path = require("path")
const lesson_priority = require("../../grader/lesson_priority")

module.exports = (context, options) => {
  return {
    name: "lessons-list-plugin",
    async loadContent() {
      // Grabs all the frontmatters of the lessons and convert the to Lessons
      const lessons_path = path.join(context.siteDir, "../../content/lessons")
      const files = fs.readdirSync(lessons_path)
      const lessons = files
        .map((file) => {
          const data = fs.readFileSync(path.join(lessons_path, file), "utf8")
          const attribs = fm(data).attributes
          const slug = path.parse(file).name
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
      const sorted_lessons = lessons_with_prio.sort(
        (a, b) => b.priority - a.priority
      )
      return {
        lessons: sorted_lessons,
        lessons_tags: context.siteConfig.customFields.lessons_allowed_tags,
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
