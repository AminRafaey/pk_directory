import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { alpha } from "@mui/system";

export const ClaimWrapper = styled("div")(({ theme }) => ({
    color: '#FCFCFC',
    paddingInline: '150px',
    marginTop: '85px',
    marginBottom: '150px',
    [theme.breakpoints.down("lg")]: {
        marginTop: "40px",
        paddingInline: '75px',
    },
    [theme.breakpoints.down("sm")]: {
        marginTop: "20px",
        paddingInline: '18px',
    },
}));

export const ClaimTitle = styled("h3")(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: '38px',
    letterSpacing: '0em',
    textAlign: 'left',
    [theme.breakpoints.down("sm")]: {
        fontSize: '26px',
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: '16px',
    },
}));

export const ContentSection = styled("div")(({ theme }) => ({
    marginTop: '100px',
    marginRight: '100px',
    [theme.breakpoints.down("md")]: {
        marginTop: '0px',
        marginRight: '40px',
    },
    [theme.breakpoints.down("md")]: {
        marginRight: '20px',
    },
}));
export const VerifyTitle = styled("p")(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '40px',
    fontWeight: 600,
    lineHeight: '48px',
    letterSpacing: '0em',
    textAlign: 'left',
    [theme.breakpoints.down("md")]: {
        fontSize: '32px',
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: '22px',
    },
}));
export const SchoolSection = styled("div")(({ theme }) => ({
    marginTop: '35px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
        marginTop: '28px',
    },
    [theme.breakpoints.down("sm")]: {
        marginTop: '16px',
    },
}));
export const SchoolLogo = styled("img")(({ theme }) => ({
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    [theme.breakpoints.down("md")]: {
        width: '90px',
        height: '90px',
    },
    [theme.breakpoints.down("sm")]: {
        width: '60px',
        height: '60px',
    },
}));
export const SchoolName = styled("p")(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '30px',
    fontWeight: 600,
    lineHeight: '58px',
    letterSpacing: '0em',
    textAlign: 'left',
    marginLeft: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down("lg")]: {
        width: '290px',
    },
    [theme.breakpoints.down("md")]: {
        fontSize: '34px',
        marginLeft: '12px',
        width: '250px',
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: '22px',
        marginLeft: '6px',
        width: '200px',
    },
}));
export const VerifiedLogo = styled("img")(({ theme }) => ({
    marginLeft: '19px',
    [theme.breakpoints.down("md")]: {
        width: '30px',
        marginLeft: '8px',
    },
}));
export const TermAndCondition = styled("p")(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '27px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#828282',
    marginTop: '12px',
    [theme.breakpoints.down("sm")]: {
        marginTop: '6px',
        fontSize: '14px',
    },
}));

export const ReturnToSchoolButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#111111",
    marginTop: '55px',
    fontFamily: "saira",
    fontSize: "16px",
    fontWeight: "400",
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
    border: "1px solid #4F4F4F !important",
    color: "white",
    padding: "18px 0px",
    borderRadius: "4px",
    width: '407px',
    [theme.breakpoints.down("md")]: {
        width: '100%',
        color: "white",
        fontSize: "12px",
        whiteSpace: "nowrap",
        fontWeight: "600",
        letterSpacing: "0.08em",
        marginTop: '30px',
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

export const FormSection = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        marginTop: '30px'
    },
    [theme.breakpoints.down("md")]: {
        marginTop: '16px'
    },
}));