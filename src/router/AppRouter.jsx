import { Route, Routes } from 'react-router-dom'

import { DsrRoutes } from '../drs'
import { Login, EmailReset, ResetUser } from '../auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path='login/*'
          element={
            <PublicRoute>
              {/* <LoginPage /> */}
              <Routes>
                <Route path='/*' element={<Login />} />
                <Route path='emailreset' element={<EmailReset />} />
                <Route path='resetuser/:token' element={<ResetUser />} />
              </Routes>
            </PublicRoute>
            }
        />
        <Route
          path='/*'
          element={
            <PrivateRoute>
              <DsrRoutes />
            </PrivateRoute>
        }
        />

        {/* <Route path="login" element={<LoginPage />} /> */}
        {/* <Route path="/*" element={ <HeroesRoutes />} /> */}
      </Routes>
    </>
  )
}
