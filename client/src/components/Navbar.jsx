import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar(props) {
  return (
    <AppBar sx={{ bgcolor: "white" }} position="relative">
      <Toolbar>
        {props.children}
        <Typography marginRight="auto" variant="h6" color="black" noWrap>
          MERN-Stack
        </Typography>
        <Button href="/login">Login</Button>
        <Button href="/register">Register</Button>
      </Toolbar>
    </AppBar>
  );
};