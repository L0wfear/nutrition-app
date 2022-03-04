import { FC, memo, ReactElement, useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { NavLink as RouterLink, matchPath, useLocation, Route } from 'react-router-dom'
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill'
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill'
import { alpha, useTheme, styled } from '@mui/material/styles'
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material'
import { AppRoutes, PageRoute } from '@routes/@types/config'

const match = (path: string, pathname: string) => (path ? !!matchPath(path, pathname) : false)

const getNodePaths = (node: PageRoute) => {
  const children = node.children || []
  return children.reduce((acc, cur) => {
    if(cur.children) {
      acc.concat(getNodePaths(cur))
    } else {
      acc.push(cur.path)
    }
    return acc
  }, [node.path])
}

const renderNavItems = (availableRoutes: AppRoutes) => {
  return availableRoutes.reduce((routesAcc: Array<ReactElement>, curRoute) => {
    if (curRoute.children) {
      routesAcc.push(...renderNavItems(curRoute.children))
    } else {
      routesAcc.push(
        <Route
          key={curRoute.routePath || curRoute.path}
          path={curRoute.routePath || curRoute.path}
          element={<curRoute.component />}
        />
      )
    }
    return routesAcc
  }, [])
}

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
})) as any

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

type NavItemProps = {
  page: PageRoute
}

const NavItem: FC<NavItemProps> = memo(({ page }) => {
  console.info('render')
  const theme = useTheme()
  const { pathname } = useLocation()
  const isActiveRoot = useMemo(() => {
    console.info(getNodePaths(page))
    return match(page.path, pathname)
  }, [pathname, page.path])
  const { title, path, icon, info, children } = page
  const [open, setOpen] = useState(isActiveRoot)
  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    console.info(pathname, page.path)
  }, [pathname])

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  }

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  }

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {children.map((item) => {
              const { title, path } = item
              const isActiveSub = match(path, pathname)

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component='span'
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              )
            })}
          </List>
        </Collapse>
      </>
    )
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  )
})

type NavSectionProps = {
  appRoutes: AppRoutes
}

export const NavSection: FC<NavSectionProps> = memo(({ appRoutes }) => {
  return (
    <Box>
      <List disablePadding>
        {appRoutes.map((page) => (
          <NavItem key={page.title} page={page} />
        ))}
      </List>
    </Box>
  )
})
