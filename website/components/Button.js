import React from "react"
import style from "./Button.module.css"

export default ({ content, onClick }) => (
  <div className={style.button}>
    <div onClick={onClick}>{content}</div>
  </div>
)
