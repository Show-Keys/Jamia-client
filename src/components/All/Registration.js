import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addUser, resetState } from "../../Features/UserSlice";
import { userSchemaValidation } from "../../Validation/UserValidation";
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

const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [uname, setUname] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admincode, setAdminCode] = useState("");

  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);
  const message = useSelector((state) => state.user.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/login'); // Redirect to login or any other page after successful registration
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
    dispatch(addUser(data));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Registration
        </Typography>
        <form onSubmit={submitForm(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                variant="outlined"
                {...register('fullName')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="User Name"
                name="uname"
                variant="outlined"
                {...register('uname')}
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                error={!!errors.uname}
                helperText={errors.uname ? errors.uname.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="pnumber"
                variant="outlined"
                {...register('pnumber')}
                value={pnumber}
                onChange={(e) => setPnumber(e.target.value)}
                error={!!errors.pnumber}
                helperText={errors.pnumber ? errors.pnumber.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                {...register('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                variant="outlined"
                {...register('confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Admin Access Code"
                name="admincode"
                variant="outlined"
                {...register('admincode')}
                value={admincode}
                onChange={(e) => setAdminCode(e.target.value)}
                error={!!errors.admincode}
                helperText={errors.admincode ? errors.admincode.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                color="secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Registration;