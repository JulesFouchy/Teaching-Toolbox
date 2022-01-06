import React from "react"
import lessons from "@site/.docusaurus/lessons-list-plugin/default/lessons.json"
import lessons_tags from "@site/.docusaurus/lessons-list-plugin/default/lessons_tags.json"
import style from "./LessonsList.module.css"
import Checkbox from "@mui/material/Checkbox"
import grader from "../../../grader/grader"
import Butterfly from "../../static/img/butterfly.svg"
import ButterflyStroke from "../../static/img/butterfly-stroke.svg"
import SvgIcon from "@mui/material/SvgIcon"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BrowserOnly from "@docusaurus/BrowserOnly"

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

const button = (text, onClick) => (
  <div className={style.button}>
    <div onClick={onClick}>{text}</div>
  </div>
)

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

const tag = (tag_name) => <div>{tag_name}</div>

const tags = (tags_list) => (
  <div>{tags_list.map((tag_name) => tag(tag_name))}</div>
)

const tag_filter = (tag_name, selected_tags, obj) => {
  const is_selected = selected_tags.includes(tag_name)
  return (
    <div
      className={
        is_selected ? style.tag_filter_selected : style.tag_filter_not_selected
      }
      onClick={() => {
        is_selected
          ? selected_tags.splice(selected_tags.indexOf(tag_name), 1)
          : selected_tags.push(tag_name)
        obj.forceUpdate()
      }}
    >
      {tag_name}
    </div>
  )
}

const tags_filters = (selected_tags, obj) => {
  return (
    <div className={style.tags_filters}>
      <b>Filters:</b>
      {button("Select All", () => {
        selected_tags.length = 0
        lessons_tags.forEach((tag_name) => selected_tags.push(tag_name))
        obj.forceUpdate()
      })}
      {button("Remove All", () => {
        selected_tags.length = 0
        obj.forceUpdate()
      })}
      <div className={style.tags_filter_container}>
        {lessons_tags.map((tag_name) =>
          tag_filter(tag_name, selected_tags, obj)
        )}
      </div>
    </div>
  )
}

const lessons_table = ({ order, lessons, tags_filter, new_lessons, obj }) => {
  return (
    <div>
      <h2>Order {order}</h2>
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
          .filter((lesson) => lesson.order === order)
          .filter((lesson) => {
            return tags_filter.some((wanted_tag) =>
              (lesson.tags || []).includes(wanted_tag)
            )
          })
          .map((lesson) => (
            <tr>
              <td>
                <a href={lesson.link}>{lesson.title}</a>
              </td>
              <td>
                {new_lessons.find((slug) => lesson.slug === slug)
                  ? checkbox_validated()
                  : checkbox_not_validated(lesson.slug, obj)}
              </td>
              <td>{tags(lesson.tags || [])}</td>
              <td>{(100 * lesson.priority).toFixed(0)} %</td>
              <td>{lesson.benefit}</td>
              <td>{lesson.easiness}</td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default class LessonsList extends React.Component {
  lessons_checked_by_user = []
  new_lessons = {}
  old_lessons = {}
  is_demo = false
  tags_filter = [...lessons_tags]

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
        ].filter((lesson) => lessons.includes(lesson))
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
    const lessons_table_params = {
      lessons,
      tags_filter: this.tags_filter,
      new_lessons: this.new_lessons,
      obj: this,
    }

    return (
      //   <BrowserOnly>
      //     {() => (
      <div>
        {tags_filters(this.tags_filter, this)}
        <br />
        {!this.is_demo && (
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
              {show_blue_grade(grade_blue, this.lessons_checked_by_user, this)}
            </div>
          </div>
        )}
        {this.is_demo && (
          <div style={{ top: "200px" }} className={style.stick_to_the_right}>
            <div className={style.export_button}>
              {export_as_json_button(this.lessons_checked_by_user)}
            </div>
          </div>
        )}
        {lessons_table({
          order: 1,
          ...lessons_table_params,
        })}
        {lessons_table({
          order: 2,
          ...lessons_table_params,
        })}
        {lessons_table({
          order: 3,
          ...lessons_table_params,
        })}
        {lessons_table({
          order: 4,
          ...lessons_table_params,
        })}
        {lessons_table({
          order: 5,
          ...lessons_table_params,
        })}
      </div>
      //     )}
      //   </BrowserOnly>
    )
  }
}