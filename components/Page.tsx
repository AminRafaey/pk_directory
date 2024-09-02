import { memo, ReactNode } from "react";
import { SchoolTableData } from "../models/SchoolModel";
import styles from "../styles/Partner.module.scss";
import { Footer } from "./Footer";
import { SchoolContext } from "./SchoolContext";
import { TopBar } from "./TopBar";
import cx from "classnames";

export interface PageComponentProps {
  school: SchoolTableData;
  topBarChildren?: ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
  children?: React.ReactNode;
}

export const Page: React.ComponentType<PageComponentProps> = memo(
  ({ children, school, topBarChildren, fullWidth, noPadding }) => (
    <SchoolContext.Provider value={school}>
      <div className={styles.container}>
        <TopBar children={topBarChildren} />
        <main className={styles.main} id="main">
          <div
            className={cx("h-full", {
              "max-w-full": fullWidth,
              "max-w-screen-md my-0 mx-auto py-0": !fullWidth,
              "px-5": !noPadding,
            })}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </SchoolContext.Provider>
  )
);
