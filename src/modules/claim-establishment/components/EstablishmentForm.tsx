import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
// @ts-ignore
import "react-phone-number-input/style.css";
import { CountryCode } from "libphonenumber-js/core";
import { Button } from "@mui/material";
import { alpha } from "@mui/system";
import {
  ClaimInputFieldWrapper,
  FieldName,
  InputFieldContainer,
} from "./claim-establishment-styled";
import { InputTextField } from "components/InputTextField";

const EstablishmentForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [validateNumber, setValidateNumber] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const validateEmail = (value) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(value) || "Invalid email address";
  };
  const onSubmit = (data) => {
    console.log("data frm claom", data);
  };

  return (
    <ClaimInputFieldWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="claim-establishment">
        <InputFieldContainer>
          <FieldName>Name</FieldName>
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
                  placeholder="Enter Your Name"
                />
              );
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <FieldName>Email</FieldName>
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
                  placeholder="Add Your Email"
                />
              );
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <FieldName>Phone number</FieldName>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "true",
            }}
            render={({ field }) => {
              return (
                <PhoneInput
                  value={field?.value}
                  onChange={(number) => {
                    setValidateNumber(
                      isValidPhoneNumber(
                        field?.value || ""
                        // for later use
                        // selectedCountry as CountryCode
                      )
                    );
                  }}
                  defaultCountry={selectedCountry as CountryCode}
                  errors={errors.phone}
                  helperText="Enter Country Input"
                  placeholder="Enter Phone Number"
                  initialValueFormat="national"
                  onCountryChange={(country) => {
                    // for latter use
                    // onCountryChange(en?.[country]);
                    setSelectedCountry(country);
                  }}
                  countrySelectProps={{
                    style: {
                      backgroundColor: "gray",
                    },
                  }}
                />
              );
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <FieldName>Additional information</FieldName>
          <Controller
            name="information"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <InputTextField
                  field={field}
                  errors={errors.information}
                  placeholder="Please Enter Your Comments"
                />
              );
            }}
          />
        </InputFieldContainer>

        <Button
          sx={{
            width: "100%",
            marginTop: { xs: "30px", md: "60px" },
            backgroundColor: "#D21632",
            color: "#FCFCFC",
            fontWeight: "400",
            fontFamily: "Saira",
            height: "100%",
            fontSize: {
              xs: "10px !important",
              md: "16px !important",
            },
            "&:hover": {
              borderColor: "none !important",
              backgroundColor: alpha("#D21632", 0.7),
            },
            padding: { xs: "14px 0px", md: "20px 0px" },
            borderRadius: "4px !important",
          }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </ClaimInputFieldWrapper>
  );
};

export default EstablishmentForm;
