import { SchoolTableFields } from "models/SchoolModel";
import { Page } from "components/Page";
import { SchoolStaticProps } from "services/SchoolService";
import Head from "next/head";
import { useGoogleMaps } from "react-hook-google-maps";
import { useEffect } from "react";
import { NEXT_PUBLIC_GOOGLE_MAPS_KEY } from "airtable.config";

export {
  getSchoolStaticPaths as getStaticPaths,
  getSchoolStaticProps as getStaticProps,
} from "services/SchoolService";

export default function LocationPage({ school }: SchoolStaticProps) {
  const { lat = 0, lng = 0 } =
    (
      process.browser &&
      school &&
      school?.[SchoolTableFields?.GEO] &&
      JSON.parse(window?.atob(school?.[SchoolTableFields?.GEO]?.split(" ")?.[1]))
    )?.o ?? {};

  const { ref, google, map } = useGoogleMaps(
    NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    {
      center: { lat, lng },
      zoom: 16,
      mapTypeControl: false,
      styles: [
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
          stylers: [
            {
              color: "#2D333C",
            },
          ],
        },
      ],
    }
  );

  useEffect(() => {
    if (google?.maps?.Marker) {
      new google.maps.Marker({
        position: { lat, lng },
        map,
        title: school && school[SchoolTableFields?.NAME],
      });
    }
  }, [google, map]);

  return school ? (
    <Page school={school} noPadding fullWidth>
      <Head>
        <title>
          {school[SchoolTableFields.NAME] + " - Directions" ?? "Unknown Name"} -
          DOJO+
        </title>
        <meta property="og:title" content={school[SchoolTableFields.NAME]} />
        <meta
          property="og:description"
          content={school[SchoolTableFields.NAME] + " Location"}
        />
        <meta
          property="og:image"
          data-content={
            school[SchoolTableFields.LOGO] ?? school[SchoolTableFields.LOGO]
          }
        />
        <meta property="og:url" content={school[SchoolTableFields.SLUG]} />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content={`${
            school[SchoolTableFields.NAME]
          } location, ${school[SchoolTableFields.NAME]} school location, Dojo location, ${school[SchoolTableFields.NAME]} school address, Directions to ${school[SchoolTableFields.NAME]} school, Map of dojo location, ${school[SchoolTableFields.NAME]} school map, ${school[SchoolTableFields.NAME]} training center, ${school[SchoolTableFields.NAME]} school amenities, ${school[SchoolTableFields.NAME]} school features, ${school[SchoolTableFields.NAME]} school address, ${school[SchoolTableFields.NAME]} school contact information, Dojo directions, ${school[SchoolTableFields.NAME]} school proximity, Dojo map and directions, ${school[SchoolTableFields.NAME]} training location, Dojo amenities, ${school[SchoolTableFields.NAME]} school surroundings, ${school[SchoolTableFields.NAME]} training facilities`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {school[SchoolTableFields?.ADDRESS] ? (
        <div className="grid grid-rows-1 h-full">
          {school[SchoolTableFields?.GEO] && (
            <div
              ref={ref}
              className="w-full"
              itemScope
              itemType="http://schema.org/Place"
              itemProp="hasMap"
            />
          )}
          {school[SchoolTableFields?.FULL_ADDRESS] && (
            <address
              className="h-20 border-t border-dojored flex justify-center items-center not-italic cursor-default"
              itemScope
              itemType="http://schema.org/PostalAddress"
              itemProp="address"
            >
              {school[SchoolTableFields?.FULL_ADDRESS]}
            </address>
          )}
        </div>
      ) : (
        "Address not found for this school"
      )}
    </Page>
  ) : (
    <></>
  );
}