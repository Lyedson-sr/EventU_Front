import React from "react";
import LogoSection from "../../components/LogoSection";
import ForgotPasswordBox from "../../components/ForgotPasswordBox";
import './forgot-password.css';

function ForgotPassword() {
  return (
    <>
        <div className="container">
          <LogoSection />
          <ForgotPasswordBox />
        </div>
    </>
  );
}

export default ForgotPassword;
