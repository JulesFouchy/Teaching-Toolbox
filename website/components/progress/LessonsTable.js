import React from "react"
import lessons from "@site/.docusaurus/lessons-list-plugin/default/lessons.json"
import Checkbox from "@mui/material/Checkbox"
import Butterfly from "../../static/img/butterfly.svg"
import ButterflyStroke from "../../static/img/butterfly-stroke.svg"
import { add_tags_filter_listener, get_selected_tags } from "./TagsFilter"
import { notify_grade_listeners } from "./Grade"
import { get_current_student, add_student_listener } from "./StudentPicker"
import all_students_progress from "@site/.docusaurus/all-students-progress-plugin/default/all-students-progress.json"

const checkbox_validated = () => (
  <Checkbox
    checked
    disabled
    sx={{
      "&.Mui-checked": {
        color: "#25c2a0",
      },
    }}
    // icon={<Butterfly />}
    // checkedIcon={<ButterflyStroke />}
  />
)

const checkbox_not_validated = (lesson_slug, obj) => (
  <span>
    <Checkbox
      style={{
        color: "#29B6F6",
      }}
      icon={<ButterflyStroke />}
      checkedIcon={<Butterfly />}
      checked={obj.lessons_checked_by_user.includes(lesson_slug)}
      onChange={(e) => {
        if (e.target.checked) {
          obj.lessons_checked_by_user.push(lesson_slug)
        } else {
          obj.lessons_checked_by_user = obj.lessons_checked_by_user.filter(
            (slug) => slug !== lesson_slug
          )
        }
        notify_grade_listeners()
      }}
    />
    <Checkbox
      style={{
        color: "#29B6F6",
      }}
      icon={<ButterflyStroke />}
      checkedIcon={<Butterfly />}
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
    <Checkbox
      style={{
        color: "#29B6F6",
      }}
      icon={<ButterflyStroke />}
      checkedIcon={<Butterfly />}
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
  </span>
)

const butterflies_progress = (butterflies_count) => {
  return (
    <span>
      {butterflies_count}
      {/* {[...Array(3).keys()].forEach((idx) => (
        <Checkbox
          style={{
            color: "#29B6F6",
          }}
          icon={<ButterflyStroke />}
          checkedIcon={<Butterfly />}
          checked={idx < butterflies_count}
          onChange={(e) => {
            if (e.target.checked) {
              //   obj.lessons_checked_by_user.push(lesson_slug)
            } else {
              //   obj.lessons_checked_by_user = obj.lessons_checked_by_user.filter(
              //     (slug) => slug !== lesson_slug
              //   )
            }
            notify_grade_listeners()
          }}
        />
      ))} */}
    </span>
  )
}

const tag = (tag_name) => <div>{tag_name}</div>

const tags = (tags_list) => (
  <div>{tags_list.map((tag_name) => tag(tag_name))}</div>
)

export default class LessonsList extends React.Component {
  lessons_checked_by_user = []
  level

  constructor({ level }) {
    super()
    this.level = level
    add_tags_filter_listener(() => this.forceUpdate())
    add_student_listener(() => this.forceUpdate())
  }

  render() {
    console.log("HIIII")
    const student_progress = all_students_progress[get_current_student()]
    if (student_progress !== undefined) {
      return (
        <table>
          <tr>
            <th>Lesson</th>
            <th>Validated</th>
            <th>Points</th>
            <th>Tags</th>
            <th>Priority</th>
            <th>Benefit</th>
            <th>Easiness</th>
          </tr>
          {lessons
            .filter((lesson) => lesson.level === this.level)
            .filter((lesson) => {
              return get_selected_tags().some((wanted_tag) =>
                (lesson.tags || []).includes(wanted_tag)
              )
            })
            .map((lesson) => (
              <tr>
                <td>
                  <a href={lesson.link}>{lesson.title}</a>
                </td>
                <td>{butterflies_progress(student_progress[lesson.slug])}</td>
                <td>{lesson.points.toFixed(1)}</td>
                <td>{tags(lesson.tags || [])}</td>
                <td>{(100 * lesson.priority).toFixed(0)} %</td>
                <td>{lesson.benefit}</td>
                <td>{lesson.easiness}</td>
              </tr>
            ))}
        </table>
      )
    } else return null
  }
}
