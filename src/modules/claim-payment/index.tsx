import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import ClaimInputForm from "./components/ClaimInputForm";
import OtpForm from "./components/OtpForm";
import getStripe from "src/shared/utils/get-stripejs";
import ThanksSection from "./components/ThanksSection";
import HocClaimPage from "components/HocClaimPage";
import Payment from "./components/payment";
import axios from "axios";
import { generateOTP } from "src/shared/utils/otp-generator";
import { CLAIM_SCHOOL_PRICE_ID } from "services/config";

const ClaimPaymentComponent = ({ schoolData }) => {
  const [verificationTitle, setVerificationTitle] = useState("");
  const [emailPhoneInputRecordId, setEmailPhoneInputRecordId] = useState();
  const [isEmailPhoneInputLoading, setIsEmailPhoneInputLoading] =
    useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [goBackButton, setGoBackButton] = useState(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState<
    { phone } | null | undefined
  >();
  const [phoneInputErrorMessage, setPhoneInputErrorMessage] = useState("");
  const [step, setStep] = useState(1); // Set an initial step

  const onEmailPhoneInput = async (data) => {
    setIsEmailPhoneInputLoading(true);
    setOtpEmail(data?.email);
    axios
      .post("/api/ClaimSchoolPlan", {
        "Customer Email": data?.email || null,
        "Phone Number": phoneNumberValue?.phone || null,
        Schools: [schoolData?.recordId],
      })
      .then((res) => {
        if (res?.data?.[0]?.id) {
          setEmailPhoneInputRecordId(res.data?.[0]?.id);
          const recordId = res.data?.[0]?.id;
          onOtpGenerate(recordId);
        }
        setIsEmailPhoneInputLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const onOtpGenerate = async (
    emailPhoneInputRecordId: string
  ): Promise<void> => {
    const otp = generateOTP();
    axios
      .put("/api/ClaimSchoolPlan/otp-generate", {
        id: emailPhoneInputRecordId,
        fields: {
          Otp: otp,
        },
      })
      .then(() => {
        setStep(2);
      })
      .catch((err) => {
        setPhoneInputErrorMessage(
          "Please Enter correct phone number with country code"
        );
        console.log(err);
      });
  };

  const createPaymentDataOnDb = async (stripeId: string): Promise<void> => {
    axios
      .put("/api/ClaimSchoolPlan", {
        id: emailPhoneInputRecordId,
        fields: {
          "Payment Status": "Paid",
          Currency: "USD",
          "Stripe Date": new Date().toDateString(),
          "Stripe ID": stripeId,
          "Price ID": CLAIM_SCHOOL_PRICE_ID,
          Subscribe: true,
        },
      })
      .then(() => {
        setStep(4);
      });
  };

  useEffect(() => {
    if (step === 1) {
      setVerificationTitle("Let’s verify ownership");
    }
    if (step === 2) {
      setVerificationTitle("Let’s verify ownership");
    }
    if (step === 3) {
      setVerificationTitle("DOJO+ Membership");
    }
    if (step === 4) {
      setVerificationTitle("");
      setGoBackButton(true);
    }
  }, [step]); // Run this effect only when the step changes

  return (
    <HocClaimPage
      verificationTitle={verificationTitle}
      schoolName={schoolData?.schoolName}
      schoolLogo={schoolData?.schoolLogo?.[0]?.url || "/logo/dojo.png"}
      isBackButton={goBackButton}
      step={step}
      emailPhoneInputRecordId={emailPhoneInputRecordId}
      onOtpGenerate={onOtpGenerate}
    >
      {step === 1 && (
        <ClaimInputForm
          onEmailPhoneInput={onEmailPhoneInput}
          isEmailPhoneInputLoading={isEmailPhoneInputLoading}
          setPhoneNumberValue={setPhoneNumberValue}
          phoneInputErrorMessage={phoneInputErrorMessage}
          phoneNumberValue={phoneNumberValue}
        />
      )}
      {step === 2 && (
        <div>
          <OtpForm
            setStep={setStep}
            emailPhoneInputRecordId={emailPhoneInputRecordId}
          />
        </div>
      )}
      {step === 3 && (
        <Elements stripe={getStripe()}>
          <Payment
            handlePaymentSubmit={createPaymentDataOnDb}
            currency="USD"
            priceId={CLAIM_SCHOOL_PRICE_ID}
            isEmailInputField={false}
            email={otpEmail}
            recurring
          />
        </Elements>
      )}
      {step === 4 && <ThanksSection />}
    </HocClaimPage>
  );
};

export default ClaimPaymentComponent;
