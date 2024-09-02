import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getSchoolSlugs } from "services/SchoolService";

const createSitemapField = (suffix: string) => ({
  loc: `https://school.dojo.plus${suffix}`,
  lastmod: new Date().toISOString(),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slugs = await getSchoolSlugs();

  const fields = slugs.map(({ slug }) => {
    return createSitemapField(`/${slug}#trial`)
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
