import React from "react";
import { DownloadTitle, SocialBadge } from "./claim-payment-styled";

const ThanksSection = () => {
  return (
    <>
      <DownloadTitle>Download DOJO+ APP</DownloadTitle>
      <div style={{ display: "flex",marginTop:'25px' }}>
        <a
          href="https://apps.apple.com/pk/app/dojo/id1568453709"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialBadge
            style={{
                marginRight:'25px',
            }}
            src="/assets/apple-store-badge.svg"
          />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=app.bravostudio.A01F53MDJ44JKP4EKY6JSAKNWN3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialBadge src="/assets/google-play-badge.svg" />
        </a>
      </div>
    </>
  );
};

export default ThanksSection;
