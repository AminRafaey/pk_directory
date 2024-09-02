import React from "react";
import {
  ClaimTitle,
  ClaimWrapper,
  ContentSection,
  FormSection,
  ReturnToSchoolButton,
  SchoolLogo,
  SchoolName,
  SchoolSection,
  TermAndCondition,
  VerifiedLogo,
  VerifyTitle,
} from "./components/claimpage.styled";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import Tooltip from "@mui/material/Tooltip";

const HocClaimPage = (props) => {
  const { query, push } = useRouter();
  return (
    <ClaimWrapper>
      <Grid
        container
        sx={{
          width: "100%",
        }}
      >
        <Grid item md={6} lg={6}>
          <ContentSection>
            <VerifyTitle>{props.verificationTitle}</VerifyTitle>
            <SchoolSection>
              <SchoolLogo src={props.schoolLogo} />
              <div
                style={{
                  display: "flex",
                }}
              >
                <Tooltip title={props.schoolName}>
                  <SchoolName>{props.schoolName}</SchoolName>
                </Tooltip>
                {props.isBackButton && (
                  <VerifiedLogo src="/icons/verified-green-icon.svg" />
                )}
              </div>
            </SchoolSection>
            {props.isBackButton && (
              <ReturnToSchoolButton onClick={() => push(`/${query.slug}`)}>
                GO TO {props.schoolName}
              </ReturnToSchoolButton>
            )}
          </ContentSection>
        </Grid>
        <Grid item md={6} lg={6}>
          <FormSection>
            {props.step === 1 && (
              <>
                <ClaimTitle>Choose a way to complete your claim</ClaimTitle>
                <TermAndCondition>
                  By continuing, you agree to DOJO+
                  <a style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Terms
                  </a>{" "}
                  and acknowledge our{" "}
                  <a style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Privacy Policy
                  </a>
                  .
                </TermAndCondition>
              </>
            )}
            {props.step === 2 && (
              <>
                <ClaimTitle>
                  Enter the code we’ve sent to your email to verify
                </ClaimTitle>
                <TermAndCondition>
                  We just sent you an email with a 4-digit code. The code may
                  take up to a minute to arrive. Nothing yet?{" "}
                  <a
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      props.onOtpGenerate(props.emailPhoneInputRecordId)
                    }
                  >
                    Get a new code
                  </a>
                  .
                </TermAndCondition>
              </>
            )}
            {props.step === 3 && (
              <>
                <ClaimTitle>Add a payment method</ClaimTitle>
                <TermAndCondition>
                  We will charge $10 dollars every month to keep your page
                  verified. This will give you more visibility in DOJO+
                </TermAndCondition>
              </>
            )}
            {props.step === 4 && (
              <>
                <ClaimTitle
                  style={{
                    fontSize: "40px",
                    fontWeight: "400",
                    lineHeight: "48px",
                  }}
                >
                  Thank you for verifying your school in DOJO+
                </ClaimTitle>
                <TermAndCondition style={{ marginTop: "62px" }}>
                  You will have access to manage your school in our app.
                </TermAndCondition>
              </>
            )}
            <div>{props.children}</div>
          </FormSection>
        </Grid>
      </Grid>
    </ClaimWrapper>
  );
};

export default HocClaimPage;
