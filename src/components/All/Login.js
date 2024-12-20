import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {getUser} from "../Features/UserSlice";
import { LoginValidation } from '../Validation/LoginValidation';

function Login() {
  

  let [uname, setUname] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const msg=useSelector((state)=>state.counter.message);

  const user = useSelector((state) => state.counter.user);
  const isSuccess = useSelector((state) => state.counter.isSuccess);
  const isError = useSelector((state) => state.counter.isError);


  const {
    register,
    handleSubmit:submitForm,
    formState:{errors},
  }=useForm({resolver:yupResolver(LoginValidation)});

  const handleSubmit=(data)=>{
    const user={uname:uname,password:password};
    dispatch(getUser(user));
  }

  useEffect(() => {
    if (user && isSuccess) {
        navigate("/Home");
    }
    if (isError) {
        navigate("/Login"); // Redirect if error occurs
        // dispatch(resetUserState()); // Reset user state on failure
    }
}, [isSuccess, isError, user,navigate]);


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
          {...register('uname',{
            value:uname,
            onChange:(e)=>setUname(e.target.value)
          })}
        />
        <p className="error-message">{errors.uname?.message}</p>
      </div>

      <br/>

      <div className="form-group">
        <label htmlFor="password" className="centered-label">Password :</label>
        <br/>
        <input
          type="password"
          id="password"
          className="form-input"
          {...register('password',{
            value:password,
            onChange:(e)=>setPassword(e.target.value)
          })}
        />
        <p className='error'>{errors.password?.message}</p>
      </div>
      <br/><br/><br/>

      <button type="submit" className="login-button" onClick={submitForm(handleSubmit)}>Login</button>
    </div>
    <br/>
    <div>
    <button type="submit" className="back-button">Back</button>
    </div>
    </div>

    
  );
}

export default Login;
