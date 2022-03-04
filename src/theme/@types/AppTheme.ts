import { customShadows } from '@theme/shadows'
import { palette } from '@theme/palette'
import { shape } from '@theme/shape'

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: typeof customShadows
    palette: typeof palette
    shape: typeof shape
  }
  interface ThemeOptions {
    customShadows: typeof customShadows
  }
}
