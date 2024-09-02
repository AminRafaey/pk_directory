import { styled } from "@mui/system";

export const SchoolCardDetailContainer = styled("div")(({ theme }) => ({
  width: "260px",
  minWidth: "260px",
  marginRight: "17px",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    width: "110px",
    minWidth: "110px",
    margin: "15px 5px 0px 5px",
  },
}));

export const DetailSection = styled("div")(({ theme }) => ({
  backgroundColor: "#282828",
  paddingTop: "4px",
  paddingBottom: "5px",
  alignItems: "center",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  [theme.breakpoints.down("md")]: {
    paddingInline: "7px",
    paddingBlock: "5px",
  },
}));

export const LogoSection = styled("div")({
  "@media screen and (max-width: 450px)": {
    height: "72px",
  },
  background: "linear-gradient(101.65deg, #535151 -3.18%, #3C3C3C 73.93%)",
  borderTopRightRadius: "4px",
  borderTopLeftRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Logo = styled("img")(({ theme }) => ({
  marginBlock: "19px",
  width: "85px",
  height: "85px",
  borderRadius: "50%",
  background: "linear-gradient(101.65deg, #535151 -3.18%, #3C3C3C 73.93%)",
  [theme.breakpoints.down("md")]: {
    width: "44px",
    height: "44px",
    marginBlock: "14px",
  },
}));

export const SchoolInfo = styled("div")({});

export const MartialArtTitle = styled("div")({
  fontFamily: "Saira",
  fontSize: "10px",
  fontWeight: 400,
  letterSpacing: "0em",
  color: "#BDBDBD",
});

export const SchoolName = styled("div")({
  fontFamily: "Saira",
  fontSize: "18px",
  fontWeight: 600,
  color: "#FCFCFC",
  "@media screen and (max-width: 960px)": {
    fontSize: "7px",
    width: "50px",
  },
});

export const SchoolNameDetail = styled("div")({
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "0em",
  color: "#828282",
  "@media screen and (max-width: 960px)": {
    fontSize: "5px",
    width: "44px",
  },
});

export const SchoolRatingWrapper = styled("div")({
  display: "flex",
});

export const SchoolRating = styled("img")(({ theme }) => ({
  marginRight: "8px",

  [theme.breakpoints.down("md")]: {
    marginRight: "4px",
    width: "8px",
    height: "10",
  },
}));

export const ReviewTitle = styled("div")(({ theme }) => ({
  fontSize: "10px",
  fontWeight: 400,
  color: "#D8D8D8",
  [theme.breakpoints.down("md")]: {
    fontSize: "6px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "5px",
  },
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
