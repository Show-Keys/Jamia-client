import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLogin, resetState } from "../../Features/UserSlice";
import { LoginValidation } from '../../Validation/LoginValidation';
import "../../App.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import section1 from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.user);
  const isSuccess = useSelector((state) => state.user?.isSuccess);
  const isError = useSelector((state) => state.user?.isError);
  const message = useSelector((state) => state.user?.message);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation) });

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard'); // Redirect to dashboard or any other page after successful login
      dispatch(resetState());
    }
  }, [isSuccess, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      alert(message); // Show error message
      dispatch(resetState());
    }
  }, [isError, message, dispatch]);

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${section1})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={submitForm(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="User Name"
            variant="outlined"
            {...register('uname')}
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            error={!!errors.uname}
            helperText={errors.uname ? errors.uname.message : ''}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            {...register('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </form>
        <IconButton sx={{ mt: 2 }} color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
          <Typography variant="button" sx={{ ml: 1 }}>
            Back
          </Typography>
        </IconButton>
      </Container>
    </Box>
  );
};

export default Login;
