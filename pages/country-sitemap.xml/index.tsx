import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import {
  getAllCountry,
} from "services/SchoolServiceWithoutCache";

const createSitemapField = (suffix: string) => ({
  loc: `https://school.dojo.plus${suffix}`,
  lastmod: new Date().toISOString(),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const countryData = await getAllCountry();
  const fields = countryData.map(({ slugTypeCountry }) => {
    return createSitemapField(`/country/${slugTypeCountry}`);
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
