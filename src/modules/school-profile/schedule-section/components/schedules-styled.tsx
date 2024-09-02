import { styled } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import { alpha } from "@mui/system";

interface ScheduleItemProps {
  hasEnd: boolean | undefined;
  progress: number;
}

type dayContainerProps = {
  theme?: any;
  isActive?: Boolean;
  onClick?: () => void;
};

export const ScheduleItem = styled("div")<ScheduleItemProps>(
  ({ hasEnd, progress, theme }) => ({
    backgroundColor: "#333333",
    width: "95%",
    borderRadius: "4px",
    marginBottom: "16px",
    opacity: hasEnd ? "0.5" : "1",
    cursor: hasEnd ? "auto" : "pointer",
    padding: "15px 0",
    fontSize: "12px",
    backgroundImage: "url('/assets/fallback_images/image-404040.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: progress && progress > 0 ? `${progress}% 100%` : 0,
    display: "flex",
    flexDirection: "row",
  })
);

export const ScheduleItemWrapper = styled("div")({
  alignItems: "start",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const ScheduleEventNameStyled = styled("div")(({ theme }) => ({
  fontSize: "18px",
  margin: "0px",
  fontWeight: 400,
  color: theme.palette.primary.contrastText,
}));

export const ScheduleTime = styled("span")({
  "&:before": {
    margin: "10px 0px",
    display: "block",
    height: "4px",
    width: "24px",
    backgroundColor: "#ff595f",
  },
});

export const TextTime = styled("span")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  color: theme.palette.primary.contrastText,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ScheduleOpacity = styled("span")(({ theme }) => ({
  color: "#FCFCFC",
}));

export const Item = styled("span")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "0.875rem",
  lineHeight: "1.5rem",
  display: "flex",
  alignItems: "center",
}));

export const Svg = styled("svg")({
  height: "1.25rem",
  width: "1.25rem",
  marginRight: "0.25rem",
  opacity: 0.5,
});

export const AvatarContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginInline: "24px",
});

export const TextMaster = styled("span")(({ theme }) => ({
  fontFamily: "Saira",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  color: theme.palette.primary.contrastText,
}));

export const RightArrow = styled("img")({
  height: "11px",
  width: "11px",
  marginInline: "6px",
});

export const Icon = styled("img")({
  animation: "pulsate 2s both infinite",
  "@keyframes pulsate": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.6,
    },
  },
});

export const NameLiveContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "end",
  paddingRight: "15px",
});

export const TextGray12Opacity = styled("span")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  color: "#828282",
}));

export const ScheduleCardWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#333333",
  borderRadius: "4px",
  marginBottom: "16px",
  padding: "24px 32px",
}));

export const AchievementInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "240px",
  "@media screen and (max-width: 1100px)": {
    width: "160px",
  },
});

export const UserAvatarInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "8px",
  width: "174px",
  justifyContent: "center",
  "@media screen and (max-width: 1100px)": {
    width: "150px",
  },
});
export const UserName = styled("div")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: theme.palette.primary.contrastText,
}));
export const UserBelt = styled("div")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#828282",
}));

export const Dash = styled("div")(({ theme }) => ({
  width: "29px",
  height: "5px",
  backgroundColor: "#FF595F",
  marginTop: "10px",
}));

export const TryFreeButton = styled(Button)(({ theme }) => ({
  background: "#D21632",
  borderRadius: "4px !important",
  fontSize: "12px !important",
  fontWeight: "400",
  padding: "10px 15px !important",
  [theme.breakpoints.down("lg")]: {
    padding: "6px 10px !important",
  },
  "&:hover": {
    backgroundColor: alpha("#D21632", 0.8),
  },
}));

// Schedule Page Styled

export const Content = styled(Box)(({ theme }) => ({
  width: "80%",
  position: "relative",
  marginTop: 0,
  marginBottom: 0,
  marginLeft: "auto",
  marginRight: "auto",
  paddingTop: 0,
  "@media screen and (max-width: 1024px)": {
    width: "80%",
  },
  "@media screen and (max-width: 500px)": {
    width: "100%",
  },
}));

export const TextWhite18UppercaseRegular = styled("span")(({ theme }) => ({
  fontSize: "18px",
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  margin: 0,
}));

export const DaySlider = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: theme.palette.primary.dark,
  width: "100%",
  justifyContent: "space-between",
  borderBottom: `2px solid ${theme.palette.primary.light}`,
}));

export const DaySliderContainer = styled("div")({
  position: "sticky",
  top: "180px",
  width: "100%",
  zIndex: 2,
  "@media screen and (max-width: 800px)": {
    top: "150px",
  },
});

export const DayContainer = styled("div")(
  ({ theme, isActive, onClick }: dayContainerProps) => ({
    display: "flex",
    padding: "20px 46px",
    justifyContent: "center",
    alignItems: "center",
    width: "13.3%",
    "@media screen and (max-width: 1100px)": {
      padding: "20px 26px",
    },
    borderBottom: isActive && `2px solid ${theme.palette.primary.main}`,
  })
);

export const Day = styled("span")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "400",
  color: theme.palette.primary.contrastText,
  textTransform: "uppercase",
  cursor: "pointer",
}));

export const SchedulesWrapper = styled("div")({
  minHeight: "120px",
});
export const NoEventWrapper = styled("div")({
  "@media screen and (max-width: 800px)": {
    marginInline: "10px",
  },
});

export const H1 = styled("h1")(({ theme }) => ({
  paddingTop: "20px",
  paddingBottom: "10px",
  color: theme.palette.primary.contrastText,
  fontSize: "1.5rem",
  lineHeight: "2.5rem",
  margin: "0",
}));

export const SchedulePageWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "cyan",
}));
