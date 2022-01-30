import OriginalLayoutProviders from "@theme-original/LayoutProviders"
import React from "react"
import ThemeProvider from "@site/components/ThemeProvider"

export default function LayoutProviders(props) {
  return (
    <OriginalLayoutProviders>
      <ThemeProvider>{props.children}</ThemeProvider>
    </OriginalLayoutProviders>
  )
}
