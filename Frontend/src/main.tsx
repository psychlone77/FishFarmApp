import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'
import PrivateRoute from './pages/PrivateRoute.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FishFarmPage from './pages/FishFarmPage.tsx'
import Layout from './layout.tsx'
import { CssBaseline } from '@mui/material'
import WorkerPage from './pages/WorkerPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import LogoutPage from './pages/LogoutPage.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#01579b',
    },
    secondary: {
      main: '#00796b',
    },
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',

  },
})
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* TODO: Extract the router to a different component */}
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/logout' element={<LogoutPage />} />
            <Route path='/' element={<PrivateRoute element={<Layout />} />}>
              <Route index element={<App />} />
                <Route
                path='fish-farms/:fishFarmId'
                element={<FishFarmPage />}
                />
                <Route path='fish-farms/:fishFarmId/workers/:workerId' element={<WorkerPage />} />
              {/* TODO: Add sign up page */}
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
