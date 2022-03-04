import { AppRoutes, Permissions, Role } from '@routes/@types/config'

const checkIsPermited = (roles: Role[], permissions: Permissions) => {
  return true
  // return permissions.read && (roles.some(el => permissions.read?.includes(el)) || !permissions.read.length)
}

export const getAvailableRoutes = (appRoutes: AppRoutes, roles: Role[]) => {
  return appRoutes.reduce((routesAcc: AppRoutes, curRoute) => {
    const isPermited = checkIsPermited(roles, curRoute.permissions)
    if (isPermited && !curRoute.hiddenNav) {
      if (curRoute.children) {
        const children = getAvailableRoutes(curRoute.children, roles)
        if (children.length) {
          routesAcc.push({ ...curRoute, children })
        }
      } else {
        routesAcc.push(curRoute)
      }
    }
    return routesAcc
  }, [])
}
