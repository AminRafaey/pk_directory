import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// @ts-ignore
import "react-phone-number-input/style.css";
import { Button, CircularProgress,  styled } from "@mui/material";
import {
  FreeTrialInputFieldWrapper,
  InputFieldContainer,
} from "./free-trial-class-form-styled";
import { InputTextField, Textarea } from "components/InputTextField";
import axios from "axios";
import { useRouter } from "next/router";
import { RefType, Toastify } from "src/shared/components/Tosatify";
import phone from "phone";
import CustomizePhoneNumberInput from "components/CustomizePhoneNumberInput";

export const Error = styled("p")({
  fontWeight: "500",
  fontSize: "12px",
  paddingLeft: "1rem",
  marginTop: "0",
  marginBottom: "0",
  color: "#d32f2f",
});

const HelperText = styled("div")({
  whiteSpace: "nowrap",
  textTransform: "capitalize",
  fontSize: "14px",
  color: "gray",
  fontWeight: "500",
  margin: "0",
  paddingInline: "16px",
  paddingTop: "5px",
});

const FreeTrailClassComponent = () => {
  const router = useRouter();
  const [personNumber, setPersonNumber] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<any>({
    code: "BR",
    label: "Brazil",
    phone: "55",
  });

  const [isLoading, setIsLoading] = useState(false);
  const isValidPhoneNumber = phone(
    `+${selectedCountry?.phone}${personNumber?.phone}`
  );
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<any>();
  const phoneNumber = getValues("phone");
  const validateEmail = (value) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(value) || "Invalid email address";
  };
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";

  const onSubmit = async (data, e) => {
    const payload = {
      name: data?.name,
      email: data?.email,
      phone: personNumber?.phone,
      notes: data?.information,
      school_slug: router?.query?.slug,
      Country: selectedCountry?.label,
      urlSource: hostname,
    };

    setIsLoading(true);

    try {
      const response = await axios.post("/api/customer/", {
        customer: payload,
      });
      // Handle the response if needed
      console.log("response", response.data);
      successAlert.current.call();
      setIsLoading(false);
      reset();
    } catch (error) {
      errorAlert.current.call();
      console.error("API error:", error);
      setIsLoading(false);
    }
  };

  return (
    <FreeTrialInputFieldWrapper>
      <Toastify
        ref={successAlert}
        type="success"
        message="Your free trial class request has been successfully received"
      />
      <Toastify
        ref={errorAlert}
        type="error"
        message="Your free trial class request has not been successfully received"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFieldContainer>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <InputTextField
                  field={field}
                  errors={errors.name}
                  placeholder="Full Name"
                />
              );
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          {/* <FieldName>Email</FieldName> */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              validate: validateEmail,
            }}
            render={({ field }) => {
              return (
                <InputTextField
                  field={field}
                  errors={errors.email}
                  placeholder="Email"
                />
              );
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          {/* <FieldName>Phone number</FieldName> */}
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: () => isValidPhoneNumber?.isValid,
            }}
            render={({ field }) => {
              return (
                <CustomizePhoneNumberInput
                  {...field}
                  personNumber={personNumber}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  setPersonNumber={setPersonNumber}
                />
              );
            }}
          />

          {!isValidPhoneNumber?.isValid && errors?.phone && (
            <Error>Provide Valid Input</Error>
          )}
        </InputFieldContainer>
        <InputFieldContainer>
          <Controller
            name="information"
            control={control}
            rules={{
              required: "true",
              maxLength: 2000,
            }}
            render={({ field }) => {
              return (
                <Textarea
                  {...field}
                  name={field.name}
                  placeholder="Additional Comments"
                  errors={!!errors?.information}
                  helperText={`${field.value?.length || 0}/2000`}
                />
              );
            }}
          />
        </InputFieldContainer>
        <Button
          sx={{
            width: "100%",
            maxWidth: "580px",
            marginTop: { xs: "30px", md: "20px" },
            backgroundColor: "#D21632 !important",
            color: "#FCFCFC",
            fontWeight: "600",
            fontFamily: "Saira",
            letterSpacing: "0.08em",
            fontSize: {
              xs: "10px !important",
              md: "16px !important",
            },
            "&:hover": {
              border: "1px solid #D21632 !important",
              backgroundColor: "#282828 !important",
            },
            "&:focus, &:active": {
              outline: "unset !important",
            },

            padding: { xs: "14px 0px", md: "16px 0px" },
            borderRadius: "4px !important",
          }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress
              color="inherit"
              size={29}
              sx={{
                color: "#FCFCFC",
              }}
            />
          ) : (
            <p style={{ color: "#FCFCFC" }}>SEND</p>
          )}
        </Button>
      </form>
    </FreeTrialInputFieldWrapper>
  );
};

export default FreeTrailClassComponent;
