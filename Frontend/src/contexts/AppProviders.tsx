import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './AuthContext'

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
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
