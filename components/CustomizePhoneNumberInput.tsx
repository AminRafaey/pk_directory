import React from "react";
import ReactCountryFlag from "react-country-flag";
import phone from "phone";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { styled, TextField as MUITextField, Box, Popper } from "@mui/material";
import { countries } from "src/shared/utils/country-data";

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
  },
  "& .MuiInputBase-root": {
    color: "#FCFCFC",
    borderRadius: "4px !important",
    borderTopRightRadius: "0px !important",
    borderBottomRightRadius: "0px !important",
    backgroundColor: "#111111 !important",
    border: "1px solid #3d3d3d",
    borderRight: "none !important",
    height: "60px !important",
  },
}));

function CustomizePhoneNumberInput({
  personNumber,
  selectedCountry,
  setPersonNumber,
  setSelectedCountry,
  inputFieldWidth,
}: {
  personNumber: any;
  selectedCountry: any;
  setPersonNumber: any;
  setSelectedCountry: any;
  inputFieldWidth?: string;
}) {
  return (
    <Box display="flex">
      <StyledAutoComplete
        autoHighlight
        openOnFocus
        forcePopupIcon={false}
        clearIcon={false}
        size="small"
        multiple
        options={countries}
        value={countries.filter(
          (c) => selectedCountry && c.label == selectedCountry.label
        )}
        onChange={(e, allValues, type, value) =>
          setSelectedCountry(value?.option)
        }
        filterOptions={(options, { inputValue }) => {
          if (inputValue != "") {
            options = options.filter((option: any) =>
              `${option?.label}${option?.phone}`
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            );
            return options;
          } else return options;
        }}
        getOptionLabel={(option: any) =>
          `${option.label} (${"+" + option.phone})`
        }
        PopperComponent={({ style, ...props }) => {
          return (
            <Popper
              {...props}
              sx={{
                ...style,
                left: { xs: "10px !important", md: "96px !important" },
                width: { xs: "unset", md: 280 },
              }}
              placement="bottom"
            />
          );
        }}
        renderOption={(props, option: any) => {
          return (
            <Box component="li" {...props}>
              <ReactCountryFlag
                countryCode={option.code}
                svg
                style={{ marginRight: 16 }}
              />
              {option?.label} ({option?.code}) +{option?.phone}
            </Box>
          );
        }}
        renderTags={() => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "18px",
              marginLeft: { xs: "10px", md: "16px" },
              cursor: "pointer",
            }}
          >
            <ReactCountryFlag
              style={{ height: 16, width: 24 }}
              countryCode={selectedCountry.code}
              svg
            />
            <span style={{ paddingLeft: "10px" }}>
              +{selectedCountry.phone}
            </span>
          </Box>
        )}
        renderInput={(params) => (
          <MUITextField
            {...params}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              style: { ...(selectedCountry && { padding: 0 }), opacity: 0 },
            }}
            value=""
          />
        )}
      />
      <TextField
        type="tel"
        sx={{ width: inputFieldWidth || "100%" }}
        placeholder="Phone"
        disabled={selectedCountry ? false : true}
        error={
          personNumber?.phone && selectedCountry
            ? phone(`+${selectedCountry.phone}${personNumber?.phone}`)
                ?.isValid === false
              ? true
              : false
            : false
        }
        onChange={(e) =>
          setPersonNumber({ ...personNumber, phone: e.target.value })
        }
        InputProps={{
          sx: {
            color: "#FCFCFC",
            borderTopRightRadius: "4px !important",
            borderBottomRightRadius: "4px !important",
            borderTopLeftRadius: "0px !important",
            borderBottomLeftRadius: "0px !important",
            backgroundColor: "#111111 !important",
            border: "1px solid  #3d3d3d",
            borderLeft: "none !important",
            height: "60px !important",
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
    </Box>
  );
}

export default CustomizePhoneNumberInput;
