import React, { useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";
import { MICRO_DATA } from "src/shared/utils/micro-data";
import { SchoolTableFields } from "models/SchoolModel";

interface LogoStyledProps {
  borderRadius?: string;
  breakWidth?: string;
  breakHeight?: string;
}

const Logo = styled("img")<LogoStyledProps>(
  ({ style, borderRadius, theme, breakWidth, breakHeight }) => ({
    ...style,
    borderRadius: borderRadius,
    [theme.breakpoints.down("md")]: {
      width: breakWidth,
      height: breakHeight,
    },
  })
);

type LogoImageProps = {
  logoImage: string | undefined | any;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  borderRadius?: string;
  breakWidth?: string;
  breakHeight?: string;
  slug?: string | string[] | undefined;
  alt?: any;
};

const LogoImage: React.FC<LogoImageProps> = ({
  slug,
  logoImage,
  style,
  width,
  height,
  breakWidth,
  breakHeight,
  borderRadius,
  alt,
}) => {
  const [logo, setLogo] = useState(logoImage);
  const DefaultSchoolAvatar = "/assets/DefaultSchoolGrey.svg";

  const getNewImage = () => {
    setLogo(DefaultSchoolAvatar);
    axios("/api/Schools/get-new-image", {
      params: {
        slug,
      },
    })
      .then((res) => {
        setLogo(res.data[SchoolTableFields.LOGO]?.[0]?.url);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Logo
      itemProp={MICRO_DATA.IMAGE}
      style={style}
      src={logo}
      onError={() => getNewImage()}
      placeholder="blur"
      width={width}
      height={height}
      borderRadius={borderRadius}
      breakWidth={breakWidth}
      breakHeight={breakHeight}
      alt={alt}
    />
  );
};

export default LogoImage;
