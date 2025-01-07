import { createTheme, ThemeProvider, Typography } from '@mui/material'
import './App.css'
import CustomNavbar from './components/CustomNavbar'
import FishFarmsGrid from './components/FishFarmsGrid'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Outfit, sans-serif',
    },
  })
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CustomNavbar/>
        <Typography variant="h3">Fish Farms</Typography>
        <FishFarmsGrid/>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
