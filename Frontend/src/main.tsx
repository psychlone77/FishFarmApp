import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'
import PrivateRoute from './pages/PrivateRoute.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FishFarmPage from './pages/FishFarmPage.tsx'
import Layout from './layout.tsx'

const theme = createTheme({
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
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateRoute element={<Layout />} />}>
              <Route path='/' element={<App />} />
              <Route
                path='/fish-farms/:fishFarmId'
                element={<PrivateRoute element={<FishFarmPage />} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
