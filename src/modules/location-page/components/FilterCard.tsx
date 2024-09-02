import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import {
  Amenities,
  AmenitiesDescription,
  AmenitiesLogo,
  AmenitiesLogoContainer,
  AmenitiesName,
  AmenitiesWrapper,
  BottomLine,
  ButtonWrapper,
  CheckBoxContainer,
  CheckBoxSelected,
  CheckBoxTic,
  ClassTitle,
  ClassWrapper,
  CleanAll,
  FilterCardWrapper,
  FooterButton,
  LocationTitle,
  LocationWrapper,
} from "./location.styled";

const FilterCard = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    reValidateMode: "onChange",
  });
  const [isChecked, setIsChecked] = useState<any>();
  const [cardColorIndex, setCardColorIndex] = useState<any>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const handleAmenitiesCard = (index): any => {
    setCardColorIndex(index);
  };

  const amenitiesData = [
    {
      id: 1,
      icon: "wifi-icon",
      name: "WIFI",
    },
    {
      id: 2,
      icon: "parking-icon",
      name: "PARKING",
    },
    {
      id: 3,
      icon: "shopping-bag-icon",
      name: "STORE",
    },
  ];

  return (
    <>
      <FilterCardWrapper>
        <Amenities>Amenities</Amenities>
        <AmenitiesDescription>
          Lorem ipsum dolor sit amet consectetur
        </AmenitiesDescription>
        <AmenitiesWrapper>
          {amenitiesData?.map((data, index) => {
            return (
              <AmenitiesLogoContainer
                onClick={() => handleAmenitiesCard(index)}
                style={{
                  backgroundColor:
                    cardColorIndex === index ? "transparent" : "#5E5E5E",
                  border:
                    cardColorIndex === index
                      ? "1px solid #FCFCFC"
                      : "1px solid #282828",
                }}
              >
                <AmenitiesLogo src={`/icons/${data?.icon}.svg`} />
                <AmenitiesName>{data?.name}</AmenitiesName>
              </AmenitiesLogoContainer>
            );
          })}
        </AmenitiesWrapper>
        <LocationWrapper>
          <LocationTitle>Location</LocationTitle>
          <Controller
            name="checkboxes"
            control={control}
            rules={{
              required: true,
            }}
            render={(checks) => (
              <>
                <Grid
                  container
                  sx={{
                    paddingTop: "20px",
                    width: { lg: "75%", md: "100%" },
                  }}
                >
                  {[...new Array(5)].map((el) => {
                    return (
                      <Grid lg={6}>
                        <CheckBoxContainer
                          style={{
                            border:
                              errors?.checkboxes?.message &&
                              "2.5px solid #d32f2f",
                          }}
                        >
                          <FormControlLabel
                            label="PINHEIROS"
                            value="Ali"
                            sx={{
                              display: "flex",
                              marginRight: "20px !important",
                              margin: "0px !important",
                              ".MuiTypography-root": {
                                color: true
                                  ? "#FCFCFC !important"
                                  : "#bdbdbd !important",
                              },
                            }}
                            control={
                              <Controller
                                name="checkbox"
                                control={control}
                                render={({ field }) => (
                                  <Checkbox
                                    {...field}
                                    checkedIcon={
                                      <CheckBoxSelected>
                                        <CheckBoxTic src="/icons/tic-icon.svg" />
                                      </CheckBoxSelected>
                                    }
                                    checked={isChecked}
                                    onChange={handleChange}
                                    sx={{
                                      color: "#FCFCFC !important",
                                      width: "1rem",
                                      height: "1rem",
                                      marginRight: "8px",
                                    }}
                                  />
                                )}
                              />
                            }
                          />
                        </CheckBoxContainer>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          />
        </LocationWrapper>
        <ClassWrapper>
          <ClassTitle>Classes</ClassTitle>
          <Controller
            name="checkboxes"
            control={control}
            rules={{
              required: true,
            }}
            render={(checks) => (
              <>
                <Grid
                  container
                  sx={{
                    paddingTop: "20px",
                    width: { lg: "75%", md: "100%" },
                  }}
                >
                  {[...new Array(5)].map((el) => {
                    return (
                      <Grid lg={6}>
                        <CheckBoxContainer
                          style={{
                            border:
                              errors?.checkboxes?.message &&
                              "2.5px solid #d32f2f",
                          }}
                        >
                          <FormControlLabel
                            label="ADULT"
                            value="Ali"
                            sx={{
                              display: "flex",
                              marginRight: "20px !important",
                              margin: "0px !important",
                              ".MuiTypography-root": {
                                color: true
                                  ? "#FCFCFC !important"
                                  : "#bdbdbd !important",
                              },
                            }}
                            control={
                              <Controller
                                name="checkbox"
                                control={control}
                                render={({ field }) => (
                                  <Checkbox
                                    {...field}
                                    checkedIcon={
                                      <CheckBoxSelected>
                                        <CheckBoxTic src="/icons/tic-icon.svg" />
                                      </CheckBoxSelected>
                                    }
                                    checked={isChecked}
                                    onChange={() => trigger(["checkboxes"])}
                                    sx={{
                                      color: "#FCFCFC !important",

                                      width: "1rem",
                                      height: "1rem",
                                      marginRight: "8px",
                                    }}
                                  />
                                )}
                              />
                            }
                          />
                        </CheckBoxContainer>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          />
        </ClassWrapper>
      </FilterCardWrapper>
      <BottomLine />
      <ButtonWrapper>
        <CleanAll>Clean All</CleanAll>

        <FooterButton>FILTERS</FooterButton>
      </ButtonWrapper>
    </>
  );
};

export default FilterCard;
