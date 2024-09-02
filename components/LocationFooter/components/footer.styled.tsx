import { styled } from "@mui/system";
import AppleIcon from "@mui/icons-material/Apple";

export const FooterSection = styled("div")(({ theme }) => ({
  background: "#111111",
  padding: "0px 120px 60px 120px",
  [theme.breakpoints.down("lg")]: {
    padding: "50px 25px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "30px 20px",
  },
}));

export const AboutUsTitle = styled("div")(({ theme }) => ({
  color: "#FCFCFC",
  fontFamily: "Saira",
  fontSize: "11px",
  fontWeight: 700,
  lineHeight: "15px",
  letterSpacing: "1px",
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    lineHeight: "14px",
    marginTop: "40px",
  },
}));

export const ListSchool = styled("div")(({ theme }) => ({
  color: "#A0A6AB",
  fontFamily: "Saira",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "17px",
  letterSpacing: "0em",
  textAlign: "left",
  marginTop: "36px",
  [theme.breakpoints.down("md")]: {
    fontSize: "13px",
    lineHeight: "16px",
    marginTop: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    lineHeight: "15px",
    marginTop: "16px",
  },
}));

export const Company = styled("div")({
  color: "#A0A6AB",
  fontFamily: "Saira",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "17px",
  letterSpacing: "0em",
  textAlign: "left",
  marginTop: "16px",
});

export const DownloadContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginTop: "40px",
  },
}));

export const DownloadWrapper = styled("div")({
  display: "flex",
  border: "1px solid #FCFCFC",
});

export const DownloadTitle = styled("div")({});

export const AppStoreText = styled("span")({
  marginTop: "8px",
});

export const StyledAppleIcon = styled(AppleIcon)({
  fontSize: "48px",
});

export const SocialBadge = styled("img")({
  cursor: "pointer",
});

export const AppTitle = styled("div")(({ theme }) => ({
  fontFamily: "Saira",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "15px",
  letterSpacing: "1px",
  textAlign: "left",
  marginBottom: "32px",
  color: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    fontSize: "11px",
    lineHeight: "14px",
    marginBottom: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    lineHeight: "13px",
    marginBottom: "16px",
  },
}));

export const FollowUsTitle = styled("div")(({ theme }) => ({
  fontFamily: "Saira",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "15px",
  letterSpacing: "1px",
  textAlign: "left",
  marginBottom: "32px",
  color: "#FFFFFF",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    lineHeight: "13px",
    marginBottom: "16px",
    marginTop: "20px",
  },
}));

export const SocialIconWrapper = styled("div")({
  display: "flex",
});

export const SocialIcon = styled("img")({
  cursor: "pointer",
});

export const MailWrapper = styled("div")(({ theme }) => ({
  width: "400px",
  [theme.breakpoints.down("md")]: {
    width: "300px",
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
}));

export const MailText = styled("div")(({ theme }) => ({
  fontFamily: "Saira",
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: "29px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#FCFCFC",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
    lineHeight: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
    lineHeight: "22px",
  },
}));

export const InputFieldWrapper = styled("div")({
  display: "flex",
  marginTop: "20px",
});

export const BottomLine = styled("div")(({ theme }) => ({
  marginTop: "108px",
  height: "1px",
  background: "#404040",
}));

export const Section = styled("div")(({ theme }) => ({
  marginTop: "50px",
  color: "#FCFCFC",
  [theme.breakpoints.down("md")]: {
    marginTop: "50px",
    paddingInline: "16px",
  },
}));

export const Address = styled("div")({
  fontSize: "16px",
  fontWeight: "400",
  display: "flex",
});

export const DojoIcon = styled("img")({
  cursor: "pointer",
});

export const Error = styled("p")({
  fontWeight: 500,
  fontSize: "12px",
  paddingLeft: "1rem",
  marginTop: 0,
  marginBottom: 0,
  color: "#d32f2f",
});
