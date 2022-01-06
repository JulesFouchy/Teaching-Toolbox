import React from "react"
import lessons from "@site/.docusaurus/lessons-list-plugin/default/lessons.json"
import Checkbox from "@mui/material/Checkbox"
import ButterflyStroke from "../../static/img/butterfly-stroke.svg"
import ButterflyGreen from "../../static/img/butterfly-green.svg"
import ButterflyBlue from "../../static/img/butterfly-blue.svg"
import { add_tags_filter_listener, get_selected_tags } from "./TagsFilter"
import { add_grade_listener, notify_grade_listeners } from "./Grade"
import { get_current_student, add_student_listener } from "./StudentPicker"
import all_students_progress from "@site/.docusaurus/all-students-progress-plugin/default/all-students-progress.json"

const get_preview_progresses = () => {
  if (!window.preview_progresses) {
    window.preview_progresses = {}
  }
  return window.preview_progresses
}
const set_preview_progress = (lesson_slug, progress) => {
  get_preview_progresses()[lesson_slug] = progress
  notify_grade_listeners()
}
const clear_preview_progresses = () => {
  window.preview_progresses = {}
  notify_grade_listeners()
}

const CheckboxValidated = () => (
  <Checkbox checkedIcon={<ButterflyGreen />} checked disabled />
)

const CheckboxNotValidated = ({ lesson_slug, progress_level }) => (
  <span>
    <Checkbox
      checked={progress_level <= (get_preview_progresses()[lesson_slug] || 0)}
      icon={<ButterflyStroke />}
      checkedIcon={<ButterflyBlue />}
      onChange={(e) => {
        if (get_preview_progresses()[lesson_slug] === progress_level) {
          if (e.target.checked) {
            set_preview_progress(lesson_slug, progress_level)
          } else {
            set_preview_progress(lesson_slug, progress_level - 1)
          }
        } else {
          set_preview_progress(lesson_slug, progress_level)
        }
      }}
    />
  </span>
)

const ButterfliesProgress = (butterflies_count, lesson_slug) => {
  return (
    <span>
      {[...Array(3).keys()].map((idx) =>
        idx < butterflies_count ? (
          <CheckboxValidated />
        ) : (
          <CheckboxNotValidated
            lesson_slug={lesson_slug}
            progress_level={idx + 1}
          />
        )
      )}
    </span>
  )
}

const Tag = (tag_name) => <div>{tag_name}</div>

const Tags = (tags_list) => (
  <div>{tags_list.map((tag_name) => Tag(tag_name))}</div>
)

class LessonsTable extends React.Component {
  constructor({ level }) {
    super()
    this.level = level
    add_tags_filter_listener(() => this.forceUpdate())
    add_student_listener(() => this.forceUpdate())
    add_grade_listener(() => this.forceUpdate())
  }

  render() {
    const student_progress = all_students_progress[get_current_student()]
    if (student_progress !== undefined) {
      return (
        <table>
          <tr>
            <th>Lesson</th>
            <th>Progress</th>
            {/* <th>Points</th> */}
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
                <td>
                  {ButterfliesProgress(
                    student_progress[lesson.slug],
                    lesson.slug
                  )}
                </td>
                {/* <td>{lesson.points.toFixed(1)}</td> */}
                <td>{Tags(lesson.tags || [])}</td>
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

export { LessonsTable, clear_preview_progresses, get_preview_progresses }
