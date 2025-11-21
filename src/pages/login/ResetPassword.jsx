import React from "react";
import LogoSection from "../../components/LogoSection";
import ResetPasswordBox from "../../components/ResetPasswordBox";
import './reset-password.css';

function ResetPassword(){
  return(
    <div className="reset-password-container">
      <LogoSection />
      <ResetPasswordBox/>
    </div>
  );
}

export default ResetPassword;