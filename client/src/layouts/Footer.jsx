import Box from '@mui/material/Box';
import Copyright from '../components/Copyright';

export default function Footer() {
  return (
    <Box sx={{ py: 2, px: 2, mt: 'auto' }} component="footer">
      <Copyright />
    </Box>
  );
};