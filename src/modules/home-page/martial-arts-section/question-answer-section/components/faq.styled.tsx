import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";

export const FAQContainer = styled("div")(({ theme }) => ({
  paddingBlock: "80px",
  color: "#FCFCFC",
  [theme.breakpoints.down("md")]: {
    paddingInline: "0px",
    paddingBlock: "20px",
  },
}));

export const FaqTitle = styled("div")(({ theme }) => ({
  fontWeight: "700",
  fontSize: "40px",
  Font: "Saira",
  [theme.breakpoints.down("sm")]: {
    fontWeight: "200",
    fontSize: "25px",
    Font: "Saira",
  },
  [theme.breakpoints.down("md")]: {
    fontWeight: "400",
    fontSize: "30px",
    Font: "Saira",
  },
}));

export const FaqDescription = styled("div")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: "600",
  [theme.breakpoints.down("sm")]: {
    fontWeight: "100",
    fontSize: "20px",
    Font: "Saira",
  },
}));

export const FAQCardContainer = styled("div")({
  marginTop: "16px",
});

export const ExpandIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  marginInline: "30px",
  color: "#FCFCFC",
  [theme.breakpoints.down("md")]: {
    marginInline: "0px",
  },
}));

export const QuestionNumber = styled(Typography)(({ theme }) => ({
  color: "#FCFCFC",
  fontSize:'22px',
  fontWeight:'600',
  paddingInline: "28px",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "0px",
    fontSize:'16px',
  },
}));

export const QuestionDetail = styled(Typography)(({ theme }) => ({
  color: "#FCFCFC",
  paddingInline: "28px",
  fontSize: "17px",
  fontWeight: "400",
  fontStyle: "Inter",
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    fontWeight: "400",
  },
}));
