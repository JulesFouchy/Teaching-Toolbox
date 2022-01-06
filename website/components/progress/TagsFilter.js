import React from "react"
import style from "./TagsFilter.module.css"
import lessons_tags from "@site/.docusaurus/lessons-list-plugin/default/lessons_tags.json"
import Button from "../Button"

const add_tags_filter_listener = (cb) => {
  if (!window.tags_filter_listeners) {
    window.tags_filter_listeners = []
  }
  window.tags_filter_listeners.push(cb)
}

const notify_tags_filter_listeners = () => {
  window.tags_filter_listeners.forEach((cb) => cb())
}

const tag_filter = (tag_name, selected_tags) => {
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
        notify_tags_filter_listeners()
      }}
    >
      {tag_name}
    </div>
  )
}

class TagsFilter extends React.Component {
  constructor({}) {
    super()
    window.selected_tags = [...lessons_tags]
    add_tags_filter_listener(() => this.forceUpdate())
  }

  render() {
    return (
      <div className={style.tags_filters}>
        <Button
          content="Select All"
          onClick={() => {
            window.selected_tags.length = 0
            lessons_tags.forEach((tag_name) =>
              window.selected_tags.push(tag_name)
            )
            notify_tags_filter_listeners()
          }}
        />
        <Button
          content="Remove All"
          onClick={() => {
            window.selected_tags.length = 0
            notify_tags_filter_listeners()
          }}
        />
        <div className={style.tags_filter_container}>
          {lessons_tags.map((tag_name) =>
            tag_filter(tag_name, window.selected_tags)
          )}
        </div>
      </div>
    )
  }
}

export { TagsFilter, add_tags_filter_listener }
