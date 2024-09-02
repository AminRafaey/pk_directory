export function browserEvents() {
  function fillAvailableHeight() {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  window.addEventListener("resize", fillAvailableHeight);
  fillAvailableHeight();

  // disables scroll bounce on safari mobile
  document.addEventListener("touchmove", function (event) {
    event.preventDefault();
  });
}

export const umamiCollectProxyUrl =
  "/resource/a3439b7e-5470-47f5-ba22-96057925afdc";
export const umamiScript = "/resource/d9806b0d-b755-41bc-9929-6ef05f163266";
export const umamiSiteId = "a83cc766-4e4f-402c-9d65-c3186a4a9a4b";
export const t2 = process.browser && (window as any).umami;


export const distance: (
  lt1: number,
  lt2: number,
  lng1: number,
  lng2: number,
) => number = (lt1, lt2, lng1, lng2) => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  const lon1 = (lng1 * Math.PI) / 180;
  const lon2 = (lng2 * Math.PI) / 180;
  const lat1 = (lt1 * Math.PI) / 180;
  const lat2 = (lt2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371;

  // calculate the result
  return c * r;
};
