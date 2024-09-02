import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "lodash";

const HelperText = styled.span`
  padding-left: 1rem;
  text-transform: none;
  white-space: nowrap;
  text-transform: capitalize;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: gray;
  font-weight: 500;
  margin: 0;
`;

const Error = styled.p`
  font-weight: 500;
  font-size: 12px;
  padding-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #d32f2f;
`;

type AutoCompleteProps = {
  options?;
  label?: string | null | undefined;
  helperText?: string;
  error?: string;
  width?: string;
  value?;
  onChange?: (event, value) => void;
  keyName?: string;
  keyName2?: string;
  keyName3?: string;
  onChangeText?: (txt: string) => void;
  loading?: boolean;
  addCurrentInput?: boolean;
  renderOption?;
  startIcon?;
  placeholder?;
  style?: React.CSSProperties;
  endIcon?;
  setInputData?;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({
  value,
  onChange,
  label,
  helperText,
  error,
  options,
  width,
  keyName = "title",
  keyName2,
  keyName3,
  loading,
  onChangeText,
  addCurrentInput = false,
  renderOption,
  startIcon,
  placeholder,
  style,
  endIcon,
  setInputData,
}) => {
  const [open, setOpen] = useState(false);
  const [isBorderFocus, setIsBorderFocus] = useState(true);
  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useRef(
    debounce((valueToFind) => {
      if (onChangeText) {
        onChangeText(valueToFind);
      }
    }, 1000)
  ).current;

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    debouncedSearch(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <Autocomplete
        value={value}
        onChange={onChange}
        id="asynchronous-demo"
        sx={{
          width: { width },
          "&.MuiInputBase-root.MuiFilledInput-root:after": {
            borderBottom: "4px solid cyan !important",
          },
          ".MuiSvgIcon-root": {
            fill: "#737373 !important",
          },
        }}
        open={searchText && open}
        onOpen={() => {
          setOpen(true);
          if (options?.length === 0) {
            debouncedSearch("");
          }
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, mValue) => {
          return (
            option?.[keyName] === mValue?.[keyName] ||
            option?.[keyName2] === mValue?.[keyName] ||
            option?.[keyName3] === mValue?.[keyName] ||
            option?.[keyName] === mValue?.[keyName2] ||
            option?.[keyName2] === mValue?.[keyName2] ||
            option?.[keyName3] === mValue?.[keyName2] ||
            option?.[keyName] === mValue?.[keyName3] ||
            option?.[keyName2] === mValue?.[keyName3] ||
            option?.[keyName3] === mValue?.[keyName3]
          );
        }}
        getOptionLabel={(option) => {
          return option?.[keyName];
        }}
        options={(searchText && options) || []}
        filterOptions={(x) => [
          ...x?.filter((singleOption) => {
            const lowerCaseSearchValue = searchText?.toLowerCase();
            return (
              singleOption?.[keyName]
                ?.toLowerCase()
                ?.includes(lowerCaseSearchValue) ||
              singleOption?.[keyName2]
                ?.toLowerCase()
                ?.includes(lowerCaseSearchValue) ||
              singleOption?.[keyName3]
                ?.toLowerCase()
                ?.includes(lowerCaseSearchValue)
            );
          }),

          ...(searchText !== "" && addCurrentInput
            ? [
                {
                  inputValue: `Add "${searchText}"`,
                  [keyName]: searchText,
                },
              ]
            : []),
        ]}
        loading={loading}
        onFocus={() => setIsBorderFocus(false)}
        onBlur={() => setIsBorderFocus(true)}
        renderOption={(props, option) => {
          setInputData(option);
          return (
            (renderOption &&
              React.cloneElement(renderOption, { option, ...props })) || (
              <li {...props}>{option?.inputValue || option?.[keyName]}</li>
            )
          );
        }}
        renderInput={(params) => (
          <TextField
            value={searchText}
            placeholder={placeholder}
            onChange={(e) => setSearchText(e?.target?.value)}
            variant="filled"
            {...params}
            label={label || ""}
            InputLabelProps={{
              sx: {
                color: isBorderFocus
                  ? "#e1ffff4d !important"
                  : "#c8c8c8 !important",
              },
            }}
            InputProps={{
              ...params?.InputProps,
              sx: {
                borderRadius: "4px !important",
                backgroundColor: isBorderFocus
                  ? "#111111 !important"
                  : "#ffffff  !important",
                border: isBorderFocus
                  ? `2px solid  ${error ? "red" : "#3d3d3d"}`
                  : "2px solid #fff",
                color: isBorderFocus
                  ? "#c8c8c8 !important"
                  : "black !important",
                "&.MuiInputBase-root.MuiFilledInput-root:after": {
                  borderBottom: "1px solid #fff !important",
                },
                "&.MuiFilledInput-root": {
                  paddingTop: "16px !important",
                  paddingBottom: "16px !important",
                  fontFamily: "saira !important",
                  fontSize: "16px !important",
                  fontWeight: "400",
                },
                ...style,
              },
              endAdornment: (
                <>
                  {endIcon && (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}

                      {params?.InputProps?.endAdornment}
                    </>
                  )}
                </>
              ),
              startAdornment: <>{startIcon ? startIcon : null}</>,
            }}
          />
        )}
      />
      {(error || helperText) &&
        (error ? (
          <Error>{error}</Error>
        ) : (
          <HelperText>{helperText || ""}</HelperText>
        ))}
    </>
  );
};

export default AutoComplete;
