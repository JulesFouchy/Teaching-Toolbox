import React from "react"
import Admonition from "@theme/Admonition"
import Resource from "./Resource"

export default function GoingFurther({ resources }) {
  return (
    <Admonition type="info" title="Going Further">
      {resources.map((res) => (
        <p>{Resource(res)}</p>
      ))}
    </Admonition>
  )
}
