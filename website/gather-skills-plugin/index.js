const fs = require("fs")
const fm = require("front-matter")
const path = require("path")
const skill_priority = require("../grader/skill_priority")

module.exports = (context, options) => {
  return {
    name: "gather-skills-plugin",
    async loadContent() {
      // Grabs all the frontmatters of the lessons and convert the to Skills
      const lessons_path = path.join(context.siteDir, "../../content/lessons")
      const files = fs.readdirSync(lessons_path)
      const skills = files
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
        .filter((skill) => skill.title !== "Introduction")
      const skills_with_prio = skills.map((skill) => ({
        ...skill,
        priority: skill_priority(skill),
      }))
      const sorted_skills = skills_with_prio.sort(
        (a, b) => b.priority - a.priority
      )
      return {
        skills: sorted_skills,
      }
    },
    async contentLoaded({ content, actions }) {
      await actions.createData("skills.json", JSON.stringify(content.skills))
    },
  }
}
