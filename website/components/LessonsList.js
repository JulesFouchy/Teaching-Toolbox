import React from "react"
import lessons from "@site/.docusaurus/lessons-list-plugin/default/lessons.json"
import style from "./LessonsList.module.css"
import Checkbox from "@mui/material/Checkbox"
import grader from "../../grader/grader"

const checkbox_validated = () => (
  <Checkbox
    checked
    disabled
    sx={{
      "&.Mui-checked": {
        color: "#25c2a0",
      },
    }}
  />
)

const checkbox_validated_disabled = () => (
  <Checkbox
    checked
    disabled
    sx={{
      "&.Mui-checked": {
        color: "#90a4ae",
      },
    }}
  />
)

const checkbox_not_validated = (lesson_slug, obj) => (
  <Checkbox
    style={{
      color: "#29B6F6",
    }}
    checked={obj.lessons_checked_by_user.includes(lesson_slug)}
    onChange={(e) => {
      if (e.target.checked) {
        obj.lessons_checked_by_user.push(lesson_slug)
      } else {
        obj.lessons_checked_by_user = obj.lessons_checked_by_user.filter(
          (slug) => slug !== lesson_slug
        )
      }
      if (obj.is_demo) {
        localStorage.setItem(
          "lessons_checked_by_user",
          JSON.stringify(obj.lessons_checked_by_user)
        )
      }
      obj.forceUpdate()
    }}
  />
)

function download_as_json(object) {
  const blob = new Blob([JSON.stringify(object)], {
    type: "text/json;charset=utf-8",
  })
  const file_name = "lessons.json"

  if (false || !!document.documentMode) {
    // Internet Explorer
    window.navigator.msSaveBlob(blob, file_name)
  } else {
    // Other browsers
    const a = document.createElement("a")
    a.download = file_name
    a.href = (window.URL || window.webkitURL).createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

const export_as_json_button = (object) => (
  <div onClick={() => download_as_json(object)}>Export as JSON</div>
)

const reset = (list, obj) => {
  list.length = 0
  obj.forceUpdate()
}

const show_blue_grade = (grade, lessons_checked_by_user, obj) => (
  <div onClick={() => reset(lessons_checked_by_user, obj)}>
    {grade.toFixed(1)} / 20
  </div>
)

export default class LessonsList extends React.Component {
  lessons_checked_by_user = []
  new_lessons = {}
  old_lessons = {}
  is_demo = false

  constructor({ student_lessons }) {
    super()
    this.new_lessons = [...student_lessons.new]
    this.old_lessons = [...student_lessons.old]
    if (student_lessons.is_demo) {
      this.is_demo = true
      try {
        this.lessons_checked_by_user = [
          ...JSON.parse(
            localStorage.getItem("lessons_checked_by_user") || "[]"
          ),
        ]
      } catch (e) {
        console.error(e)
      }
    }
  }

  render() {
    const grade_green = grader(lessons, [...this.new_lessons])
    const grade_blue = grader(lessons, [
      ...this.new_lessons,
      ...this.lessons_checked_by_user,
    ])

    return (
      <div>
        {!this.is_demo && (
          <div
            className={style.grade_blue}
            title="This is the grade that you would have if you were to validate the skills that you checked in blue. Click to reset those."
          >
            {show_blue_grade(grade_blue, this.lessons_checked_by_user, this)}
          </div>
        )}
        {!this.is_demo && (
          <div
            className={style.grade_green}
            title="This is your actual current grade"
          >
            {grade_green.toFixed(1)} / 20
          </div>
        )}
        {this.is_demo && (
          <div className={style.export_button}>
            {export_as_json_button(this.lessons_checked_by_user)}
          </div>
        )}

        <table>
          <tr>
            <th>Lesson</th>
            <th>Validated</th>
            <th>Priority</th>
            <th>Benefit</th>
            <th>Easiness</th>
            <th>Order</th>
          </tr>
          {lessons.map((lesson) => (
            <tr>
              <td>
                <a href={lesson.link}>{lesson.title}</a>
              </td>
              <td>
                {this.new_lessons.find((slug) => lesson.slug === slug)
                  ? checkbox_validated()
                  : this.old_lessons.find((slug) => lesson.slug === slug)
                  ? checkbox_validated_disabled()
                  : checkbox_not_validated(lesson.slug, this)}
              </td>
              {/* <td>{tags(lesson.tags || [])}</td> */}
              <td>{(100 * lesson.priority).toFixed(0)} %</td>
              <td>{lesson.benefit}</td>
              <td>{lesson.easiness}</td>
              <td>{lesson.order}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}
