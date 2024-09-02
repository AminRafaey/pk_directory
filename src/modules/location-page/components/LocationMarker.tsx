import React, { useState } from "react";
import MarkerComponent from "./MarkerComponent";
import { Popup } from "react-map-gl";

const LocationMarker = ({ markers }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openPopup = (index) => {
    setSelectedIndex(index);
  };

  const closePopup = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      <>
        {markers?.map((marker, index) => {
          const position = [marker.lat || null, marker.long || null];
          return (
            <MarkerComponent
              position={position}
              index={index}
              marker={marker}
              openPopup={openPopup}
            />
          );
        })}
        <>
          {selectedIndex !== null && (
            <Popup
              style={{
                marginTop: "8px",
                width:'200px',
              }}
              latitude={markers?.[selectedIndex]?.lat}
              longitude={markers?.[selectedIndex]?.long}
              onClose={closePopup}
              closeButton={true}
              closeOnClick={false}
              anchor="top" // Position the popup at the bottom of the marker
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <img
                  src={
                    markers?.[selectedIndex]?.schoolLogo?.[0]?.url ||
                    "/logo/dojo-small.png"
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                  alt="School Logo"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: "600" }}>
                    {markers?.[selectedIndex]?.schoolName}
                  </span>
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: "400",
                      marginTop: "-8px",
                    }}
                  >
                    {markers?.[selectedIndex]?.address1}
                  </span>
                </div>
              </div>
            </Popup>
          )}
        </>
      </>
    </>
  );
};

export default LocationMarker;
