import React from "react";
import LogoSection from "../../components/LogoSection";
import EmailVeridicationBox from "../../components/EmailVerificationBox";
import './email-verification.css';

function EmailVeridication() {
  return (
    <>
      <div className="email-verification-container">
        <LogoSection />
        <EmailVeridicationBox />
      </div>
    </>
  );
}

export default EmailVeridication;
