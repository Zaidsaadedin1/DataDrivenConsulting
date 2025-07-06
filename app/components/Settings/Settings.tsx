import React from "react";
import {
  Container,
  Title,
  Text,
  Tabs,
  Card,
  Switch,
  Group,
} from "@mantine/core";
import {
  IconSettings,
  IconUser,
  IconBell,
  IconLanguage,
  IconShieldLock,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const Settings = () => {
  const { t } = useTranslation("settings");

  const accountSettings = [
    { label: t("account.email_notifications"), value: false },
    { label: t("account.two_factor_auth"), value: true },
    { label: t("account.activity_reports"), value: true },
  ];

  const privacySettings = [
    { label: t("privacy.data_collection"), value: true },
    { label: t("privacy.personalized_ads"), value: false },
    { label: t("privacy.location_tracking"), value: false },
  ];

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
      </Head>

      <Container size="lg" py="xl">
        <Title order={1} mb="xl">
          <Group>
            <IconSettings size={30} />
            {t("title")}
          </Group>
        </Title>

        <Tabs defaultValue="account">
          <Tabs.List>
            <Tabs.Tab value="account" leftSection={<IconUser size={18} />}>
              {t("account.title")}
            </Tabs.Tab>
            <Tabs.Tab
              value="notifications"
              leftSection={<IconBell size={18} />}
            >
              {t("notifications.title")}
            </Tabs.Tab>
            <Tabs.Tab value="language" leftSection={<IconLanguage size={18} />}>
              {t("language.title")}
            </Tabs.Tab>
            <Tabs.Tab
              value="privacy"
              leftSection={<IconShieldLock size={18} />}
            >
              {t("privacy.title")}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="account" pt="xl">
            <Title order={2} mb="md">
              {t("account.section_title")}
            </Title>
            <Card withBorder>
              {accountSettings.map((setting, index) => (
                <Group key={index} justify="space-between" mb="md">
                  <Text>{setting.label}</Text>
                  <Switch defaultChecked={setting.value} />
                </Group>
              ))}
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="notifications" pt="xl">
            <Title order={2} mb="md">
              {t("notifications.section_title")}
            </Title>
            <Text mb="xl">{t("notifications.description")}</Text>
            <Card withBorder>
              <Text c="dimmed">{t("notifications.coming_soon")}</Text>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="language" pt="xl">
            <Title order={2} mb="md">
              {t("language.section_title")}
            </Title>
            <Text mb="xl">{t("language.description")}</Text>
            <Card withBorder>
              <Text c="dimmed">{t("language.coming_soon")}</Text>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="privacy" pt="xl">
            <Title order={2} mb="md">
              {t("privacy.section_title")}
            </Title>
            <Card withBorder>
              {privacySettings.map((setting, index) => (
                <Group key={index} justify="space-between" mb="md">
                  <Text>{setting.label}</Text>
                  <Switch defaultChecked={setting.value} />
                </Group>
              ))}
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default Settings;
