import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Box, Container } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '../../Features/UserSlice';
import { userSchemaValidation } from '../../Validation/UserValidation';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values)).then((result) => {
      setSubmitting(false);
      if (result.meta.requestStatus === 'fulfilled') {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered!',
        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: result.payload?.error || 'An error occurred during registration.',
        });
      }
    });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4">Register</Typography>
        <Formik
          initialValues={{
            fullName: '',
            uname: '',
            pnumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            adminCode: '',
          }}
          validationSchema={userSchemaValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    variant="outlined"
                    helperText={<ErrorMessage name="fullName" />}
                    error={!!<ErrorMessage name="fullName" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Username"
                    name="uname"
                    variant="outlined"
                    helperText={<ErrorMessage name="uname" />}
                    error={!!<ErrorMessage name="uname" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Phone Number"
                    name="pnumber"
                    variant="outlined"
                    helperText={<ErrorMessage name="pnumber" />}
                    error={!!<ErrorMessage name="pnumber" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    helperText={<ErrorMessage name="email" />}
                    error={!!<ErrorMessage name="email" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    helperText={<ErrorMessage name="password" />}
                    error={!!<ErrorMessage name="password" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    variant="outlined"
                    helperText={<ErrorMessage name="confirmPassword" />}
                    error={!!<ErrorMessage name="confirmPassword" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Admin Code (if applicable)"
                    name="adminCode"
                    variant="outlined"
                    helperText={<ErrorMessage name="adminCode" />}
                    error={!!<ErrorMessage name="adminCode" />}
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error">{error.message || error}</Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting || loading}
                  >
                    {loading ? 'Loading...' : 'Register'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Registration;