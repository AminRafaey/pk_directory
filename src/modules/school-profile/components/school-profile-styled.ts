import { styled } from "@mui/system";
import { Box } from '@mui/material';
import { alpha } from "@mui/system";

type dayContainerProps = {
    theme?: any;
    isActive?: Boolean;
    onClick?: () => void;
};

export const SchoolPageWrapper = styled("div")(({ theme }) => ({
    paddingInline: '120px',
    paddingTop: '30px',
    paddingBottom: '120px',
    [theme.breakpoints.down("md")]: {
        paddingInline: '40px',
        paddingTop: '10px',
        paddingBottom: '80px',
    },
    [theme.breakpoints.down("sm")]: {
        paddingInline: '10px',
        paddingTop: '5px',
        paddingBottom: '40px',
    },
}));

export const ImageGalleryWrapper = styled("div")(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down("md")]: {
        flexDirection: 'column',
    },
}));

export const FirstStudentImage = styled("img")(({ theme }) => ({
    borderRadius: '4px',
    height: '363px',
    objectFit: 'cover',
    width: '100%',
}));

export const StudentImage = styled("img")(({ theme }) => ({
    borderRadius: '4px',
    objectFit: 'cover',
    height: '177px',
    width: '100%',
}));

export const FirstImageSection = styled("div")(({ theme }) => ({
    width: '60%',
    [theme.breakpoints.down("md")]: {
        width: '100%'
    },

}));

export const SecondImageSection = styled("div")(({ theme }) => ({
    width: '40%',
    marginLeft: '8px',

    [theme.breakpoints.down("md")]: {
        width: '100%',
        marginLeft: '0px',
        marginTop: '10px',
    },
}));

export const UpperSection = styled("div")(({ theme }) => ({
    display: "flex", justifyContent: "space-between"
}));

export const FirstImage = styled("div")(({ theme }) => ({

}));
export const SecondImage = styled("div")(({ theme }) => ({
    marginLeft: '9px'
}));

export const LowerImage = styled("div")(({ theme }) => ({
    display: "flex", justifyContent: "space-between",
    marginTop: '9px'
}));

export const ThirdImage = styled("div")(({ theme }) => ({
}));

export const FourthImage = styled("div")(({ theme }) => ({
    marginLeft: '9px',
    position: 'relative',
}));
export const MorePhotoSection = styled("div")(({ theme }) => ({
    backgroundColor: '#333333',
    cursor: 'pointer',
    padding: '12px',
    display: 'flex',
    position: 'absolute',
    top: '118px',
    right: '12px',
    borderRadius: '4px',
    '&:hover': {
        backgroundColor: alpha("#333333", 0.8),
    },
    [theme.breakpoints.down("sm")]: {
        padding: '8px',
    },
}));

export const MorePhotoTitle = styled("div")(({ theme }) => ({
    marginLeft: '8px',
    fontSize: '12px',
    color: '#FCFCFC',
    textTransform: 'uppercase',
    [theme.breakpoints.down("sm")]: {
        marginLeft: '5px',
    },
}));

export const BodySection = styled("div")(({ theme }) => ({}));
export const AvatarButtonSection = styled("div")(({ theme }) => ({
    marginTop: '38px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
        marginTop: '25px',
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
}));
export const AvatarSection = styled("div")(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));
export const Logo = styled("img")(({ theme }) => ({
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    [theme.breakpoints.down("md")]: {
        width: '80px',
        height: '80px'
    },

}));
export const SchoolNameReviewSection = styled("div")(({ theme }) => ({
    fontFamily: 'Saira',
    marginLeft: '17px',
    fontSize: '48px',
    fontWeight: '600',
    [theme.breakpoints.down("md")]: {
        fontSize: '25px',
        marginLeft: '10px',

    },
}));
export const SchoolName = styled("div")(({ theme }) => ({
    color: '#FCFCFC'
}));
export const ReviewSection = styled("div")(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

export const ReviewNumber = styled("div")(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '400',
    color: '#D8D8D8',
    marginLeft: '3px',
    [theme.breakpoints.down("md")]: {
        fontSize: '10px',
    },
}));
export const EditButton = styled("div")(({ theme }) => ({
    borderRadius: "4px",
    display: "flex",
    padding: "12px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#333333',
    cursor: "pointer",
    '&:hover': {
        backgroundColor: alpha("#D3D3D3", 0.2),
    },
    [theme.breakpoints.down("md")]: {
        padding: "6px",
    },
    [theme.breakpoints.down("sm")]: {
        marginTop: '12px',
    },
}));


