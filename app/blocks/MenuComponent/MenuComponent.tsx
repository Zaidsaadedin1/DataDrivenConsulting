import React, { useState, useEffect } from "react";
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
import { playHoverSound } from "../playHoverSound";
const MenuComponent = () => {
  const { t, i18n } = useTranslation("menuComponent");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const isMobileOrTablet = useMediaQuery("(max-width: 1200px)");
  const isSmallMobile = useMediaQuery("(max-width: 480px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const renderAuthMenu = () => (
    <Menu
      shadow="md"
      styles={{
        dropdown: {
          zIndex: 1001,
          backdropFilter: "none",
        },
      }}
    >
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
      <Menu.Dropdown ff="Oswald, sans-serif">
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
      path: "/dataConsulting",
      icon: IconChartLine,
      text: t("data_consulting"),
    },
    {
      path: "/analyticsSolutions",
      icon: IconFileAnalytics,
      text: t("analytics_solutions"),
    },
    {
      path: "/dataWarehousing",
      icon: IconBuildingWarehouse,
      text: t("data_warehousing"),
    },
    {
      path: "/dataServices",
      icon: IconSettings,
      text: t("dataServices"),
    },
    {
      path: "/whatWeDo",
      icon: IconSettings,
      text: t("what_we_do"),
    },
  ];

  const renderMainMenu = () =>
    isMobileOrTablet ? (
      <Menu
        shadow="md"
        width={200}
        styles={{
          dropdown: {
            zIndex: 1001,
            backdropFilter: "none",
          },
        }}
      >
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
      <Menu
        shadow="md"
        width={200}
        styles={{
          dropdown: {
            zIndex: 1001,
            backdropFilter: "none",
          },
        }}
      >
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
        padding: 0,
        margin: 0,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(4px)",
          zIndex: -1,
        },
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        direction={isRTL ? "row-reverse" : "row"}
        style={(theme) => ({
          padding: 0,
          margin: 0,
          minHeight: isSmallMobile ? "48px" : isMobile ? "56px" : "64px",
          backgroundColor: scrolled ? theme.colors.dark[7] : "transparent",
        })}
        p={0}
      >
        {isRTL ? (
          <Flex
            align="flex-start"
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
              src={
                router.pathname !== "/" && !scrolled
                  ? "/images/transperent-logo.png"
                  : "/images/transperent-white-logo.png"
              }
              alt="Logo"
              w={90}
              h={90}
              style={{
                cursor: "pointer",
                alignSelf: "flex-end",
              }}
              onClick={() => router.push(`/${currentLang}/`)}
              onMouseEnter={playHoverSound}
            />
          </Flex>
        )}

        {isRTL ? (
          <Image
            src={
              router.pathname !== "/" && !scrolled
                ? "/images/transperent-logo.png"
                : "/images/transperent-white-logo.png"
            }
            alt="Logo"
            w={90}
            h={90}
            style={{
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
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
