import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "react-map-gl";
import {
  FooterWrapper,
  LocationPageSection,
  LocationPageWrapper,
  MapSection,
} from "./components/location.styled";
import LocationFooter from "components/LocationFooter";
import SchoolCard from "components/SchoolCard";
import ModalOverlay from "../modal-overlay";
import FilterCard from "./components/FilterCard";
import LocationMarker from "./components/LocationMarker";

const Location = ({ schoolData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <LocationPageWrapper>
        <LocationPageSection>
          {/* For Letter use  */}
          {/* <LocationTitleFilterCard>
            {schoolData?.length} Best {query?.martialArts} near {query?.city}
          </LocationTitleFilterCard> */}
          {/*For Letter use Comment By Amin */}
          {/* <FilterButton>
            <FilterButtonWrapper onClick={handleModal}>
              <TuneIcon
                sx={{
                  color: "#828282",
                  marginRight: "8px",
                }}
              />
              <FilterText>FILTERS</FilterText>
            </FilterButtonWrapper>
          </FilterButton> */}
          <Grid
            container
            sx={{
              paddingTop: { sx: "10px", sm: "25px" },
              width: "100%",
              display: "flex",
              justifyContent: { sx: "center", md: "left" },
            }}
          >
            {schoolData?.map((data) => {
              return (
                <Grid item sm={2.6} md={4} lg={6}>
                  <div
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <SchoolCard data={data} />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </LocationPageSection>
        <MapSection>
          <Map
            initialViewState={{
              zoom: 13,
              latitude: schoolData?.[0]?.lat,
              longitude: schoolData?.[0]?.long,
            }}
            mapLib={import("mapbox-gl")}
            mapboxAccessToken="pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA"
            mapStyle="mapbox://styles/mapbox/dark-v10"
          >
            <LocationMarker markers={schoolData} />
          </Map>
        </MapSection>
      </LocationPageWrapper>
      <FooterWrapper>
        <LocationFooter />
      </FooterWrapper>
      <ModalOverlay
        open={isModalVisible}
        maxWidth="788px"
        onCloseClick={handleModal}
        title="Filters"
        headerStyle={{
          backgroundColor: "#282828",
        }}
        height="100%"
      >
        <Box
          sx={{
            overflow: "scroll",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <FilterCard />
        </Box>
      </ModalOverlay>
    </>
  );
};

export default Location;
