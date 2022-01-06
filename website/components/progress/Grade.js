import React from "react"
import style from "./Grade.module.css"
import compute_grade from "../../../grader/compute_grade"
import all_students_progress from "@site/.docusaurus/all-students-progress-plugin/default/all-students-progress.json"
import { get_current_student, add_student_listener } from "./StudentPicker"
import { get_selected_tags, notify_tags_filter_listeners } from "./TagsFilter"

const add_grade_listener = (cb) => {
  if (!window.grade_listeners) {
    window.grade_listeners = []
  }
  window.grade_listeners.push(cb)
}

const notify_grade_listeners = () => {
  window.grade_listeners.forEach((cb) => cb())
}

const show_blue_grade = (grade) => (
  <div
    onClick={() => {
      ;[1, 2, 3, 4, 5].forEach(
        (idx) =>
          (window["preview_grade_level" + idx] =
            window["actual_grade_level" + idx])
      )
      notify_grade_listeners()
    }}
  >
    {grade.toFixed(1)} / 20
  </div>
)

class Grade extends React.Component {
  constructor({}) {
    super()
    add_grade_listener(() => this.forceUpdate())
    add_student_listener(() => this.forceUpdate())
  }

  render() {
    const student_progress = all_students_progress[get_current_student()]
    if (student_progress !== undefined) {
      const grade_green = compute_grade(student_progress)
      const grade_blue = [1, 2, 3, 4, 5].reduce(
        (acc, idx) => acc + window["preview_grade_level" + idx],
        0
      )
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            top: "200px",
          }}
          className={style.stick_to_the_right}
        >
          <div
            className={style.grade_green}
            title="This is your actual current grade"
          >
            {grade_green.toFixed(1)} / 20
          </div>
          <div
            className={style.grade_blue}
            title="This is the grade that you would have if you were to validate the skills that you checked in blue. Click to reset those."
          >
            {show_blue_grade(grade_blue)}
          </div>
        </div>
      )
    } else return null
  }
}

export { Grade, add_grade_listener, notify_grade_listeners }
