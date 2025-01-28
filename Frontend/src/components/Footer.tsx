import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                marginTop: 'auto',
                width: '100%',
                borderTop: '2px solid #e0e0e0',
                py: 2,
                textAlign: 'center',
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1">
                    &copy; {new Date().getFullYear()} Fish Farm App. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};
