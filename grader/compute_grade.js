import lessons from "@site/.docusaurus/lessons-list-plugin/default/lessons.json"

export default (lessons_progress) => {
  return lessons.reduce(
    (acc, lesson) => acc + (lesson.points * lessons_progress[lesson.slug]) / 3,
    0
  )
}
