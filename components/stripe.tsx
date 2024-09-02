import { styled } from "@mui/system";

interface StripeFieldContainerProps {
  isFocus: boolean;
}

export const StripeFiledContainer = styled("div")<StripeFieldContainerProps>(
  ({ isFocus, theme }) => ({
    marginTop: "20px",
    padding: "16px",
    border: `2px solid ${
      theme.palette.mode === "light" ? "#3d3d3d" : "#ffffff"
    }`,
    borderRadius: "0.375rem",
    backgroundColor: isFocus ? "#fff" : "#1b1b1b",
    color: "#fcfcfc",
    maxHeight: "60px",
  })
);

export const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#737373",
      color: "#737373",
      fontSize: "16px",
      fontFamily: "Saira, Helvetica Neue, sans-serif",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#737373",
      },
      border: "2px solid #3d3d3d",
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};
