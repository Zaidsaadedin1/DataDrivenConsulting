// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import DataWarehousing from "../app/components/DataWarehousing/DataWarehousing";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "dataWarehousing",
        "common",
      ])),
    },
  };
};

export default DataWarehousing;
