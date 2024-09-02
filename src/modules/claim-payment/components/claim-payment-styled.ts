import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { alpha } from "@mui/system";

export const ClaimWrapper = styled("div")(({ theme }) => ({
    color: '#FCFCFC',
    paddingInline: '150px',
    marginTop: '85px',

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
    [theme.breakpoints.down("md")]: {
        marginTop: '0px',
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
    width: '120px',
    height: '120px',
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
    fontSize: '48px',
    fontWeight: 600,
    lineHeight: '58px',
    letterSpacing: '0em',
    textAlign: 'left',
    marginLeft: '18px',
    [theme.breakpoints.down("md")]: {
        fontSize: '34px',
        marginLeft: '12px',
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: '22px',
        marginLeft: '6px',
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
export const CheckBoxInputFieldArea = styled("div")(({ theme }) => ({
    border: '2px solid #333333',
    marginTop: '65px',
    paddingInline: '35px',
    paddingBlock: '32px',
    [theme.breakpoints.down("md")]: {
        marginTop: '45px',
    },
    [theme.breakpoints.down("sm")]: {
        marginTop: '25px',
        paddingInline: '10px',
        paddingBlock: '15px',
    },
}));

export const ButtonInputFieldWrapper = styled("div")(({ theme }) => ({
    display: 'flex',
    marginTop: '23px',

}));
export const ButtonInputFieldContainer = styled("div")(({ theme }) => ({
    marginLeft: '45px',
    marginTop: '23px',
    [theme.breakpoints.down("sm")]: {
        marginLeft: '25px',
    },
}));

export const RadioButtonLabel = styled("p")(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '0em',
    textAlign: 'left',
    marginLeft: '16px',
    [theme.breakpoints.down("sm")]: {
        fontSize: '12px',
        marginLeft: 'unset',
    },
}));

export const HelperText = styled("p")(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0px',
    textAlign: 'left',
    color: '#828282',
    marginLeft: '15px',
    marginTop: '5px',
}));

export const FormSection = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        marginTop: '30px'
    },
    [theme.breakpoints.down("md")]: {
        marginTop: '16px'
    },
}));
export const OtpInputFieldContainer = styled("div")(({ theme }) => ({
    marginRight: '24px',
    width: '65px',
}));

export const OtpButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#D21632",
    marginTop: '55px',
    fontFamily: "saira",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "24px",
    letterSpacing: "0.08em",
    outline: "none !important",
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
    borderRadius: "4px",
    width: '326px',
    height: '60px',
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
export const SecurePayButton = styled('button')(({ theme }) => ({
    backgroundColor: "#D21632",
    marginTop: '55px',
    fontFamily: "saira",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "24px",
    letterSpacing: "0.08em",
    width: '412px',
    height: '60px',
    outline: 'none !important',
    '&:hover': {
        borderColor: 'none !important',
        backgroundColor: alpha("#D21632", 0.7),
    },
    '&:focus': {
        borderColor: 'none !important',
    },
    '&:active': {
        borderColor: 'none !important',
    },
    '&:focus-visible': {
        borderColor: 'none !important',
    },
    border: "none !important",
    color: "white",
    padding: "18px 120px",
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

export const LoadingWrapperClaim = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

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
    padding: "18px 129px",
    borderRadius: "4px",
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

export const SocialBadge = styled("img")({
    cursor: "pointer",
});
export const DownloadTitle = styled("h5")({
    fontFamily: 'Saira',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '29px',
    letterSpacing: '0em',
    textAlign: 'left',
    marginTop: '60px',
});
