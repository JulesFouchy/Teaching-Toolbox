const fs = require("fs")
const path = require("path")

module.exports = (context, options) => {
  return {
    name: "all-students-progress-plugin",
    async loadContent() {
      const files_dir = path.join(context.siteDir, "../../students-progress")
      const files = fs.readdirSync(files_dir)

      return {
        all_students_progress: files.reduce((obj, file) => {
          obj[path.parse(file).name] = JSON.parse(
            fs.readFileSync(path.join(files_dir, file))
          )
          return obj
        }, {}),
      }
    },
    async contentLoaded({ content, actions }) {
      await actions.createData(
        "all-students-progress.json",
        JSON.stringify(content.all_students_progress)
      )
    },
  }
}
