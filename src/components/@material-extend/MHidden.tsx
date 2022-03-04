import { Theme, useMediaQuery } from '@mui/material'
import { FC } from 'react'

type OwnProps = {
  width:
    | 'xsDown'
    | 'smDown'
    | 'mdDown'
    | 'lgDown'
    | 'xlDown'
    | 'xsUp'
    | 'smUp'
    | 'mdUp'
    | 'lgUp'
    | 'xlUp'
}

const MHidden: FC<OwnProps> = ({ width, children }) => {
  const breakpoint = width.substring(0, 2)

  const hiddenUp = useMediaQuery((theme: Theme) => theme.breakpoints.up(breakpoint as any))
  const hiddenDown = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint as any))

  if (width.includes('Down')) {
    return hiddenDown ? null : <>{children}</>
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : <>{children}</>
  }

  return null
}

export default MHidden
