import { AuthProvider } from './auth'
import { AppRouter } from './router/AppRouter'

export function App () {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
