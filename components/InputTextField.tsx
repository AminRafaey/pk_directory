import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

type InputTextFieldProps = {
  field?: { value: string | undefined };
  errors?: { message: string | undefined } | any;
  placeholder?: string | null | undefined;
  multiline?: boolean | null | undefined;
  rows?: number | null | undefined;
  type?: any;
};

type TextFieldProps = {
  errors?: any;
  label?: string;
  value?: string;
  name?: string;
  onChange?: (event: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  helperText?: string;
  type?: string;
};

type TextareaInputProps = {
  isFocus?: boolean;
};
type FormControlProps = {
  isFocus?: boolean;
  isError?: boolean;
};
type LabelAreaProps = {
  isFocus?: boolean;
  isError?: boolean;
};

const Error = styled("p")({
  fontWeight: "500",
  fontSize: "12px",
  paddingLeft: "1rem",
  marginTop: "0",
  marginBottom: "0",
  color: "#d32f2f",
});

const FormControl = styled("div")<FormControlProps>(
  ({ theme, isFocus, isError }) => ({
    padding: "16px",
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: "0.375rem",
    marginTop: "0.5rem",
    marginBottom: "0.1rem",
    border: isError ? "1px solid #d32f2f" : "2px solid #3d3d3d",
    backgroundColor: "#111111",
    transition: "all 0.1s ease-in",
    position: "relative",
  })
);

const TextareaInput = styled("textarea")<TextareaInputProps>(({ isFocus }) => ({
  width: "100%",
  backgroundColor: "#111111",
  color: "#FCFCFC",
  border: "none",
  appearance: "none",
  outline: "none",
  font: "saira",
  fontSize: "16px",
  fontWeight: "400",
  boxSizing: "content-box",
  paddingTop: "16px",
  "::placeholder": {
    color: " #FFFFFF4D",
  },
}));

const AreaInputHelperText = styled("div")({
  display: "flex",
  flexDirection: "row-reverse",
  fontFamily: "Saira",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "18.9444px",
  lineHeight: "32px",
  color: "#828282",
});

const LabelArea = styled("label")<LabelAreaProps>(({ isFocus }) => ({
  lineHeight: "1rem",
  color: "#737373",
  position: "absolute",
  top: 0,
  transition: "all 0.25s ease-in-out",
  fontSize: isFocus ? "0.7rem" : "1rem",
  fontWeight: isFocus ? 300 : 400,
  transform: isFocus ? "translateY(6px)" : "translateY(1.2rem)",
  pointerEvents: "none",
}));

export const InputTextField: React.FC<InputTextFieldProps> = ({
  field,
  errors,
  placeholder,
  multiline,
  rows,
  type,
}) => {
  return (
    <>
      <TextField
        {...field}
        placeholder={placeholder}
        value={field?.value}
        error={errors}
        multiline={multiline}
        rows={rows}
        type={type}
        sx={{
          width: "100%",
        }}
        InputProps={{
          sx: {
            color: "#FCFCFC",
            borderRadius: "4px !important",
            backgroundColor: "#111111 !important",
            border: "1px solid  #3d3d3d",
            "& input": {
              color: "#FCFCFC",
            },
            "&.MuiFilledInput-root": {
              color: "#FFFFFF4D",
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#3d3d3d !important",
              },
          },
        }}
      />
      {errors && (
        <>
          {errors?.message ? (
            <Error>{errors?.message}</Error>
          ) : (
            <Error>Input Field Required</Error>
          )}
        </>
      )}
    </>
  );
};

export const Textarea: React.FC<TextFieldProps> = ({
  errors,
  label,
  placeholder,
  onChange,
  name,
  onBlur,
  ...props
}) => {
  const onInnerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    onChange?.(event.target.value);
  };
  return (
    <>
      <TextareaInput
        name={name}
        onBlur={onBlur}
        onChange={onInnerChange}
        {...props}
        autoComplete="off"
        placeholder={placeholder}
        rows={6}
        defaultValue=""
        sx={{
          paddingLeft: "16px",
          borderRadius: "0.375rem",
          marginTop: "0.5rem",
          marginBottom: "0.1rem",
          border: errors ? "1px solid #d32f2f" : "2px solid #3d3d3d",
          backgroundColor: "#111111",
          transition: "all 0.1s ease-in",
          boxSizing: "border-box",
        }}
      />
      {Boolean(errors) ? (
        <Error>Input Field Required</Error>
      ) : (
        <AreaInputHelperText>{props.helperText || ""}</AreaInputHelperText>
      )}
    </>
  );
};
