import React from "react";
import { Rating } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type StarRatingProps = {
  rating?: number | string | undefined;
  width?: string | undefined;
  height?: string | undefined;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, width, height }) => {
  return (
    <Rating
      name="read-only"
      value={rating as number}
      precision={0.1}
      readOnly
      icon={<StarRoundedIcon />}
      emptyIcon={<StarRoundedIcon />}
      sx={{
        "& .MuiRating-iconFilled": {
          color: "#FF595F",
        },
        "& .MuiRating-iconEmpty": {
          color: "white",
        },
        ".MuiSvgIcon-root": {
          width: width,
          height: height,
        },
        marginRight: "7px !important",
      }}
    />
  );
};

export default StarRating;
