import { Container, Typography, Button, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export default function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container component="main" maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Box>
                <Typography variant="h1" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Oops! Page not found.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<HomeIcon />}
                    onClick={handleGoHome}
                    style={{ marginTop: '20px' }}
                >
                    Go to Homepage
                </Button>
            </Box>
        </Container>
    );
};
