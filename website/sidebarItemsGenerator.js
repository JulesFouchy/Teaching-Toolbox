const lesson_priority = require("../grader/lesson_priority")
const levels = require("../../levels_points.json")

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
          level: doc.frontMatter.level,
        }),
        level: doc.frontMatter.level,
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
          const prio = b.priority - a.priority
          if (prio === 0) {
            return (b.frontMatter.bias || 0) - (a.frontMatter.bias || 0)
          } else {
            return prio
          }
        }
      })
      // Generate the item
      .map((doc) => {
        return {
          type: "doc",
          id: doc.id,
          prio: doc.priority,
          level: doc.level,
        }
      })
    // Split in several categories
    const categories = Object.keys(levels).map((level) => ({
      type: "category",
      label: `Level ${level}`,
      level: parseInt(level),
      items: [],
      collapsed: true,
    }))
    res.forEach((doc) => {
      if (doc.level !== undefined) {
        categories
          .find((category) => category.level === doc.level)
          .items.push(doc)
      } else {
        console.warn(`${doc.id} doesn't belong to any level`)
      }
    })
    return [res[0], ...categories]
  } else {
    return await defaultSidebarItemsGenerator(args)
  }
}
