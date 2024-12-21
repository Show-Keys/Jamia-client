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
import Swal from "sweetalert2";
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
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Both fields are required!',
      });
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
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.data.message || "You need to register first.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No regsterd',
        text: "You need to register first.",
      });
      console.error("Login error:", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 600,
          padding: 6,
          background: "linear-gradient(135deg, rgb(42, 139, 177), rgb(198, 134, 45), rgb(117, 103, 84))",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#fff", fontSize: "2rem" }}>
          Login
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2, fontSize: "1.2rem" }}>
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
          sx={{ backgroundColor: "#fff", borderRadius: 1, fontSize: "1.2rem" }}
          InputProps={{ style: { fontSize: "1.2rem" } }}
          InputLabelProps={{ style: { fontSize: "1.2rem" } }}
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
          sx={{ backgroundColor: "#fff", borderRadius: 1, fontSize: "1.2rem" }}
          InputProps={{ style: { fontSize: "1.2rem" } }}
          InputLabelProps={{ style: { fontSize: "1.2rem" } }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, fontSize: "1.2rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ mt: 2, fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 4, color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}
          onClick={() => navigate("/registration")}
        >
          New user? Register here
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
