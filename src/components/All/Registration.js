import React from 'react';


function Registeration(){
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
            />
          </div>
          <br/>

          <div className="form-group">
            <label className="centered-label">User Name :  </label>
            <input
              type="text"
              id="username"
              className="form-input"
            />
          </div>
          <br/>

          <div className="form-group">
            <label className="centered-label">Phone Number :  </label>
            <input
              type="text"
              id="phone"
              className="form-input"
            />
          </div>
          <br/>
    
          <div className="form-group">
            <label className="centered-label">Password :  </label>
            <input
              type="password"
              id="password"
              className="form-input"
            />
          </div>
          <br/>
    
          <div className="form-group">
            <label className="centered-label"> Confirm Password :  </label>
            <input
              type="password"
              id="password"
              className="form-input"
            />
          </div>
          <br/>
          <div className="form-group">
            <label className="centered-label"> Admin code :  </label>
            <input
              type="text"
              id="adminCode"
              className="form-input"
            />
          </div>
          <br/><br/>
    
          <button type="submit" className="login-button">Register</button>
        </div>
        <br/>
        <div>
        <button type="submit" className="back-button">Back</button>
        </div>
        </div>
    
        
      );
}


export default Registeration;