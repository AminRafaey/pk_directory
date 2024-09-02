import React, { useState } from "react";
import { SchoolNameText, SearchButtonPopular } from "./home.styled";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { MICRO_DATA } from "src/shared/utils/micro-data";

interface PopularSearchesProps {
  searchData: {link: string | undefined, title: string | undefined};
}

const PopularSearches: React.FC<PopularSearchesProps> = ({ searchData }) => {
  const [isHover, setIsHover] = useState<any>(false);
  const { push } = useRouter();

  const hoverHandler = () => {
    setIsHover(true);
  };
  const unHoverHandler = () => {
    setIsHover(false);
  };
  const theme = useTheme();
  return (
    <SearchButtonPopular
      onClick={() => push(`${searchData?.link}`)}
      onMouseEnter={hoverHandler}
      onMouseLeave={unHoverHandler}
      isHover={isHover}
      theme={theme}
    >
      <SearchIcon
        sx={{
          color: isHover ? "#FCFCFC" : "#828282",
        }}
      />
      <SchoolNameText itemProp={MICRO_DATA?.NAME} theme={theme} isHover={isHover}>
        {searchData?.title}
      </SchoolNameText>
    </SearchButtonPopular>
  );
};

export default PopularSearches;
