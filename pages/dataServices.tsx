// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import DataServices from "../app/components/DataServices/DataServices";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "dataServices",
        "common",
      ])),
    },
  };
};

export default DataServices;