export const EditText = styled("div")(({ theme }) => ({
    fontWeight: "600",
    fontSize: "12px",
    marginLeft: "8px",
    letterSpacing: "0.08em",
    color: "#FCFCFC",
    textTransform: 'uppercase',
    [theme.breakpoints.down("md")]: {
        fontSize: "8px",
        fontWeight: "400",
    },
}));
export const AddressSection = styled("div")(({ theme }) => ({
    display: 'flex',
    marginTop: '38px',
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
        marginTop: "20px",
    },
}));
export const DirectionLogo = styled("img")(({ theme }) => ({
    marginLeft: "16px",
    [theme.breakpoints.down("md")]: {
        marginLeft: "8px",
    },
}));
export const Address = styled("div")(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: '#FCFCFC',
    marginLeft: '8px',
    cursor: 'pointer',
    [theme.breakpoints.down("md")]: {
        fontSize: "12px",
        marginRight: "4px",
    }
}));
export const SocialButton = styled("div")(({ theme }) => ({
    display: 'flex',

    color: '#FCFCFC',
    [theme.breakpoints.down("md")]: {
        marginTop: '10px'
    }
}));
export const SocialButtonWrapper = styled("div")(({ theme }) => ({
    borderRadius: "4px",
    display: "flex",
    padding: "16px",
    backgroundColor: '#333333',
    marginTop: '23px',
    cursor: "pointer",
    marginRight: '15px',
    '&:hover': {
        backgroundColor: alpha("#D3D3D3", 0.2),
    },
    [theme.breakpoints.down("md")]: {
        marginRight: "8px",
        marginTop: '10px'
    },
}));
export const SocialButtonName = styled("a")(({ theme }) => ({
    marginLeft: "8px",
}));
export const CoachesSection = styled("div")(({ theme }) => ({
    marginTop: "60px",

}));
export const Title = styled("a")(({ theme }) => ({
    fontSize: "28px",
    fontWeight: "600",
    color: '#FCFCFC',
}));
export const Description = styled("div")(({ theme }) => ({
    marginTop: "6px",
    color: '#D8D8D8',
    fontWeight: '400'
}));

export const Avatar = styled("img")(({ theme }) => ({
}));


export const ProfileWrapper = styled("div")(({ theme }) => ({
    display: 'flex',
}));


export const ProfileContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '240px',
    width: '160px',
    minWidth: '160px',
    background: '#333333',
    padding: '16px',
    marginRight: '12px',
    borderRadius: '4px',
    marginTop: '25px',
}));

export const TextWhite14CapitalizeThin = styled('span')(({ theme }) => ({
    textTransform: 'capitalize',
    fontFamily: 'Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    fontSize: '14px',
    color: 'red',
    fontWeight: '400',
    margin: '0',
}));

export const ButtonWrapper = styled('a')(({ theme }) => ({
    display: 'flex',
}));

export const FollowButton = styled('div')(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '0.08em',
    textAlign: 'center',
    padding: '12px 37px',
    backgroundColor: '#D21632',
    borderRadius: '4px',
    '&:hover': {
        backgroundColor: alpha("#D21632", 0.8),
    },
}));

export const TextWhite12Uppercase600 = styled('span')(() => ({
    width: '51px',
    height: '16px',
    fontFamily: 'Saira',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#fcfcfc',
}));

