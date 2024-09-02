import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useContext } from "react";
import { SchoolPhoneTypes, SchoolTableFields } from "../models/SchoolModel";
import { SchoolContext } from "./SchoolContext";
import cx from "classnames";
import { ExternalLink } from "./ExternalLink";
import {
  CalendarIcon,
  DirectionsIcon,
  PhoneIcon,
  SMSIcon,
  WeChatIcon,
  WhatsAppIcon,
} from "./Icons";

const formatPhone = (phone: string) => {
  const pattern = phone.match(/\d/g);

  if (pattern) {
    return pattern.join("").trim();
  }

  return "";
};

const linkBaseStyle = "p-4 text-xs uppercase flex flex-col items-center";
const iconClasses = "w-7 mb-2";

function createPhoneLink(
  phoneId: string,
  phoneType: SchoolPhoneTypes = SchoolPhoneTypes.PHONE
) {
  switch (phoneType) {
    case SchoolPhoneTypes.WHATSAPP:
      return (
        <ExternalLink
          className={linkBaseStyle}
          href={`https://wa.me/${formatPhone(phoneId)}`}
        >
          <WhatsAppIcon className={iconClasses} />
          <span>WhatsApp</span>
        </ExternalLink>
      );
    case SchoolPhoneTypes.TELEGRAM:
      return (
        <a className={linkBaseStyle} href={`https://t.me/${phoneId}`}>
          <WhatsAppIcon className={iconClasses} />
          <span>Telegram</span>
        </a>
      );
    case SchoolPhoneTypes.WECHAT:
      return (
        <a className={linkBaseStyle} href={`weixin://dl/chat?${phoneId}`}>
          <WeChatIcon className={iconClasses} />
          <span>WeChat</span>
        </a>
      );
    case SchoolPhoneTypes.SMS:
      return (
        <a className={linkBaseStyle} href={`sms://${formatPhone(phoneId)}`}>
          <SMSIcon className={iconClasses} />
          <span>SMS</span>
        </a>
      );
    default:
      return (
        <a className={linkBaseStyle} href={`tel://${formatPhone(phoneId)}`}>
          <PhoneIcon className={iconClasses} />
          <span>Phone</span>
        </a>
      );
  }
}

export const Footer: React.ComponentType = memo(() => {
  const school = useContext(SchoolContext);
  const slug = school[SchoolTableFields.SLUG];
  const { route } = useRouter();

  return (
    <footer className="h-24 w-full">
      <div className="max-w-screen-md my-0 mx-auto px-5 flex justify-start items-center w-full">
        <Link href={`/${slug}/schedule`} passHref>
          <a
            className={cx(linkBaseStyle, {
              "text-dojored": route.includes("/schedule"),
            })}
          >
            <CalendarIcon className={iconClasses} />
            <span>Schedule</span>
          </a>
        </Link>
        <Link href={`/${slug}/location`} passHref>
          <a
            className={cx(linkBaseStyle, {
              "text-dojored": route.includes("/location"),
            })}
          >
            <DirectionsIcon className={iconClasses} />
            <span>Directions</span>
          </a>
        </Link>
        {school[SchoolTableFields.PHONE] &&
          createPhoneLink(
            school[SchoolTableFields.PHONE],
            school[SchoolTableFields.PHONE_TYPE]
          )}
        <ExternalLink
          className="ml-auto"
          target="_blank"
          rel="noopener noreferrer"
          href="http://bit.ly/dojopluswefunder"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="57" height="27">
            <g fill="none" fillRule="evenodd">
              <path
                fill="#FFFFFE"
                d="M11.696 23.303L9.076 26H4.069v-2.697h5.008V16.71h-6.34V26H.119V14h11.578v9.303zm42.018-6.364v2.247h2.168v1.873l-2.17-.001.001 2.248h-1.806v-2.248h-2.169v-1.871l2.168-.001v-2.247h1.808zM26.346 26h4.962v-2.694h-4.962zm6.38 0V14h2.599v9.303L32.725 26m6.888 0h-2.634V14h11.578v12h-7.628v-2.697h4.995V16.71h-6.312V26zm-23.865 0h-2.634V14h11.578v12h-7.628v-2.697h4.995V16.71h-6.312V26z"
              ></path>
              <text
                fill="#FFF"
                fontFamily="Saira-Medium, Saira"
                fontSize="9"
                fontWeight="400"
                opacity="0.296"
              >
                <tspan x="0" y="10">
                  powered by
                </tspan>
              </text>
            </g>
          </svg>
        </ExternalLink>
      </div>
    </footer>
  );
});
