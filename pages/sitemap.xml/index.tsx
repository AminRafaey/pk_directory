import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getSchoolSlugs } from "services/SchoolService";
import {
  getAllCity,
  getAllCountry,
  getAllState,
} from "services/SchoolServiceWithoutCache";

const createSitemapField = (suffix: string) => ({
  loc: `https://school.dojo.plus${suffix}`,
  lastmod: new Date().toISOString(),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slugs = await getSchoolSlugs();
  const city = await getAllCity();
  const state = await getAllState();
  const country = await getAllCountry();


  const uniqueSlugs = {};
  let allCityStateCountySlug = [];
  
  // Helper function to add unique slugs to the array and update the uniqueSlugs object
  const addUniqueSlugs = (items, slugType) => {
    items.forEach(item => {
      const slug = item[`slugType${slugType}`];
      if (!uniqueSlugs[slug]) {
        uniqueSlugs[slug] = true;
        allCityStateCountySlug.push(slug);
      }
    });
  };
  
  // Add all slugs to the array
  slugs.forEach(item => {
    allCityStateCountySlug.push(item?.slug);
  });
  
  // Add unique slugs for city, state, and country
  addUniqueSlugs(city, 'City');
  addUniqueSlugs(state, 'State');
  addUniqueSlugs(country, 'Country');


  const fields = allCityStateCountySlug.map((slug) => {
    return createSitemapField(`/${slug}`);
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
