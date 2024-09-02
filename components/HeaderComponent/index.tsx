import React from "react";
import {
  Container,
  HeaderBackButton,
  HeaderButton,
  Icon,
  Section,
  TitleContainer,
} from "./components/header.styled";
import SearchBar from "components/SearchBar";
import { useRouter } from "next/router";
import { useResponsive } from "src/hooks/useResponsive";
import SmallScreenSearchBar from "components/SmallScreenSearchBar";

const Header = ({ searchField, isPlanHeader, schoolData }: any) => {
  const { push } = useRouter();
  const mediumScreen = useResponsive("down", "md");
  return (
    <Container>
      <Section>
        <TitleContainer onClick={() => push("/")}>
          <Icon src="https://res.cloudinary.com/de1kz0ucq/image/upload/v1681808375/dojoIcon_lglbwj.svg" />
        </TitleContainer>
        {searchField && !mediumScreen && <SearchBar schoolData={schoolData} />}
        {isPlanHeader ? (
          <HeaderBackButton onClick={() => push("/")}>
            BACK TO HOME
          </HeaderBackButton>
        ) : (
          <HeaderButton>ADD SCHOOL</HeaderButton>
        )}
      </Section>
      {searchField && mediumScreen && (
        <SmallScreenSearchBar schoolData={schoolData} />
      )}
    </Container>
  );
};

export default Header;
