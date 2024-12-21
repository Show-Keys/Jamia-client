import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../Features/UserSlice"; // Assuming you have an action to set the user token

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Both fields are required!");
      return;
    }
    setError(""); // Clear any existing errors

    try {
      const response = await axios.post("http://localhost:5000/api/users/userLogin", {
        uname: username,
        password,
      });

      if (response.data.message === 'success') {
        dispatch(setUserToken(response.data.token)); // Store the token in Redux state
        navigate("/search"); // Navigate to SearchJamiya on successful login
      } else {
        setError(response.data.message || "You need to register first.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#fff" }}>
          Login
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          id="username"
          label="User Name"
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            sx={{ ml: 1, color: "#fff" }}
          >
            Back
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "#fff", cursor: "pointer" }}
          onClick={() => navigate("/registration")}
        >
          New user? Register here
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
