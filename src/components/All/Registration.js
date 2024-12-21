import {React,useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import { addUser } from "../../Features/UserSlice";
import {userSchemaValidation} from "../../Validation/UserValidation";
import "../../App.css";


const Registeration =()=>{
  const [fullName, setfullName] = useState("");
  const [uname, setuname] = useState("");
  const [pnumber, setpnumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  // const [admincode, setadmincode] = useState("");

  const msg=useSelector((state)=>state.counter.message);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {
    register,
    handleSubmit: submitForm, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), 
  });

  const handleSubmit = (data) => {
    const user={fullName:fullName,uname:uname,password:password,pnumber:pnumber};
    dispatch(addUser(user));
      navigate("/Login");
  };
  
    return (
        <div>
        <div className="app-container1">
          <h1>Registeration</h1>
          <div className="form-group">
            <label className="centered-label">Full Name :  </label>
            <input
              type="text"
              id="fullname"
              className="form-input"
              {...register("fullName", {
                value: fullName,
                onChange: (e) => setfullName(e.target.value),
              })}
            />
          </div>
          <p className="error">{errors.fullName?.message}</p>
          <br/>

          <div className="form-group">
            <label className="centered-label">User Name :  </label>
            <input
              type="text"
              id="username"
              className="form-input"
              {...register("uname", {
                value: uname,
                onChange: (e) => setuname(e.target.value),
              })}
            />
          </div>
          <p className="error">{errors.uname?.message}</p>
          <br/>

          <div className="form-group">
            <label className="centered-label">Phone Number :  </label>
            <input
              type="text"
              id="phone"
              className="form-input"
              {...register("pnumber", {
                value: pnumber,
                onChange: (e) => setpnumber(e.target.value),
              })}
            />
          </div>
          <p className="error">{errors.pnumber?.message}</p>
          <br/>
    
          <div className="form-group">
            <label className="centered-label">Password :  </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              {...register("password", {
                value: password,
                onChange: (e) => setpassword(e.target.value),
              })}
            />
          </div>
          <p className="error">{errors.password?.message}</p>
          <br/>
    
          <div className="form-group">
            <label className="centered-label"> Confirm Password :  </label>
            <input
              type="password"
              id="password"
              className="form-input"
              {...register("confirmPassword", {
                value: confirmPassword,
                onChange: (e) => setconfirmPassword(e.target.value),
              })}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>
          <br/>
          {/* <div className="form-group">
            <label className="centered-label"> Admin code :  </label>
            <input
              type="text"
              id="adminCode"
              className="form-input"
            />
          </div> */}
          <br/><br/>
    
          <button type="submit" className="login-button"  onClick={submitForm(handleSubmit)}>Register</button>
          <p className="error">{msg}</p>
        </div>
        <br/>
        </div>
    
        
      );
}


export default Registeration;