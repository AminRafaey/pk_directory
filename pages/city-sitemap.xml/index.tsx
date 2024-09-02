import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getSchoolSlugs } from "services/SchoolService";
import {
  getAllCity,
} from "services/SchoolServiceWithoutCache";

const createSitemapField = (suffix: string) => ({
  loc: `https://school.dojo.plus${suffix}`,
  lastmod: new Date().toISOString(),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cityData = await getAllCity();
  const fields = cityData.map(({ slugTypeCity }) => {
    return createSitemapField(`/city/${slugTypeCity}`);
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
