import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../../Features/UserSlice';
import "../../App.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminCode: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate('/AdminBoard');
      } else {
        navigate('/search');
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (result.meta.requestStatus !== 'fulfilled') {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message || 'Invalid credentials. Please try again.',
        });
      }
    });
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Admin Code (optional)"
                name="adminCode"
                variant="outlined"
                value={formData.adminCode}
                onChange={handleChange}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error.message || error.toString()}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => navigate('/')}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        <Typography
          variant="body2"
          sx={{ mt: 4, color: "black", cursor: "pointer", fontSize: "1.2rem" }}
          onClick={() => navigate("/registration")}
        >
          New user? Register here
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