export const AffiliationsSection = styled("div")(({ theme }) => ({
    marginTop: "60px",
}));

export const AffiliationCard = styled("div")(({ theme }) => ({
    padding: '12px',
    boxShadow: '0px 2px 8px 0px #00000033',
    backgroundColor: '#333333',
    display: 'flex',
    marginTop: '25px',
    alignItems: 'center',
    marginRight: '10px',
}));
export const AffiliationLog = styled("img")(({ theme }) => ({
    width: '64px',
    height: '64px',
    borderRadius: '50%'
}));
export const AffiliatedSinceSchoolName = styled("div")(({ theme }) => ({
    marginLeft: '16px',
}));
export const AffiliationSince = styled("div")(({ theme }) => ({
    color: '#FCFCFC'
}));
export const VerifiedAffiliation = styled("div")(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));
export const VerifiedIcon = styled("img")(({ theme }) => ({
    width: '16px',
    height: '16px',
    marginRight: '4px',
}));
export const VerifiedAffiliationName = styled("div")(({ theme }) => ({
    fontSize: '10px',
    color: '#828282',
    letterSpacing: '16%'
}));

// Schedule Section

export const ScheduleSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));

export const Content = styled(Box)(({ theme }) => ({
    marginTop: '40px',
}));

export const TextWhite18UppercaseRegular = styled('span')(({ theme }) => ({
    fontSize: '18px',
    color: '#FCFCFC',
    fontWeight: 500,
    margin: 0,
}));

export const DaySlider = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#0000',
    width: '100%',
    justifyContent: 'space-between',
}));

export const DaySliderContainer = styled('div')({
    top: '180px',
    width: '100%',
    zIndex: 2,
    '@media screen and (max-width: 800px)': {
        top: '150px',
    },
});

export const DayContainer = styled('div')(({ theme, isActive, onClick }: dayContainerProps) => ({
    display: 'flex',
    padding: '20px 50px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    '@media screen and (max-width: 1100px)': {
        padding: '20px 20px',
    },
    [theme.breakpoints.down("sm")]: {
        width: '14.3%',
    },
    borderBottom: isActive ? `2px solid #FF2929` : '2px solid gray',
}));

export const Day = styled('span')(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '400',
    color: '#FCFCFC',
    textTransform: 'uppercase',
    cursor: 'pointer',
}));

export const SchedulesWrapper = styled('div')({
    minHeight: '120px',
    marginTop: '26px',
});
export const NoEventWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    '@media screen and (max-width: 800px)': {
        marginInline: '10px',
    },
});

export const H1 = styled('h1')(({ theme }) => ({
    paddingTop: '20px',
    paddingBottom: '10px',
    color: '#FCFCFC',
    fontSize: '1.5rem',
    lineHeight: '2.5rem',
    margin: '0',
}));

export const PlanSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));

export const PlanContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#333333',
    minWidth: 370,
    marginTop: 15,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    marginBottom: 9,
    marginRight: 15,
});

export const PlanDescription = styled('div')({
    marginTop: 16,
    fontFamily: 'Saira',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0em',
    color: '#828282',
});

export const PlanCardWrapper = styled('div')({
    display: 'flex',
    overflowX: 'scroll',
    '@media screen and (min-width: 700px)': {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const TextWhite18CapitalizeBold = styled('span')({
    textTransform: 'capitalize',
    fontFamily:
        'Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    fontSize: 18,
    color: '#fff',
    fontWeight: 600,
    margin: 0,
});

export const buttonStylesTransparent = {
    color: '#fff',
    backgroundColor: 'transparent',
    height: '40px',
    alignItems: 'center',
    letterSpacing: '0.08em',
    border: '1px solid #4F4F4F',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '16px',
    padding: '12px',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: alpha("#D3D3D3", 0.2)
    }
};


export const MartialArtSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));
export const MartialArtColumn = styled("div")(({ theme }) => ({
    paddingTop: '15px'
}));
export const VerifiedTitle = styled("div")(({ theme }) => ({
    display: 'flex',
    marginTop: '23px',
}));
export const VerifiedRoundIcon = styled("img")(({ theme }) => ({
    margin: '0px 16px 0px 6px',
}));
export const MartialArtName = styled("div")(({ theme }) => ({
    fontSize: '21px',
    fontWeight: '400',
    color: '#FFFFFF',
    cursor: 'pointer',
}));

