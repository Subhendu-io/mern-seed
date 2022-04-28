import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';

import Header from './../layouts/Header';
import Footer from './../layouts/Footer';

export default function Album() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main className='app-main'>
            <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }} >
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                        MERN-Stack
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        MERN Stack is a Javascript Stack that is used for easier and faster deployment 
                        of full-stack web applications. MERN Stack comprises of 4 technologies namely: 
                        MongoDB, Express, React and Node.js. It is designed to make the development 
                        process smoother and easier.
                    </Typography>
                    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                        <Button href="https://github.com/Subhendu-io/mern-seed" variant="contained">
                            Get Started
                        </Button>
                        <Button href="https://github.com/Subhendu-io" variant="outlined">
                            <GitHubIcon /> <span style={{ marginLeft: '5px' }}>Follow Me On GitHub</span>
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </main>
        <Footer />
    </Box>
  );
};