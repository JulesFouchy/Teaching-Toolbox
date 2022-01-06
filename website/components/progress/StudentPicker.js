import React from "react"
import TextField from "@mui/material/TextField"
import all_students_progress from "@site/.docusaurus/all-students-progress-plugin/default/all-students-progress.json"

const add_student_listener = (cb) => {
  if (!window.student_listeners) {
    window.student_listeners = []
  }
  window.student_listeners.push(cb)
}
const notify_student_listeners = () => {
  window.student_listeners.forEach((cb) => cb())
}
const get_current_student = () =>
  localStorage.getItem("current_student_name") || ""
const set_current_student = (student) => {
  localStorage.setItem("current_student_name", student)
  notify_student_listeners()
}

const student_is_invalid = (student) =>
  all_students_progress[student] === undefined

class StudentPicker extends React.Component {
  constructor({}) {
    super()
    this.is_in_error_state = student_is_invalid(get_current_student())
    add_student_listener(() => this.forceUpdate())
  }

  render() {
    return (
      <div>
        <TextField
          id="student-picker"
          label="Search for your name"
          variant="outlined"
          defaultValue={get_current_student()}
          error={this.is_in_error_state}
          helperText={
            this.is_in_error_state
              ? 'This name doesn\'t exist. You should format it like "jules-f", without accents.'
              : ""
          }
          onChange={(event) => {
            const student = event.target.value
            this.is_in_error_state = student_is_invalid(student)
            set_current_student(student)
          }}
        />
      </div>
    )
  }
}

export { StudentPicker, get_current_student, add_student_listener }
