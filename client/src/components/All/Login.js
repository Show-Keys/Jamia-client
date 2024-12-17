import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from 'react';

function Login() {
  /*
  let [userName, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
  */

  return (
    <div>
    <div className="app-container">
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="username" className="centered-label">User Name :</label>
        <br/>
        <input
          type="text"
          id="username"
          className="form-input"
          // {...register('username')}
        />
        {/* {errors.username && <p className="error-message">{errors.username?.message}</p>} */}
      </div>

      <br/>

      <div className="form-group">
        <label htmlFor="password" className="centered-label">Password :</label>
        <br/>
        <input
          type="password"
          id="password"
          className="form-input"
          // {...register('password')}
        />
        {/* {errors.password && <p className="error-message">{errors.password.message}</p>} */}
      </div>
      <br/><br/><br/>

      <button type="submit" className="login-button">Login</button>
    </div>
    <br/>
    <div>
    <button type="submit" className="back-button">Back</button>
    </div>
    </div>

    
  );
}

export default Login;
