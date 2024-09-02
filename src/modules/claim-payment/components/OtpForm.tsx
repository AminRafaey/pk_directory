import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { OtpButton } from "./claim-payment-styled";
import axios from "axios";
import OtpInput from "react-otp-input";

const OtpForm = ({ setStep, emailPhoneInputRecordId }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpError, setIsOtpError] = useState<boolean>();

  const onSubmit = async () => {
    setIsOtpLoading(true);
    setIsOtpError(otp?.length < 4 ? true : false);
    axios
      .get("/api/ClaimSchoolPlan", {
        params: {
          recordId: emailPhoneInputRecordId,
        },
      })
      .then((res) => {
        setIsOtpLoading(true);
        if (res?.data?.[0]?.otp === otp) {
          setIsOtpLoading(false);
          setStep(3);
        } else {
          setIsOtpLoading(false);
          setErrorMessage("Invalid OTP Authentication");
        }
      })
      .catch((err) => {
        setIsOtpLoading(false);
        console.log("Error", err);
      });
  };

  return (
    <div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderInput={(props) => (
          <input
            {...props}
            style={{
              marginTop: "28px",
              width: "65px",
              border: isOtpError ? "1px solid red" : "1px solid #3C3C3C",
              borderRadius: "4px",
              color: "#FCFCFC",
              textAlign: "center",
              height: "64px",
              padding: "16px",
              marginRight: "24px",
              background: "#111111",
              // for latter use
              // "& fieldset": { border: "none" },
            }}
          />
        )}
      />
      <OtpButton onClick={() => onSubmit()}>
        {isOtpLoading ? (
          <CircularProgress color="inherit" size={15} />
        ) : (
          <p>VERIFY OTP</p>
        )}
      </OtpButton>
      <div
        style={{
          color: "#D21632",
          marginTop: "10px",
          fontWeight: "400",
        }}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default OtpForm;
