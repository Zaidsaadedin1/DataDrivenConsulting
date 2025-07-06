import React from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import {
  IconChartLine,
  IconDatabase,
  IconReportAnalytics,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const AnalyticsSolutions = () => {
  const { t } = useTranslation("analyticsSolutions");

  const features = [
    {
      icon: IconChartLine,
      title: t("features.advanced_analytics.title"),
      description: t("features.advanced_analytics.description"),
    },
    {
      icon: IconDatabase,
      title: t("features.data_integration.title"),
      description: t("features.data_integration.description"),
    },
    {
      icon: IconReportAnalytics,
      title: t("features.business_intelligence.title"),
      description: t("features.business_intelligence.description"),
    },
    {
      icon: IconTrendingUp,
      title: t("features.predictive_modeling.title"),
      description: t("features.predictive_modeling.description"),
    },
  ];

  return (
    <Stack mt={"50"}>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Head>

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          {t("title")}
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          {t("subtitle")}
        </Text>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl">
          {features.map((feature, index) => (
            <Card key={index} shadow="md" padding="lg" radius="md">
              <ThemeIcon size={60} radius={60} mb="md">
                <feature.icon size={30} />
              </ThemeIcon>
              <Title order={3} mb="sm">
                {feature.title}
              </Title>
              <Text size="sm" c="dimmed">
                {feature.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        <div style={{ marginTop: 50 }}>
          <Title order={2} mb="md">
            {t("case_studies.title")}
          </Title>
          <Text mb="xl">{t("case_studies.description")}</Text>

          <Title order={3} mb="sm">
            {t("contact.title")}
          </Title>
          <Text>{t("contact.description")}</Text>
        </div>
      </Container>
    </Stack>
  );
};

export default AnalyticsSolutions;
