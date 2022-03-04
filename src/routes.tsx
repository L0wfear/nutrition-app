import { Route, Routes, Navigate } from 'react-router-dom'
import { AppLayout } from '@layouts/AppLayout'
import { AppRoutes } from '@routes/@types/config'
import { ReactElement } from 'react'
import { getAvailableRoutes } from '@utils/getAvailableRoutes'
import { appRoutes } from '@routes/appRoutes'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import DashboardApp from './pages/DashboardApp'
// import Products from './pages/Products'
// import Blog from './pages/Blog'
// import User from './pages/User'
// import NotFound from './pages/Page404'

const renderRoutes = (availableRoutes: AppRoutes) => {
  return availableRoutes.reduce((routesAcc: Array<ReactElement>, curRoute) => {
    if (curRoute.children) {
      routesAcc.push(...renderRoutes(curRoute.children))
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

export const Router = () => {
  return (
    <AppLayout>
      <Routes>
        {renderRoutes(getAvailableRoutes(appRoutes, []))}
        <Route path="*" element={<Navigate to="/test" />} />
      </Routes>
    </AppLayout>
  )
}
