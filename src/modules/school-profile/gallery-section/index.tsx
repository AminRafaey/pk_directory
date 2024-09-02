import React from "react";
import {
  FirstImage,
  FirstImageSection,
  FirstStudentImage,
  FourthImage,
  ImageGalleryWrapper,
  LowerImage,
  MorePhotoSection,
  MorePhotoTitle,
  SecondImage,
  SecondImageSection,
  StudentImage,
  ThirdImage,
  UpperSection,
} from "../components/school-profile-styled";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const GallerySectionComponent = ({ schoolData }) => {
  return (
    <ImageGalleryWrapper>
      <FirstImageSection>
        {schoolData?.gallery?.[0]?.url && (
          <FirstStudentImage
            itemProp={MICRO_DATA.IMAGE}
            src={
              schoolData?.gallery?.[0]?.url ||
              "https://res.cloudinary.com/de1kz0ucq/image/upload/v1692112709/placeholder-image_wjcy2v.jpg"
            }
          />
        )}
      </FirstImageSection>
      <SecondImageSection>
        <UpperSection>
          <FirstImage>
            {schoolData?.gallery?.[1]?.url && (
              <StudentImage
                itemProp={MICRO_DATA.IMAGE}
                src={
                  schoolData?.gallery?.[1]?.url ||
                  "https://res.cloudinary.com/de1kz0ucq/image/upload/v1692112709/placeholder-image_wjcy2v.jpg"
                }
              />
            )}
          </FirstImage>
          <SecondImage>
            {schoolData?.gallery?.[2]?.url && (
              <StudentImage
                itemProp={MICRO_DATA.IMAGE}
                src={
                  schoolData?.gallery?.[2]?.url ||
                  "https://res.cloudinary.com/de1kz0ucq/image/upload/v1692112709/placeholder-image_wjcy2v.jpg"
                }
              />
            )}
          </SecondImage>
        </UpperSection>
        <LowerImage>
          <ThirdImage>
            {schoolData?.gallery?.[3]?.url && (
              <StudentImage
                itemProp={MICRO_DATA.IMAGE}
                src={
                  schoolData?.gallery?.[3]?.url ||
                  "https://res.cloudinary.com/de1kz0ucq/image/upload/v1692112709/placeholder-image_wjcy2v.jpg"
                }
              />
            )}
          </ThirdImage>

          <FourthImage>
            {schoolData?.gallery?.[4]?.url && (
              <StudentImage
              itemProp={MICRO_DATA.IMAGE}
                src={
                  schoolData?.gallery?.[4]?.url ||
                  "https://res.cloudinary.com/de1kz0ucq/image/upload/v1692112709/placeholder-image_wjcy2v.jpg"
                }
              />
            )}

            {schoolData?.gallery?.length > 5 && (
              <MorePhotoSection>
                <img src="/icons/gallery-icon.svg" />
                <MorePhotoTitle>more photos</MorePhotoTitle>
              </MorePhotoSection>
            )}
          </FourthImage>
        </LowerImage>
      </SecondImageSection>
    </ImageGalleryWrapper>
  );
};

export default GallerySectionComponent;
