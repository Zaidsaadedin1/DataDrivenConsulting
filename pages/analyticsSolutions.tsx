// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import AnalyticsSolutions from "../app/components/AnalyticsSolutions/AnalyticsSolutions";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "analyticsSolutions",
        "common",
      ])),
    },
  };
};

export default AnalyticsSolutions;
