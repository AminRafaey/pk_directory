import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import {
  getAllState,
} from "services/SchoolServiceWithoutCache";

const createSitemapField = (suffix: string) => ({
  loc: `https://school.dojo.plus${suffix}`,
  lastmod: new Date().toISOString(),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const stateData = await getAllState();
  const fields = stateData.map(({ slugTypeState }) => {
    return createSitemapField(`/state/${slugTypeState}`);
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
