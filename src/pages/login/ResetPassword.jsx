import React from "react";
import LogoSection from "../../components/LogoSection";
import ResetPasswordBox from "../../components/ResetPasswordBox";
import './resetpassword.css';

function ResetPassword(){
    return(
        <div>
      <LogoSection />
      <ResetPasswordBox/>
      </div>
        );
}

export default ResetPassword;