import React from "react"
import { useHistory } from "@docusaurus/router"
import BrowserOnly from "@docusaurus/BrowserOnly"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import students from "@site/.docusaurus/plugin--all-students/default/all-students.json"

export default ({}) => (
  <BrowserOnly>
    {() => {
      let student_name = localStorage.getItem("student_name")
      if (student_name && !students.includes(student_name)) {
        localStorage.removeItem("student_name")
        student_name = null
      }
      const history = useHistory()
      return (
        <div>
          <Dropdown
            options={students}
            onChange={(obj) => {
              const name = obj.value
              localStorage.setItem("student_name", name)
              history.replace(`./${name}`)
            }}
            value={student_name}
            placeholder="Select your name"
          />
        </div>
      )
    }}
  </BrowserOnly>
)
