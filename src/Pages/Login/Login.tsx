import { Avatar, Box, Button, Link, Checkbox, FormControlLabel, Grid, TextField, Typography, Container } from "@mui/material"
import { useState } from "react"
import { startAuth } from '../../features/auth/auth.slice';
import { useAppDispatch } from "../../Redux/hooks";

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();



  const login = () => {
    dispatch(startAuth(email, password));
  };

  return (
    
    <Container component="main" maxWidth="xs"  >
      <Box
          sx={{
            // marginTop: 2,
            display: 'flex',
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingreso
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              // autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
                // autoComplete="current-password"
            />

            <Button
              onClick={login}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
        </Container>
    
  )
}
