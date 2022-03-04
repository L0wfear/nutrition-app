import { Box } from '@mui/material'
import { FC } from 'react'

type OwnProps = {
  sx?: object
}

export const Logo: FC<OwnProps> = ({ sx }) => {
  return <Box component='img' src='/static/logo.svg' sx={{ width: 40, height: 40, ...sx }} />
}
