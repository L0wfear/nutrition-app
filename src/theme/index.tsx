import { FC, useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
import { shape } from '@theme/shape'
import { palette } from '@theme/palette'
import { typography } from '@theme/typography'
import componentsOverride from '@theme/overrides'
import { customShadows, shadows } from '@theme/shadows'

export const ThemeConfig: FC = ({ children }) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
