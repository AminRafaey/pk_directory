import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { alpha } from "@mui/system";

export const TitleContainer = styled("div")({
  cursor: "pointer",
});

export const Icon = styled("img")(({ theme }) => ({
  width: "144px",
  height: "25px",
  [theme.breakpoints.down("md")]: {
    width: "100px",
    height: "18px",
  },
}));

export const Section = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "40px 60px ",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    padding: "16px 18px",
  },
}));

export const Container = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#111111",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "#111111",
  },
}));

export const HeaderButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#D21632",
  fontFamily: "saira",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  letterSpacing: "0.08em",
  "&:hover": {
    borderColor: "none !important",
    backgroundColor: alpha("#D21632", 0.7),
  },
  "&:focus": {
    borderColor: "none !important",
  },
  "&:active": {
    borderColor: "none !important",
  },
  border: "none !important",
  color: "white",
  padding: "20px 30px",
  borderRadius: "4px",
  [theme.breakpoints.down("md")]: {
    height: "40px",
    color: "white",
    fontSize: "12px",
    whiteSpace: "nowrap",
    fontWeight: "600",
    letterSpacing: "0.08em",
  },
  [theme.breakpoints.down("lg")]: {
    height: "60px",
    color: "white",
    fontSize: "10px",
    whiteSpace: "nowrap",
    fontWeight: "600",
    padding: "20px 20px",
  },
}));
export const HeaderBackButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#111111",
  fontFamily: "saira",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  letterSpacing: "0.08em",
  outline: "none",
  "&:hover": {
    borderColor: "none !important",
    backgroundColor: alpha("#111111", 0.7),
  },
  "&:focus": {
    borderColor: "none !important",
  },
  "&:active": {
    borderColor: "none !important",
  },
  border: "none !important",
  color: "white",
  padding: "20px 30px",
  borderRadius: "4px",
  [theme.breakpoints.down("md")]: {
    height: "40px",
    color: "white",
    fontSize: "12px",
    whiteSpace: "nowrap",
    fontWeight: "600",
    letterSpacing: "0.08em",
  },
  [theme.breakpoints.down("lg")]: {
    height: "60px",
    color: "white",
    fontSize: "10px",
    whiteSpace: "nowrap",
    fontWeight: "600",
    padding: "20px 20px",
  },
}));
