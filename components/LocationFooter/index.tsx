import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { alpha } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
// For Letter Use Commented By Amin
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AboutUsTitle,
  Address,
  AppTitle,
  BottomLine,
  Company,
  DojoIcon,
  DownloadContainer,
  Error,
  FollowUsTitle,
  FooterSection,
  InputFieldWrapper,
  ListSchool,
  MailText,
  MailWrapper,
  Section,
  SocialBadge,
  SocialIcon,
  SocialIconWrapper,
} from "./components/footer.styled";
import { MICRO_DATA } from "src/shared/utils/micro-data";

const LocationFooter = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const [hostNameData, setHostNameData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    const hostname = window.location.hostname;
    setHostNameData(hostname);
  }, []);

  const validateEmail = (value) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(value) || "Invalid email address";
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (data.email.length > 0) {
      axios
        .post("/api/Leads/email-subscribe", {
          email: data.email,
          directoryUrl: hostNameData,
        }).then(()=>{
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error", error);
          setIsLoading(false);
        });

      setValue("email", "");
    }
  };
  return (
    <FooterSection>
      <Grid
        container
        sx={{
          paddingTop: { xs: "40px", md: "77px" },
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={5.5} lg={6}>
          <MailWrapper>
            <MailText itemProp={MICRO_DATA.DISAMBIGUATING_DESCRIPTION}>
              Sign up for exclusive deals and free technique videos every single
              week
            </MailText>
            <InputFieldWrapper>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    validate: validateEmail,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                          placeholder="Add Your Email"
                          value={field?.value}
                          error={errors?.email}
                          InputProps={{
                            sx: {
                              borderRadius: "4px !important",
                              backgroundColor: "#111111 !important",
                              width: { xs: "220px", md: "270px" },
                              border: "1px solid  #3d3d3d",
                              "& input": {
                                color: "#FCFCFC",
                              },
                              "&.MuiFilledInput-root": {
                                color: "#FFFFFF4D",
                              },
                              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#3d3d3d !important",
                                },
                            },
                          }}
                        />
                    );
                  }}
                />
                <Button
                  sx={{
                    backgroundColor: "#D21632",
                    color: "#FCFCFC",
                    fontWeight: "400",
                    fontFamily: "Saira",
                    height: "100%",
                    fontSize: {
                      xs: "10px !important",
                      md: "16px !important",
                    },
                    "&:hover": {
                      borderColor: "none !important",
                      backgroundColor: alpha("#D21632", 0.7),
                    },
                    marginLeft: "4px",
                    padding: { sx: "0px 10px", md: "0px 16px" },
                    borderRadius: "4px !important",
                  }}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <text>Subscribe</text>
                  )}
                </Button>
              </form>
            </InputFieldWrapper>
            {!errors.length && <Error>{errors?.email?.message}</Error>}
          </MailWrapper>
        </Grid>
        <Grid item xs={12} sm={2} lg={2}>
          <AboutUsTitle>ABOUT US</AboutUsTitle>
          <ListSchool>List Your School</ListSchool>
          <Company>Company</Company>
        </Grid>
        <Grid item xs={12} sm={2.5} lg={2}>
          <DownloadContainer>
            <AppTitle>DOJO+ App</AppTitle>
            <a
              itemProp={MICRO_DATA.URL}
              href="https://apps.apple.com/pk/app/dojo/id1568453709"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialBadge
                style={{
                  marginBottom: "15px",
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
          </DownloadContainer>
        </Grid>
        <Grid item xs={12} sm={2} lg={2}>
          <FollowUsTitle>Follow Us</FollowUsTitle>
          <SocialIconWrapper>
            <a
              itemProp={MICRO_DATA.URL}
              href="https://www.facebook.com/dojoplus.network"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/icons/facebook.svg" />
            </a>
            <a
              itemProp={MICRO_DATA.URL}
              href="https://www.instagram.com/dojo.plus/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon
                style={{ paddingInline: "22px" }}
                src="/icons/instagram.svg"
              />
            </a>
            <a
              href="https://twitter.com/dojo_plus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src="/icons/twitter.svg" />
            </a>
          </SocialIconWrapper>
        </Grid>
      </Grid>
      <BottomLine />

      <Section>
        <Address>
          <DojoIcon
            onClick={() => push("/")}
            style={{
              width: "117px",
              marginRight: "16px",
            }}
            src="https://res.cloudinary.com/de1kz0ucq/image/upload/v1681808375/dojoIcon_lglbwj.svg"
          />{" "}
          {/* Commented By Amin */}
          {/* <ChevronRightIcon style={{ color: "#828282" }} /> Martial Arts{" "} */}
        </Address>
      </Section>
    </FooterSection>
  );
};

export default LocationFooter;
