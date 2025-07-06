// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import WhatWeDo from "../app/components/WhatWeDo/WhatWeDo";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["whatWeDo", "common"])),
    },
  };
};

export default WhatWeDo;
