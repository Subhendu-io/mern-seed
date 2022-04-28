import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';

export default function Header() {
  return (
    <header>
      <CssBaseline />
      <Navbar>
        <Logo width={'50px'} />
      </Navbar>
    </header>
  );
};