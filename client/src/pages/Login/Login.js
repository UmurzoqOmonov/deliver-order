import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { openEye, closeEye } from "./swgs";
import logo from "../../asserts/images/dashboardLogo.svg";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  const [typeState, setTypeState] = useState(false);

  const typeChangeHandler = () => {
    setTypeState(!typeState);
  };

  const loginHandler = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <img src={logo} />
          <h2>Deliver Pizza</h2>
        </div>

        <div className={styles.header}>
          <h1>Log In to Deliver Pizza</h1>
          <p>Enter your email and password below</p>
        </div>

        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(loginHandler)}
        >
          <div>
            <label htmlFor="username">Email</label>
            <input
              {...register("username")}
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              id="password"
              type={typeState ? "text" : "password"}
              placeholder="Password"
            />
            <div className={styles.changeType}>
              <div onClick={typeChangeHandler}>
                {typeState ? openEye : closeEye}
              </div>
            </div>
          </div>

          <button>Log In</button>
        </form>

        <div className={styles.footer}>
          <p>Don’t have an account?</p>
          <a className={styles.signUpLink}>Sign Up</a>
        </div>
        <a className={styles.forgotPassword}>Forgot password?</a>
      </div>
    </div>
  );
}

export default Login;
