import React from "react"
import lessons from "@site/.docusaurus/plugin--lessons-list/default/lessons.json"

export default function LessonLink({ slug, text, anchor }) {
  const lesson = lessons.find((lesson) => lesson.slug === slug)
  if (lesson === undefined) {
    console.error(`Broken link to inexistant lesson "${slug}"`)
    throw ""
  }
  return <a href={lesson.link + (anchor || "")}>{text || lesson.title}</a>
}
