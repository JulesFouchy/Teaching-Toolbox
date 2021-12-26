const lesson_priority = require("./grader/lesson_priority")

module.exports = async function ({ defaultSidebarItemsGenerator, ...args }) {
  if (args.item.dirName === "lessons") {
    const res = args.docs
      // Keep only the files in "/lessons"
      .filter((doc) => doc.sourceDirName === args.item.dirName)
      // Compute the priority
      .map((doc) => ({
        ...doc,
        priority: lesson_priority({
          benefit: doc.frontMatter.benefit,
          easiness: doc.frontMatter.easiness,
          order: doc.frontMatter.order,
        }),
      }))
      // Sort
      .sort((a, b) => {
        // Put introduction first
        if (a.frontMatter.title === "Introduction") {
          return -1
        } else if (b.frontMatter.title === "Introduction") {
          return 1
        }
        // Then sort by priority
        else {
          return b.priority - a.priority
        }
      })
      // Generate the item
      .map((doc) => {
        return {
          type: "doc",
          id: doc.id,
          prio: doc.priority,
        }
      })
    return res
  } else {
    return await defaultSidebarItemsGenerator(args)
  }
}
