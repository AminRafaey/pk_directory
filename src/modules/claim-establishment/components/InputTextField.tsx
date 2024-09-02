import React from "react";
import TextField from "@mui/material/TextField";
import { Error } from "./claim-establishment-styled";

type InputTextFieldProps = {
  field?: { value: string | undefined };
  errors?: { message: string | undefined } | any;
  placeholder?: string | null | undefined;
};

const InputTextField: React.FC<InputTextFieldProps> = ({
  field,
  errors,
  placeholder,
}) => {
  return (
    <>
      <TextField
        {...field}
        placeholder={placeholder}
        value={field?.value}
        error={errors}
        InputProps={{
          sx: {
            borderRadius: "4px !important",
            backgroundColor: "#111111 !important",
            width: { xs: "310px", sm: "581px", md: "581px" },
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

export default InputTextField;
