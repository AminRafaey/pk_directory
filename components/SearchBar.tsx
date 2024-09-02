import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import AutoComplete from "src/shared/components/AutoComplete/AutoComplete";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/system";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { RouteChangeHandler } from "src/shared/utils/route-change-handler";
import { separateCityStateCountry } from "src/shared/utils/seprate-city-state-count";
import { SearchFieldRouteChange } from "src/shared/utils/search-field-route-change";
import { RemoveSpecialCharacterAndSpace } from "src/shared/utils/remove-special-character";

const SearchBarWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const SearchBarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // for later use
  // [theme.breakpoints.down("lg")]: {
  //   marginTop: "30px",
  // },
  [theme.breakpoints.down("sm")]: {
    marginTop: "20px",
  },
}));

const SchoolIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "24px",
  marginRight: "6px",
  borderRadius: "4px",
}));

const SearchIconContainer = styled("div")(({ theme }) => ({
  marginLeft: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#333333",
  padding: "16px",
  borderRadius: "4px",
  cursor: "pointer",
  minHeight: "60px",
  minWidth: "72px",
  "&:hover": {
    borderColor: "none !important",
    backgroundColor: alpha("#D21632", 0.7),
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "10px",
    padding: "0px 8px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "unset",
    padding: "unset",
  },
}));

const IconSearch = styled(SearchIcon)(({ theme }) => ({
  width: "24",
  height: "24",
  color: "#FCFCFC",
  [theme.breakpoints.down("sm")]: {
    width: "16",
    height: "16",
  },
}));

const SearchBar = ({ schoolData }: any) => {
  const [mergeSchoolMartialArts, setMergeSchoolMartialArts] = useState<any>([]);
  const [schoolAddressData, setSchoolAddressData] = useState([]);
  const [inputData, setInputData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { push, events } = useRouter();

  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    const addressData = data?.address ? data?.address : inputData;
    const schoolMartialArts = data?.martialArts ? data?.martialArts : inputData;
    const country = addressData?.value?.country || "-";
    const state = addressData?.value?.state || "-";
    const city = addressData?.value?.city || "-";
    SearchFieldRouteChange(
      schoolMartialArts,
      addressData,
      push,
      country,
      state,
      city
    );
  };

  useEffect(() => {
    const completeHandler = () => {
      setIsLoading(false);
    };
    RouteChangeHandler(completeHandler, events);
  }, []);

  const separatedLocations =
    schoolData?.map((obj) => {
      const inputString = obj?.lastAddress;
      return separateCityStateCountry(inputString);
    }) || [];
  const objectForAddress = separatedLocations
    ?.filter((data) => data?.country || data?.state || data?.city) // Filter out empty data objects
    .map((data) => {
      return {
        label: RemoveSpecialCharacterAndSpace(data),
        value: data,
        type: "Address",
      };
    });
  const uniqueObjectForAddress = objectForAddress?.filter(
    (value, index, self) =>
      self?.findIndex((item) => item?.label === value?.label) === index
  );
  useEffect(() => {
    if (uniqueObjectForAddress) {
      setSchoolAddressData(uniqueObjectForAddress);
    }
  }, []);

  const objectForSchoolName = schoolData?.map((data) => {
    return {
      label: data?.schoolName,
      value: data?.slug,
      type: "SchoolName",
    };
  });

  const objectForMartialArt = schoolData?.reduce((uniqueData, data) => {
    const isDuplicate = uniqueData.some(
      (item) => item.value === data?.slugTypeMartialArt
    );
    if (!isDuplicate) {
      uniqueData.push({
        label: data.martialArts,
        value: data?.slugTypeMartialArt,
        type: "MartialArts",
      });
    }

    return uniqueData;
  }, []);

  useEffect(() => {
    if (Array.isArray(objectForSchoolName)) {
      const mergeDataSchoolMartialArt = [
        ...objectForMartialArt,
        ...objectForSchoolName,
      ];
      setMergeSchoolMartialArts(mergeDataSchoolMartialArt);
    }
  }, [objectForSchoolName?.length]);

  return (
    <SearchBarContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchBarWrapper>
          <Controller
            name="martialArts"
            control={control}
            render={({ field }) => {
              return (
                <AutoComplete
                  style={{
                    borderTopRightRadius: "0px !important",
                    borderBottomRightRadius: "0px !important",
                    borderRight: "none !important",
                    [theme.breakpoints.up("sm")]: {
                      width: "360px",
                    },
                    [theme.breakpoints.down("lg")]: {
                      width: "260px",
                    },
                    [theme.breakpoints.down("md")]: {
                      marginTop: "10px",
                    },
                    [theme.breakpoints.down("sm")]: {
                      borderTopRightRadius: "4px !important",
                      borderBottomRightRadius: "4px !important",
                      borderRight: "2px solid #3d3d3d !important",
                    },
                  }}
                  startIcon={<SchoolIcon src="/icons/school-icon.svg" />}
                  keyName="label"
                  setInputData={setInputData}
                  value={field?.value}
                  options={mergeSchoolMartialArts}
                  placeholder="search for school name or martial art"
                  onChange={(_, value) => {
                    field?.onChange(value);
                  }}
                  error={errors.martialArts && "Please Select Option"}
                />
              );
            }}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <AutoComplete
                style={{
                  borderTopLeftRadius: "0px !important",
                  borderBottomLeftRadius: "0px !important",
                  [theme.breakpoints.up("sm")]: {
                    width: "360px",
                  },
                  [theme.breakpoints.down("lg")]: {
                    width: "260px",
                  },
                  [theme.breakpoints.down("md")]: {
                    marginTop: "10px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    borderTopLeftRadius: "4px !important",
                    borderBottomLeftRadius: "4px !important",
                  },
                }}
                keyName="label"
                setInputData={setInputData}
                value={field?.value}
                options={schoolAddressData}
                placeholder="Atlanta, GA, US"
                onChange={(_, value) => {
                  field?.onChange(value);
                }}
                error={errors?.country && "Please Select Option"}
              />
            )}
          />
          <SearchIconContainer>
            {isLoading ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              <IconButton
                type="submit"
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                <IconSearch />
              </IconButton>
            )}
          </SearchIconContainer>
        </SearchBarWrapper>
      </form>
    </SearchBarContainer>
  );
};

export default SearchBar;
