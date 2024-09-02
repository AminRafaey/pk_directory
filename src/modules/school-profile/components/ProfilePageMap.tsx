import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "430px",
  minHeight: "430px",
  marginTop: "32px",
  borderRadius: "4px",
};

const mapStyles: any = [
  {
    stylers: [
      {
        hue: "#ff1a00",
      },
      {
        invert_lightness: true,
      },
      {
        saturation: -100,
      },
      {
        lightness: 33,
      },
      {
        gamma: 0.5,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#2D333C" }],
  },
];

const ProfilePageMap = ({ schoolData }) => {
  const center = {
    lat: schoolData?.lat,
    lng: schoolData?.long,
  };

  const Markers = ({ markers }) => {
    const position = { lat: markers?.lat, lng: markers?.long };
    return (
      <React.Fragment>
        {/* Base location icon */}
        <Marker
          position={position}
          icon={{
            url: "/logo/location-marker.png",
            scaledSize: new window.google.maps.Size(62, 62),
            anchor: new window.google.maps.Point(12, 0),
          }}
        />
      </React.Fragment>
    );
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={{
        styles: mapStyles,
      }}
    >
      <Markers markers={schoolData} />
    </GoogleMap>
  );
};

export default ProfilePageMap;
