import { styled } from "@mui/system";

export const ClaimWrapper = styled("div")(({ theme }) => ({}));

export const ClaimTitle = styled("p")(({ theme }) => ({
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '-1.1%',
    color: '#FCFCFC',
    [theme.breakpoints.down("sm")]: {
        fontSize: '26px',
    },
}));

export const FormSection = styled("div")(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '108px',
    [theme.breakpoints.down("md")]: {
        marginTop: '70px',
    },
    [theme.breakpoints.down("sm")]: {
        marginTop: '30px'
    },
}));

export const FieldName = styled("div")(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '400',
    color: '#FCFCFC',
    marginBottom: '5px',
}));

export const InputFieldContainer = styled("div")(({ theme }) => ({
    marginTop: '32px',
    maxWidth: '580px',
    [theme.breakpoints.down("md")]: {
        marginTop: '18px'
    },
}));

export const FaqSection = styled("div")(({ theme }) => ({
    marginTop: '84px',
    marginInline: '65px',
    [theme.breakpoints.down("sm")]: {
        marginTop: '40px',
        marginInline: '30px',
    },
}));
export const FooterSection = styled("div")(({ theme }) => ({}));

export const FreeTrialInputFieldWrapper = styled("div")(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const Error = styled("p")({
    fontWeight: "500",
    fontSize: "12px",
    paddingLeft: "1rem",
    marginTop: "0",
    marginBottom: "0",
    color: "#d32f2f",
});

export const Counter = styled('div')({
    display: 'flex',
    flexDirection: 'row-reverse',
    fontFamily: 'Saira',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18.9444px',
    lineHeight: '32px',
    color: '#828282',
});
