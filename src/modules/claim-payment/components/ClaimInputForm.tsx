import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputTextField } from "components/InputTextField";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  alpha,
} from "@mui/material";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  ButtonInputFieldContainer,
  ButtonInputFieldWrapper,
  CheckBoxInputFieldArea,
  HelperText,
  RadioButtonLabel,
} from "./claim-payment-styled";

import CustomizePhoneNumberInput from "components/CustomizePhoneNumberInput";
import phone from "phone";
import { Error } from "src/modules/claim-establishment/components/claim-establishment-styled";

const ClaimInputForm = ({
  onEmailPhoneInput,
  isEmailPhoneInputLoading,
  setPhoneNumberValue,
  phoneNumberValue,
  phoneInputErrorMessage,
}) => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isReceiveMessageChecked, setIsReceiveMessageChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>({
    code: "BR",
    label: "Brazil",
    phone: "55",
  });
  const isValidPhoneNumber = phone(
    `+${selectedCountry?.phone}${phoneNumberValue?.phone}`
  );
  // for latter use
  // const [selectedCountry, setSelectedCountry] = useState();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();
  const validateEmail = (value) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(value) || "Invalid email address";
  };
  const handleEmailCheckBox = () => {
    setIsEmailChecked(!isEmailChecked);
  };
  const handleReceiveCheckBox = () => {
    setIsReceiveMessageChecked(!isReceiveMessageChecked);
  };

  return (
    <>
      <CheckBoxInputFieldArea>
        <form onSubmit={handleSubmit(onEmailPhoneInput)}>
          <FormControl>
            <FormControlLabel
              value="emailRadio"
              control={
                <Checkbox
                  checked={isEmailChecked}
                  onChange={handleEmailCheckBox}
                  icon={
                    <RadioButtonUncheckedOutlinedIcon
                      sx={{
                        color: "#FCFCFC",
                      }}
                    />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      sx={{
                        color: "#FCFCFC",
                      }}
                    />
                  }
                />
              }
              label={
                <RadioButtonLabel>Receive a code by email</RadioButtonLabel>
              }
            />
          </FormControl>
          {isEmailChecked && (
            <ButtonInputFieldContainer>
              <ButtonInputFieldWrapper>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    validate: validateEmail,
                  }}
                  render={({ field }) => {
                    return (
                      <Box
                        sx={{
                          width: { sm: "370px" },
                        }}
                      >
                        <InputTextField
                          field={field}
                          errors={errors.email}
                          placeholder="Email"
                        />
                      </Box>
                    );
                  }}
                />
                <Button
                  sx={{
                    width: "100%",
                    maxWidth: "60px",
                    height: "60px",
                    backgroundColor: "#D21632",
                    color: "#FCFCFC",
                    fontWeight: "600",
                    fontFamily: "Saira",
                    letterSpacing: "0.08em",
                    marginLeft: "8px",
                    fontSize: {
                      xs: "10px !important",
                      md: "14px !important",
                    },
                    "&:hover": {
                      borderColor: "none !important",
                      backgroundColor: alpha("#D21632", 0.7),
                    },
                    "&:focus, &:active": {
                      outline: "unset !important",
                    },
                    borderRadius: "4px !important",
                  }}
                  type="submit"
                >
                  {isEmailPhoneInputLoading ? (
                    <CircularProgress color="inherit" size={15} />
                  ) : (
                    <p>SEND</p>
                  )}
                </Button>
              </ButtonInputFieldWrapper>
              <HelperText> Add owner’s email</HelperText>
            </ButtonInputFieldContainer>
          )}
        </form>
      </CheckBoxInputFieldArea>
      <CheckBoxInputFieldArea className="claim-establishment">
        <form onSubmit={handleSubmit(onEmailPhoneInput)}>
          <FormControl>
            <FormControlLabel
              value="female"
              control={
                <Checkbox
                  checked={isReceiveMessageChecked}
                  onChange={handleReceiveCheckBox}
                  icon={
                    <RadioButtonUncheckedOutlinedIcon
                      sx={{
                        color: "#FCFCFC",
                      }}
                    />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon
                      sx={{
                        color: "#FCFCFC",
                      }}
                    />
                  }
                />
              }
              label={
                <RadioButtonLabel>Receive a text message</RadioButtonLabel>
              }
            />
          </FormControl>
          {isReceiveMessageChecked && (
            <ButtonInputFieldContainer>
              <ButtonInputFieldWrapper>
                <Controller
                  name="number"
                  control={control}
                  rules={{
                    validate: () => isValidPhoneNumber?.isValid,
                  }}
                  render={({ field }) => {
                    return (
                      <Box
                        sx={{
                          width: { sm: "370px" },
                        }}
                      >
                        <CustomizePhoneNumberInput
                          {...field}
                          personNumber={phoneNumberValue}
                          selectedCountry={selectedCountry}
                          setSelectedCountry={setSelectedCountry}
                          setPersonNumber={setPhoneNumberValue}
                          inputFieldWidth="unset"
                        />
                        {!isValidPhoneNumber?.isValid && errors?.number && (
                          <Error>Provide Valid Input</Error>
                        )}
                      </Box>
                    );
                  }}
                />
                <Button
                  sx={{
                    width: "100%",
                    maxWidth: "60px",
                    height: "60px",
                    backgroundColor: "#D21632",
                    color: "#FCFCFC",
                    fontWeight: "600",
                    fontFamily: "Saira",
                    letterSpacing: "0.08em",
                    marginLeft: "8px",
                    fontSize: {
                      xs: "10px !important",
                      md: "14px !important",
                    },
                    "&:hover": {
                      borderColor: "none !important",
                      backgroundColor: alpha("#D21632", 0.7),
                    },
                    "&:focus, &:active": {
                      outline: "unset !important",
                    },
                    borderRadius: "4px !important",
                  }}
                  type="submit"
                >
                  {isEmailPhoneInputLoading ? (
                    <CircularProgress color="inherit" size={16} />
                  ) : (
                    <p>SEND</p>
                  )}
                </Button>
              </ButtonInputFieldWrapper>
              <HelperText> Add owner’s phone number</HelperText>
            </ButtonInputFieldContainer>
          )}
        </form>
      </CheckBoxInputFieldArea>
    </>
  );
};

export default ClaimInputForm;
