import React from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Accordion,
  Box,
  Group,
  List,
} from "@mantine/core";
import {
  IconChartLine,
  IconDatabase,
  IconCloud,
  IconShieldLock,
  IconBulb,
  IconRocket,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const WhatWeDo = () => {
  const { t } = useTranslation("whatWeDo");

  const services = [
    {
      icon: IconChartLine,
      title: t("services.data_analytics.title"),
      description: t("services.data_analytics.description"),
      details: t("services.data_analytics.details", { returnObjects: true }),
    },
    {
      icon: IconDatabase,
      title: t("services.data_warehousing.title"),
      description: t("services.data_warehousing.description"),
      details: t("services.data_warehousing.details", { returnObjects: true }),
    },
    {
      icon: IconCloud,
      title: t("services.cloud_solutions.title"),
      description: t("services.cloud_solutions.description"),
      details: t("services.cloud_solutions.details", { returnObjects: true }),
    },
    {
      icon: IconShieldLock,
      title: t("services.data_security.title"),
      description: t("services.data_security.description"),
      details: t("services.data_security.details", { returnObjects: true }),
    },
  ];

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Head>

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md">
          <Group justify="center">
            <IconBulb size={40} />
            {t("title")}
          </Group>
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          {t("subtitle")}
        </Text>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {services.map((service, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <ThemeIcon size={60} radius={60} mb="md">
                <service.icon size={30} />
              </ThemeIcon>
              <Title order={3} mb="sm">
                {service.title}
              </Title>
              <Text size="sm" mb="md">
                {service.description}
              </Text>

              <Accordion variant="separated">
                <Accordion.Item value="details">
                  <Accordion.Control>
                    <Text fw={500}>{t("learn_more")}</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <List spacing="sm">
                      {(service.details as string[]).map((detail, i) => (
                        <List.Item key={i}>{detail}</List.Item>
                      ))}
                    </List>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card>
          ))}
        </SimpleGrid>

        <Box mt={50}>
          <Title order={2} ta="center" mb="md">
            <Group justify="center">
              <IconRocket size={30} />
              {t("approach.title")}
            </Group>
          </Title>
          <Text ta="center" mb="xl" c="dimmed">
            {t("approach.subtitle")}
          </Text>

          <Accordion variant="contained">
            {(
              t("approach.steps", { returnObjects: true }) as {
                title: string;
                description: string;
              }[]
            ).map((step, index) => (
              <Accordion.Item key={index} value={step.title}>
                <Accordion.Control>
                  <Text fw={500}>{step.title}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>{step.description}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
};

export default WhatWeDo;
