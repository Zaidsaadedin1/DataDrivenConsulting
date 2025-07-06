import React from "react";
import {
  Container,
  Title,
  Text,
  Tabs,
  Card,
  Group,
  Badge,
  List,
  ThemeIcon,
} from "@mantine/core";
import {
  IconDatabaseEdit,
  IconCloudDataConnection,
  IconShieldLock,
  IconChartLine,
  IconCheck,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const DataServices = () => {
  const { t } = useTranslation("dataServices");

  const coreServices = [
    {
      icon: <IconDatabaseEdit size={18} />,
      title: t("services.data_warehousing.title"),
      description: t("services.data_warehousing.description"),
      features: t("services.data_warehousing.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <IconChartLine size={18} />,
      title: t("services.business_intelligence.title"),
      description: t("services.business_intelligence.description"),
      features: t("services.business_intelligence.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <IconCloudDataConnection size={18} />,
      title: t("services.cloud_solutions.title"),
      description: t("services.cloud_solutions.description"),
      features: t("services.cloud_solutions.features", { returnObjects: true }),
    },
    {
      icon: <IconShieldLock size={18} />,
      title: t("services.data_governance.title"),
      description: t("services.data_governance.description"),
      features: t("services.data_governance.features", { returnObjects: true }),
    },
  ];

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Head>

      <Container size="lg" py="xl">
        <Title order={1} mb="xl">
          {t("title")}
        </Title>

        <Text size="lg" mb="xl">
          {t("subtitle")}
        </Text>

        <Tabs defaultValue="data_warehousing">
          <Tabs.List>
            {coreServices.map((service) => (
              <Tabs.Tab
                key={service.title}
                value={service.title.toLowerCase().replace(/\s+/g, "_")}
                leftSection={service.icon}
              >
                {service.title}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {coreServices.map((service) => (
            <Tabs.Panel
              key={service.title}
              value={service.title.toLowerCase().replace(/\s+/g, "_")}
              pt="xl"
            >
              <Card withBorder>
                <Title order={2} mb="md">
                  {service.title}
                </Title>
                <Text mb="lg">{service.description}</Text>

                <Title order={4} mb="sm">
                  {t("key_features")}
                </Title>
                <List
                  spacing="sm"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="teal" size={20} radius="xl">
                      <IconCheck size={14} />
                    </ThemeIcon>
                  }
                >
                  {(service.features as string[]).map((feature, index) => (
                    <List.Item key={index}>{feature}</List.Item>
                  ))}
                </List>

                <Group mt="xl">
                  <Badge variant="filled" color="blue">
                    {t("expertise_level")}
                  </Badge>
                  <Badge variant="outline">{t("custom_solutions")}</Badge>
                </Group>
              </Card>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Container>
    </>
  );
};

export default DataServices;
