import Prismic from "@prismicio/client";

export const apiEndpoint = "https://dojoplus.cdn.prismic.io/api/v2";
export const accessToken =
  "MC5ZQ1NyRWhJQUFDTUFTaGRq.77-977-9VFdC77-9JEAHOe-_vSEG77-9Iyt577-977-977-9dlnvv73vv71bIe-_vW4r77-9be-_vQ";

// Client method to query documents from the Prismic repo
export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};