export const MembersSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));

export const TitleWithMoreButton = styled("div")({
    display: "flex",
    justifyContent: "space-between",
});

export const ViewMoreButton = styled("div")(({ theme }) => ({
    fontFamily: "Saira",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16px",
    letterSpacing: "0em",
    textAlign: "center",
    color: "#FCFCFC",
    padding: "12px",
    border: "1px solid #4F4F4F",
    cursor: "pointer",
    display: 'flex',
    "&: hover": {
        border: "1px solid #FCFCFC",
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "8px",
        padding: "12px",

    },
}));

export const AvatarContainer = styled("div")({
    display: "flex",
    flexWrap: 'wrap',
    marginTop: '6px',
});
export const UserName = styled("div")({
    fontSize: '16px',
    fontWeight: '400',
    color: '#FCFCFC',
    marginTop: '4px',
});
export const AvatarWrapper = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '24px',
    marginTop: '24px',
});

export const AmenitiesSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));

export const AmenitiesRow = styled("div")(({ theme }) => ({
    paddingTop: '15px',
    display: 'flex',
    flexWrap: 'wrap'
}));

export const AmenitiesTitle = styled("div")({
    fontSize: '16px',
    fontWeight: '400',
    color: '#FCFCFC',
    marginTop: '4px',
    cursor: 'pointer',
});

export const CompeleteReviewSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));

export const ReviewSectionWrapper = styled("div")(({ theme }) => ({
    display: 'flex',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}));
export const ReviewCommentDescription = styled("div")(({ theme }) => ({
    fontSize: '18px',
    fontWeight: '400',
    color: '#FFFFFF',
    overflow: 'ellipsis',
    marginTop: '18px'
}));
export const ReviewCardContainer = styled("div")(({ theme }) => ({
    background: '#D9D9D933',
    padding: '20px',
    marginTop: '60px',
    minWidth: '386px',
    marginRight: '18px',
    borderRadius: '4px',
    [theme.breakpoints.down("md")]: {
        minWidth: '300px',
        marginRight: '10px',
        padding: '10px',
    },
}));
export const LastReviewStar = styled("div")(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
}));
export const LastReview = styled("div")(({ theme }) => ({
    fontSize: "12px",
    fontWeight: "400",
    color: '#BDBDBD'
}));

export const AvatarRatingContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: '22px',
}));

export const UserNameSection = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '8px',
    color: '#FFFFFF',
}));

export const DisplayName = styled('span')(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '14px',
    letterSpacing: '0em',
}));

export const RankLevel = styled('span')(({ theme }) => ({
    fontFamily: 'Saira',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '0em',
}));

export const FreeTrialClassFormSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));
export const LocationSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));
export const NearbySchoolSection = styled("div")(({ theme }) => ({
    marginTop: '65px',
}));

export const SchoolTitle = styled("div")(({ theme }) => ({
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "19px",
    color: "#BDBDBD",
    marginBottom: "10px",
    [theme.breakpoints.down("md")]: {

        marginBlock: '20px'
    },
}));

export const MartialArtSchoolContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "410px",
    [theme.breakpoints.down("sm")]: {
        height: 'unset'
    },
}));

export const SchoolMartialName = styled("div")(({ theme }) => ({
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19px",
    color: "#FCFCFC",
    marginTop: "16px",
    cursor: "pointer",
    marginLeft: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "150px",
    [theme.breakpoints.down("sm")]: {
        width: "250px",
    },
}));

export const SchoolLogo = styled("img")({
    borderRadius: '50%',
});