import { Theme } from '@mui/material'

export default (theme: Theme) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  }
}
