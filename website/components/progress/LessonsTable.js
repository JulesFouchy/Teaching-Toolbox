import React from "react"
import lessons from "@site/.docusaurus/lessons-list-plugin/default/lessons.json"
import Checkbox from "@mui/material/Checkbox"
import Butterfly from "../../static/img/butterfly.svg"
import ButterflyStroke from "../../static/img/butterfly-stroke.svg"
import grader from "../../../grader/grader"
import { add_tags_filter_listener } from "./TagsFilter"
import { add_grade_listener, notify_grade_listeners } from "./Grade"

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

const tag = (tag_name) => <div>{tag_name}</div>

const tags = (tags_list) => (
  <div>{tags_list.map((tag_name) => tag(tag_name))}</div>
)

export default class LessonsList extends React.Component {
  lessons_checked_by_user = []
  validated_lessons = []
  order

  constructor({ order, validated_lessons }) {
    super()
    this.order = order
    this.validated_lessons = [...validated_lessons]
    add_tags_filter_listener(() => this.forceUpdate())
    window["actual_grade_level" + this.order] = grader(lessons, [
      ...this.validated_lessons,
    ])
    window["preview_grade_level" + this.order] = grader(lessons, [
      ...this.validated_lessons,
      ...this.lessons_checked_by_user,
    ])
  }

  render() {
    return (
      <table>
        <tr>
          <th>Lesson</th>
          <th>Validated</th>
          <th>Tags</th>
          <th>Priority</th>
          <th>Benefit</th>
          <th>Easiness</th>
        </tr>
        {lessons
          .filter((lesson) => lesson.order === this.order)
          .filter((lesson) => {
            return window.selected_tags.some((wanted_tag) =>
              (lesson.tags || []).includes(wanted_tag)
            )
          })
          .map((lesson) => (
            <tr>
              <td>
                <a href={lesson.link}>{lesson.title}</a>
              </td>
              <td>
                {this.validated_lessons.find((slug) => lesson.slug === slug)
                  ? checkbox_validated()
                  : checkbox_not_validated(lesson.slug, this)}
              </td>
              <td>{tags(lesson.tags || [])}</td>
              <td>{(100 * lesson.priority).toFixed(0)} %</td>
              <td>{lesson.benefit}</td>
              <td>{lesson.easiness}</td>
            </tr>
          ))}
      </table>
    )
  }
}
