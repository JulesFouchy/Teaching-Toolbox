import React from "react"

export default function VSCodeExtension({ id }) {
  const link = `https://marketplace.visualstudio.com/items?itemName=${id}`
  return (
    <a href={link} target="_blank">
      {id}
    </a>
  )
}
