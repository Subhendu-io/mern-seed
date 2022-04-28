import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Box from '@mui/material/Box';

export default function Contact() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main className='app-main'>
          <h1>Contact US</h1>
        </main>
        <Footer />
    </Box>
  );
};