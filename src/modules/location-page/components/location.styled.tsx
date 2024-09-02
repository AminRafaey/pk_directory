import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const LocationPageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));
export const LocationPageSection = styled("div")(({ theme }) => ({
  backgroundColor: "#282828",
  paddingInline: "40px",
  paddingTop: "30px",
  width: "50%",
  height: "100vh",
  overflow: "scroll",
  "::-webkit-scrollbar": {
    display: "none",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    paddingInline: "20px",
  },
  [theme.breakpoints.down("md")]: {
    paddingInline: "20px",
    paddingTop: "15px",
  },
}));
export const LocationTitle = styled("div")(({ theme }) => ({
  fontFamily: "Saira",
  fontSize: "28px",
  fontWeight: 500,
  lineHeight: "34px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#FCFCFC",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
}));
export const FilterButton = styled("div")(({ theme }) => ({}));
export const FilterButtonWrapper = styled("div")(({ theme }) => ({
  border: "1px solid #828282",
  borderRadius: "4px",
  display: "flex",
  padding: "12px",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
  marginRight: "8px",
  cursor: "pointer",
  backgroundColor: "#333333",
  ":hover": {
    border: "1px solid #E0E0E0",
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    padding: "8px",
    height: "30px",
    marginBottom: "10px",
    marginRight: "4px",
    width: "100%",
  },
  width: "20%",
}));
export const FilterIcon = styled("div")(({ theme }) => ({}));
export const FilterText = styled("div")(({ theme }) => ({
  fontFamily: "Saira",
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "16px",
  letterSpacing: "0.08em",
  textAlign: "center",
  color: "#FCFCFC",
}));

export const CardSection = styled("div")(({ theme }) => ({
  marginTop: "30px",
  "::-webkit-scrollbar": {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "16px",
  },
}));

export const MapSection = styled("div")(({ theme }) => ({
  width: "calc(100% - 640px)",
  height: "100vh",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));
export const FooterWrapper = styled("div")(({ theme }) => ({}));
export const Icon = styled("img")(({ theme }) => ({}));

// Filter Card Style
export const FilterCardWrapper = styled("div")(({ theme }) => ({
  paddingInline: "50px",
  marginTop: "30px",
  color: "#FCFCFC",
  [theme.breakpoints.down("md")]: {
    paddingInline: "20px",
    marginTop: "10px",
  },
}));
export const Amenities = styled("div")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: "600",
}));
export const AmenitiesDescription = styled("div")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "400",
}));

export const AmenitiesLogoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #282828",
  padding: "25px 35px",
  marginRight: "20px",
  borderRadius: "6px",
  backgroundColor: "#5E5E5E",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    width: "90px",
    height: "50px",
    marginTop: "12px",
    marginBottom: "15px",
    marginRight: "10px",
  },
}));
export const AmenitiesLogo = styled("img")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    width: "20px",
    height: "20px",
  },
}));

export const AmenitiesName = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "600",
  paddingLeft: "16px",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "8px",
    fontSize: "12px",
    fontWeight: "600",
  },
}));

export const AmenitiesWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "39px",
  marginBottom: "32px",
  [theme.breakpoints.down("md")]: {
    marginBlock: "10px",
  },
}));
export const LocationWrapper = styled("div")({});
export const ClassWrapper = styled("div")({
  marginTop: "32px",
});
export const LocationTitleFilterCard = styled("div")({
  fontSize: "28px",
  fontWeight: "600",
  color: "#FCFCFC",
});
export const ClassTitle = styled("div")({
  fontSize: "28px",
  fontWeight: "600",
});

export const CheckBoxContainer = styled("div")({
  marginTop: "8px",
  padding: "8px",
  borderRadius: "4px",
});

export const CheckBoxSelected = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  minWidth: "16px",
  height: "16px",
  minHeight: "16px",
  padding: "2px",
  background: "#7062ff",
  borderRadius: "2px",
});

export const CheckBoxTic = styled("img")({
  height: "16px",
  width: "16px",
});
export const BottomLine = styled("div")({
  width: "100%",
  height: "2px",
  backgroundColor: "#D9D9D9",
  marginTop: "10px",
});
export const ButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "25px 50px 45px 50px",
  alignItems: "center",
});
export const CleanAll = styled("div")({
  fontSize: "18px",
  fontWeight: "400",
  color: "#FCFCFC",
  borderBottom: "1px solid #FCFCFC",
  cursor: "pointer",
});

export const FooterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#D21632",
  fontSize: "12px",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#AA9B9D",
  },
  color: "white",
  padding: "20px 24px",
  borderRadius: "4px",
  [theme.breakpoints.down("md")]: {
    height: "40px",
    color: "white",
    fontSize: "8px",
    whiteSpace: "nowrap",
    fontWeight: "600",
  },
  [theme.breakpoints.down("lg")]: {
    height: "30px",
    color: "white",
    fontSize: "10px",
    whiteSpace: "nowrap",
    fontWeight: "600",
  },
}));
