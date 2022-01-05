import React from "react"

export default function Resource({
  title,
  author,
  link,
  duration,
  description,
}) {
  return (
    <span>
      <a href={link} target="_blank">
        {author}, <i>{title}</i>
      </a>
      {duration && <span> ({duration})</span>}
      {description && <span> {description}</span>}
    </span>
  )
}
