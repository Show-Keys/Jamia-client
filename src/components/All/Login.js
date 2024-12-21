import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../../Features/UserSlice"; // Assuming you have this action
import "../../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, isSuccess, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (isSuccess) {
      navigate("/search"); // Navigate to SearchJamiya on successful login
    }
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: message || 'Login failed. Please try again.',
      });
    }
  }, [isSuccess, isError, message, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser({ uname: data.username, password: data.password }));
  };

  return (
    <div className="app-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username" className="centered-label">User Name :</label>
          <br/>
          <input
            type="text"
            id="username"
            className="form-input"
            {...register('username', {
              value: username,
              onChange: (e) => setUsername(e.target.value),
              required: 'Username is required',
            })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="password" className="centered-label">Password :</label>
          <br/>
          <input
            type="password"
            id="password"
            className="form-input"
            {...register('password', {
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: 'Password is required',
            })}
          />
          <p className='error'>{errors.password?.message}</p>
        </div>
        <br/><br/><br/>
        <button type="submit" className="login-button">Login</button>
      </form>
      <br/>
      <button type="button" className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Login;
