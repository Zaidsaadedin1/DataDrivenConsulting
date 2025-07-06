// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import DataConsulting from "../app/components/DataConsulting/DataConsulting";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "dataConsulting",
        "menuComponent",
        "footer",
      ])),
    },
  };
};

export default DataConsulting;
