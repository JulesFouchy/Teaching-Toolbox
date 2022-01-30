import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useColorMode } from "@docusaurus/theme-common"

// Sets the MUI theme to match the color mode set by Docusaurus
export default ({ children }) => {
  const { isDarkTheme } = useColorMode()
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: isDarkTheme ? "dark" : "light",
        },
      })}
    >
      {children}
    </ThemeProvider>
  )
}
