import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './AuthContext'
import { ToastContainer } from 'react-toastify'

export default function AppProviders({ children }: { children: ReactNode }) {
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
    defaultOptions: { queries: { retry: 2, refetchOnWindowFocus: false } },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme.palette.mode}
        />
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
