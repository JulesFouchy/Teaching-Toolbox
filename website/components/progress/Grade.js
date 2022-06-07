import React from "react";
import style from "./Grade.module.css";
import compute_grade from "../../../grader/compute_grade";
import all_students_progress from "@site/.docusaurus/all-students-progress-plugin/default/all-students-progress.json";
import { get_current_student, add_student_listener } from "./StudentPicker";
import {
  clear_preview_progresses,
  get_preview_progresses,
} from "./LessonsTable";

const add_grade_listener = (cb) => {
  if (!window.grade_listeners) {
    window.grade_listeners = [];
  }
  window.grade_listeners.push(cb);
};

const notify_grade_listeners = () => {
  window.grade_listeners.forEach((cb) => cb());
};

const BlueGrade = (grade) => (
  <div
    onClick={() => {
      clear_preview_progresses();
    }}
  >
    {grade.toFixed(1)} / 20
  </div>
);

function download_as_json(object, name) {
  const blob = new Blob([JSON.stringify(object)], {
    type: "text/json;charset=utf-8",
  });
  const file_name = `${name}.json`;

  if (false || !!document.documentMode) {
    // Internet Explorer
    window.navigator.msSaveBlob(blob, file_name);
  } else {
    // Other browsers
    const a = document.createElement("a");
    a.download = file_name;
    a.href = (window.URL || window.webkitURL).createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

const export_as_json_button = (object, name) => (
  <div onClick={() => download_as_json(object, name)}>Export</div>
);

class Grade extends React.Component {
  constructor({ top_position }) {
    super();
    this.top_position = top_position;
    add_grade_listener(() => this.forceUpdate());
    add_student_listener(() => this.forceUpdate());
  }

  render() {
    const student_progress = all_students_progress[get_current_student()];
    if (student_progress !== undefined) {
      const preview_progress = { ...student_progress };
      Object.entries(get_preview_progresses()).forEach(
        ([lesson_slug, progress]) => {
          preview_progress[lesson_slug] = Math.max(
            preview_progress[lesson_slug],
            progress
          );
        }
      );
      const grade_blue = compute_grade(preview_progress);
      const grade_green = compute_grade(student_progress);
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            top: this.top_position,
          }}
          className={style.stick_to_the_right}
        >
          <div className={style.grade_green} title="This is your current grade">
            {grade_green.toFixed(1)} / 20
          </div>
          <div
            className={style.grade_blue}
            title="This is the grade that you would have if you were to validate the butterflies that you checked in blue. Click to reset those."
          >
            {BlueGrade(grade_blue)}
          </div>
          <div
            className={style.button_export}
            title="Downloads your blue butterflies as JSON."
          >
            <div>
              {export_as_json_button(preview_progress, get_current_student())}
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}

export { Grade, add_grade_listener, notify_grade_listeners };
