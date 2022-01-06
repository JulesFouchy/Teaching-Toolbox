import React from "react"
import style from "./Grade.module.css"

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
  }

  render() {
    const grade_green = [1, 2, 3, 4, 5].reduce(
      (acc, idx) => acc + window["actual_grade_level" + idx],
      0
    )
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
  }
}

export { Grade, add_grade_listener, notify_grade_listeners }
