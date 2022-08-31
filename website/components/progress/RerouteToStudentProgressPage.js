import React from "react"
import { useHistory, useLocation } from "@docusaurus/router"
import BrowserOnly from "@docusaurus/BrowserOnly"
import students from "@site/.docusaurus/plugin--all-students/default/all-students.json"

export default ({}) => (
  <BrowserOnly>
    {() => {
      const student_name = localStorage.getItem("student_name")

      if (student_name && students.includes(student_name)) {
        useHistory().replace(`./${student_name}`)
        useLocation().reload()
      } else {
        localStorage.removeItem("student_name")
      }
      return <div></div>
    }}
  </BrowserOnly>
)
