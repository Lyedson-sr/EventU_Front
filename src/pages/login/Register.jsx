import React from "react";
import LogoSection from "../../components/LogoSection";
import RegisterBox from "../../components/RegisterBox";
import './register.css';

function Register() {
  return (
    <div className="register-container">
      <LogoSection />
      <RegisterBox />
    </div>
  );
}

export default Register;
