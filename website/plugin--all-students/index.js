const fs = require("fs")
const path = require("path")

module.exports = (context, options) => {
  return {
    name: "plugin--all-students",

    async loadContent() {
      const files_dir = path.join(context.siteDir, "../../content/progress")
      const files = fs.readdirSync(files_dir)

      return {
        // Gather all file names in a list
        all_students: files.reduce((list, file) => {
          list.push(file.substring(0, file.indexOf(".")))
          return list
        }, []),
      }
    },

    async contentLoaded({ content, actions }) {
      await actions.createData(
        "all-students.json",
        JSON.stringify(content.all_students)
      )
    },
  }
}
