import React from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  List,
  Stack,
} from "@mantine/core";
import {
  IconDatabase,
  IconServer,
  IconCloud,
  IconShieldLock,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const DataWarehousing = () => {
  const { t } = useTranslation("dataWarehousing");

  const features = [
    {
      icon: IconDatabase,
      title: t("features.centralized_storage.title"),
      description: t("features.centralized_storage.description"),
    },
    {
      icon: IconServer,
      title: t("features.scalable_infrastructure.title"),
      description: t("features.scalable_infrastructure.description"),
    },
    {
      icon: IconCloud,
      title: t("features.cloud_solutions.title"),
      description: t("features.cloud_solutions.description"),
    },
    {
      icon: IconShieldLock,
      title: t("features.data_security.title"),
      description: t("features.data_security.description"),
    },
  ];

  const benefits = t("benefits.items", { returnObjects: true }) as string[];

  return (
    <Stack pt={80}>
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

        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl" mb="xl">
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
            {t("benefits.title")}
          </Title>

          <List size="lg" spacing="sm" mb="xl">
            {benefits.map((benefit: string, index: number) => (
              <List.Item key={index}>{benefit}</List.Item>
            ))}
          </List>

          <Title order={3} mb="sm">
            {t("implementation.title")}
          </Title>
          <Text mb="xl">{t("implementation.description")}</Text>

          <Title order={3} mb="sm">
            {t("contact.title")}
          </Title>
          <Text>{t("contact.description")}</Text>
        </div>
      </Container>
    </Stack>
  );
};

export default DataWarehousing;
