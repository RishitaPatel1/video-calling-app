import React, { Component, useState } from "react";
import app from "./firebase-config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);
export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [verifyButton, setVerifyButton] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const[verified,setVerified] = useState(false)
  cons [otp,setOtp] = useState(""),

  onCaptaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': "invisible",
        callback: (response) => {
          onSignInSubmit();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      
      }, 
      auth);
  }
    const verifyCode = () => {
      window.confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        alert("Verification Done");
        setVerified() = true;
        setVerifyOtp() = false;
        // ...
      }).catch((error) => {
          alert("Invalid otp");
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }

    const onSignInSubmit = () => {
      onCaptaVerify();
      const phoneNumber = "+91" + mobile;
      const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("otp sent");
      setVerifyOtp(true);
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }

  const changeMobile = (e) => {
    setMobile({mobile: e.target.value}, function (){
      if(mobile.length == 10) {
        setMobile({
          verifyButton: true,
        });
      }
    });
  }

  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "AdarshT") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(fname, lname, mobile, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email: mobile,
          lname,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div id= 'recaptcha-container'></div>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType == "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>mobile </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter mobile"
              onChange={(e) => changeMobile(e)}
            />
            {verifyButton ? <input 
              type= "button"
              value= {verified ? "verified" : "verify"}
              onClick={onSignInSubmit()}
              style={{ 
                backgroundColor: "a0163d2",
                width: "100%",
                padding: 8,
                color:"white",
                border:"none",
              }}
              /> : null}
          </div>
            {verifyOtp ? <div className="mb-3">
            <label>otp </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter otp"
              onChange={(e) => setMobile({otp: e.target.value })}
            />
            <input 
              type= "button"
              value= "otp"
              onClick={verifyCode()}
              style={{ 
                backgroundColor: "a0163d2",
                width: "100%",
                padding: 8,
                color:"white",
                border:"none",
              }}
              />
          </div> : null}
          

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
