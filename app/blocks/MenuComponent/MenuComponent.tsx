import React from "react";
import { Button, Group, Text, Image, Menu, Flex, Box } from "@mantine/core";
import {
  IconLogin,
  IconSettings,
  IconUser,
  IconDashboard,
  IconLogout,
  IconFileAnalytics,
  IconChartLine,
  IconBuildingWarehouse,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useAuth } from "../../contexts/AuthContext";
import { SoundToggle } from "../SoundToggle/SoundToggle";

// Hover sound utility
const playHoverSound = () => {
  const audio = new Audio("/audio/hover.mp3");
  audio.volume = 0.3;
  audio.play().catch((e) => console.log("Hover sound prevented:", e));
};

const MenuComponent = () => {
  const { t, i18n } = useTranslation("menuComponent");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";

  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const isMobileOrTablet = useMediaQuery("(max-width: 1200px)");
  const isSmallMobile = useMediaQuery("(max-width: 480px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const renderAuthMenu = () => (
    <Menu>
      <Menu.Target>
        <Button
          variant="subtle"
          ff="Oswald, sans-serif"
          onMouseEnter={playHoverSound}
        >
          <Group
            gap={2}
            wrap="nowrap"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <IconUser size={12} />
            <Text size="sm">{`${user?.firstName} ${" "} ${
              user?.lastName
            }`}</Text>
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {user?.Roles?.includes("Admin") && (
          <Menu.Item
            onClick={() => router.push(`/${currentLang}/adminDashboard`)}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            ff="Oswald, sans-serif"
            onMouseEnter={playHoverSound}
          >
            <Group gap={2}>
              <IconDashboard size={14} />
              <Text size="sm">{t("admin_dashboard")}</Text>
            </Group>
          </Menu.Item>
        )}

        {user?.Roles?.includes("User") && (
          <Menu.Item
            onClick={() => router.push(`/${currentLang}/profile`)}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            ff="Oswald, sans-serif"
            onMouseEnter={playHoverSound}
          >
            <Group gap={2} wrap="nowrap">
              <IconUser size={14} />
              <Text size="sm">{t("profile")}</Text>
            </Group>
          </Menu.Item>
        )}

        <Menu.Item
          onClick={logout}
          style={{ direction: isRTL ? "rtl" : "ltr" }}
          ff="Oswald, sans-serif"
          onMouseEnter={playHoverSound}
        >
          <Group gap={2}>
            <IconLogout size={14} />
            <Text size="sm">{t("logout")}</Text>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  const mainMenuItems = [
    {
      path: "/data-consulting",
      icon: IconChartLine,
      text: t("data_consulting"),
      en: "Data Consulting",
      ar: "استشارات البيانات",
    },
    {
      path: "/analytics-solutions",
      icon: IconFileAnalytics,
      text: t("analytics_solutions"),
      en: "Analytics Solutions",
      ar: "حلول التحليلات",
    },
    {
      path: "/data-warehousing",
      icon: IconBuildingWarehouse,
      text: t("data_warehousing"),
      en: "Data Warehousing",
      ar: "تخزين البيانات",
    },
    {
      path: "/settings",
      icon: IconSettings,
      text: t("settings_directory"),
      en: "Settings Directory",
      ar: "دليل الإعدادات",
    },
  ];

  const renderMainMenu = () =>
    isMobileOrTablet ? (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            size="12"
            variant="subtle"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            ff="Oswald, sans-serif"
            onMouseEnter={playHoverSound}
          >
            {t("menu")}
          </Button>
        </Menu.Target>
        <Menu.Dropdown ff="Oswald, sans-serif">
          {mainMenuItems.map((item) => (
            <Menu.Item
              key={item.path}
              onClick={() => router.push(`/${currentLang}${item.path}`)}
              style={{ direction: isRTL ? "rtl" : "ltr" }}
              onMouseEnter={playHoverSound}
            >
              <Group align="center">
                <item.icon size={12} />
                <Text size="sm">{item.text}</Text>
              </Group>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    ) : (
      <Group
        wrap="nowrap"
        gap={5}
        style={{
          fontFamily: "Oswald, sans-serif",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
        align="center"
      >
        {mainMenuItems.map((item) => (
          <Button
            key={item.path}
            variant="subtle"
            onClick={() => router.push(`/${currentLang}${item.path}`)}
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            onMouseEnter={playHoverSound}
          >
            <Group align="center">
              <item.icon size={12} />
              <Text size="sm">{item.text}</Text>
            </Group>
          </Button>
        ))}
      </Group>
    );

  const renderAccountMenu = () =>
    isMobileOrTablet ? (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            size="12"
            variant="subtle"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            onMouseEnter={playHoverSound}
          >
            {t("account")}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => router.push(`/${currentLang}/signUp`)}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            onMouseEnter={playHoverSound}
          >
            <Group align="center">
              <IconUser size={12} />
              <Text size="sm">{t("sign_up")}</Text>
            </Group>
          </Menu.Item>
          <Menu.Item
            onClick={() => router.push(`/${currentLang}/login`)}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            onMouseEnter={playHoverSound}
          >
            <Group align="center">
              <IconLogin size={12} />
              <Text size="sm">{t("login")}</Text>
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ) : (
      <Group
        wrap="nowrap"
        gap={5}
        style={{
          fontFamily: "Oswald, sans-serif",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        <Button
          variant="subtle"
          onClick={() => router.push(`/${currentLang}/signUp`)}
          style={{
            fontFamily: "Oswald, sans-serif",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
          onMouseEnter={playHoverSound}
        >
          <Group align="center">
            <IconUser size={12} />
            <Text size="sm">{t("sign_up")}</Text>
          </Group>
        </Button>
        <Button
          variant="subtle"
          onClick={() => router.push(`/${currentLang}/login`)}
          style={{
            fontFamily: "Oswald, sans-serif",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
          onMouseEnter={playHoverSound}
        >
          <Group align="center">
            <IconLogin size={12} />
            <Text size="sm">{t("login")}</Text>
          </Group>
        </Button>
      </Group>
    );

  return (
    <Box
      component="nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)",
        padding: "1rem",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        direction={isRTL ? "row-reverse" : "row"}
        style={{
          padding: isSmallMobile ? "0 8px" : isMobile ? "0 12px" : "0 16px",
          minHeight: isSmallMobile ? "48px" : isMobile ? "56px" : "64px",
          backgroundColor: "transparent",
        }}
        mb={0}
      >
        {isRTL ? (
          <Flex
            align="center"
            gap={isSmallMobile ? "xs" : "sm"}
            direction={isRTL ? "row-reverse" : "row"}
            justify="flex-start"
            style={{ flexShrink: 0 }}
          >
            <SoundToggle />
            <LanguageSwitcher />
            {isAuthenticated ? renderAuthMenu() : renderAccountMenu()}
            {renderMainMenu()}
          </Flex>
        ) : (
          <Flex
            align="center"
            gap={isSmallMobile ? "xs" : "md"}
            justify={isRTL ? "flex-end" : "flex-start"}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ flexShrink: 0 }}
          >
            <Image
              src="/images/transperent-logo.png"
              alt="Logo"
              w={70}
              h={70}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/${currentLang}/`)}
              onMouseEnter={playHoverSound}
            />
          </Flex>
        )}

        {isRTL ? (
          <Image
            src="/images/transperent-logo.png"
            alt="Logo"
            w={70}
            h={70}
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/${currentLang}/`)}
            onMouseEnter={playHoverSound}
          />
        ) : (
          <Flex
            align="center"
            gap={isSmallMobile ? "xs" : "sm"}
            direction={isRTL ? "row-reverse" : "row"}
            justify="flex-end"
            style={{ flexShrink: 0 }}
          >
            {renderMainMenu()}
            {isAuthenticated ? renderAuthMenu() : renderAccountMenu()}
            <LanguageSwitcher />
            <SoundToggle />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default MenuComponent;
