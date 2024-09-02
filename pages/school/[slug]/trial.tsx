import { SchoolTableFields } from "models/SchoolModel";

import { Page } from "components/Page";
import { SchoolStaticProps } from "services/SchoolService";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  CustomerCreateResponse,
  CustomerTableColumns,
} from "models/CustomerModel";
import Head from "next/head";
import { t2 } from "utils";
import CustomizePhoneNumberInput from "components/CustomizePhoneNumberInput";

export {
  getSchoolStaticPaths as getStaticPaths,
  getSchoolStaticProps as getStaticProps,
} from "services/SchoolService";

const inputWrapperStyle =
  "px-4 py-1 border-2 border-dojogray-600 rounded-md my-2 bg-dojogray-900 focus-within:bg-white focus-within:text-dojogray-900";

function Input({
  name,
  placeholder,
  type,
  as,
}: {
  name: string;
  placeholder: string;
  type?: string;
  as?: "textarea";
}) {
  const style = "bg-transparent w-full appearance-none focus:outline-none";

  return (
    <div className={inputWrapperStyle}>
      <label htmlFor={name} className="text-xs text-dojogray-600">
        {placeholder.toUpperCase()}
      </label>
      {as !== "textarea" ? (
        <input type={type} name={name} className={style} required />
      ) : (
        <textarea name={name} className={style} required />
      )}
    </div>
  );
}

export default function TrialPage({ school }: SchoolStaticProps) {
  const router = useRouter();
  const [sending, setSend] = useState<boolean>();
  const [personNumber, setPersonNumber] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<any>({
    code: "BR",
    label: "Brazil",
    phone: "55",
  });
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { currentTarget } = event;
    const payload = {
      customer: {
        [CustomerTableColumns.NAME]:
          currentTarget[CustomerTableColumns.NAME].value,
        [CustomerTableColumns.EMAIL]:
          currentTarget[CustomerTableColumns.EMAIL].value,
        [CustomerTableColumns.INTEREST]:
          currentTarget[CustomerTableColumns.INTEREST].value,
        [CustomerTableColumns.PHONE]: personNumber?.phone,
        [CustomerTableColumns.NOTES]:
          currentTarget[CustomerTableColumns.NOTES].value,
        [CustomerTableColumns.SCHOOL_SLUG]: router.query.slug,
        [CustomerTableColumns.COUNTRY]: selectedCountry,
      },
    };
    setSend(true);
    await axios
      .post<CustomerCreateResponse>("/api/customer/", payload)
      .catch(() => setSend(false));

    t2?.trackEvent(payload.customer[CustomerTableColumns.EMAIL], "new-trial");

    router.push(`/${router.query.slug}/trial?success`);
  };

  return school ? (
    <>
      <Head
        children={
          <>
            <title>
              {school[SchoolTableFields.NAME] + " - Trial" ?? "Unknown Name"} -
              DOJO+
            </title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              property="og:title"
              content={school[SchoolTableFields.NAME]}
            />
            <meta
              property="og:description"
              content={school[SchoolTableFields.NAME] + " Trial"}
            />
            <meta
              property="og:image"
              data-content={
                school[SchoolTableFields.LOGO] ?? school[SchoolTableFields.LOGO]
              }
            />
            <meta property="og:url" content={school[SchoolTableFields.SLUG]} />
            <meta property="og:type" content="website" />
            <meta
              property="keywords"
              content={`${school[SchoolTableFields.NAME]} trial, ${
                school[SchoolTableFields.NAME]
              } trial, Free ${school[SchoolTableFields.NAME]} class, ${
                school[SchoolTableFields.NAME]
              } trial session, ${school[SchoolTableFields.NAME]} Trial class, ${
                school[SchoolTableFields.NAME]
              } trial offer, Free ${school[SchoolTableFields.NAME]} trial, ${
                school[SchoolTableFields.NAME]
              } trial program, Try ${school[SchoolTableFields.NAME]}, ${
                school[SchoolTableFields.NAME]
              } trial membership, ${
                school[SchoolTableFields.NAME]
              } trial session, Introductory ${
                school[SchoolTableFields.NAME]
              } class, Beginner ${school[SchoolTableFields.NAME]} trial, ${
                school[SchoolTableFields.NAME]
              } trial enrollment, ${
                school[SchoolTableFields.NAME]
              } trial membership, ${
                school[SchoolTableFields.NAME]
              } trial experience, Free ${
                school[SchoolTableFields.NAME]
              } trial session, ${
                school[SchoolTableFields.NAME]
              } trial package, ${
                school[SchoolTableFields.NAME]
              } trial class details, ${
                school[SchoolTableFields.NAME]
              } trial benefits, Try before you join`}
            />
          </>
        }
      />
      <Page school={school}>
        <div className="mt-10 max-w-md my-0 mx-auto">
          {router.query?.success !== "" ? (
            <>
              <h2 className="text-4xl text-center mb-5">
                Sign up to try a week of classes absolutely free.
              </h2>
              <form
                onSubmit={onSubmit}
                className="w-full my-1"
                autoComplete="off"
              >
                <Input
                  name={CustomerTableColumns.NAME}
                  placeholder="Full name"
                />
                <Input
                  name={CustomerTableColumns.EMAIL}
                  placeholder="Email"
                  type="email"
                />
                {school[SchoolTableFields.MARTIAL_ARTS]?.length > 1 ? (
                  <div className={inputWrapperStyle}>
                    <label
                      htmlFor={CustomerTableColumns.INTEREST}
                      className="text-xs text-dojogray-600 w-full"
                    >
                      {`I am interested in`.toUpperCase()}
                    </label>
                    <select
                      name={CustomerTableColumns.INTEREST}
                      className={`bg-transparent outline-none w-full transform -translate-x-1`}
                      required
                    >
                      <option disabled></option>
                      {school[SchoolTableFields.MARTIAL_ARTS].map(
                        (martialArt, key) => (
                          <option value={martialArt} key={key}>
                            {martialArt}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                ) : (
                  <input
                    type="hidden"
                    value={
                      school[SchoolTableFields.MARTIAL_ARTS]?.length
                        ? school[SchoolTableFields.MARTIAL_ARTS][0]
                        : "unknown"
                    }
                    name={CustomerTableColumns.INTEREST}
                  />
                )}
                <div className="trial">
                  <CustomizePhoneNumberInput
                    personNumber={personNumber}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    setPersonNumber={setPersonNumber}
                  />
                </div>
                <Input
                  as="textarea"
                  name={CustomerTableColumns.NOTES}
                  placeholder="Additional Information"
                />

                <button
                  className="mt-5 py-4 w-full bg-dojored uppercase text-xl font-black disabled:opacity-50"
                  disabled={sending}
                >
                  {sending ? "sending..." : "SIGN ME UP"}
                </button>
              </form>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-4xl text-center mb-3">You are all set!</h2>
              <p className="text-sm my-0 mx-auto max-w-xs px-10 text-center mb-10 text-dojogray-100">
                Check your inbox, we just sent your one-week pass. See you soon.
              </p>
              <div className="flex border p-4 border-dojogray-600">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 font-normal"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="ml-3 h-full flex flex-col justify-between">
                    <h3 className="text-sm uppercase opacity-50 font-black mt-1">
                      School Location
                    </h3>
                    <p className="text-sm">
                      {school[SchoolTableFields.FULL_ADDRESS]}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Page>
    </>
  ) : (
    <></>
  );
}