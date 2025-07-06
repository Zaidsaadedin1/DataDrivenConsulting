import React, { useEffect, useState } from "react";
import { Menu, Button } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// Hover sound utility
const playHoverSound = () => {
  const audio = new Audio("/audio/hover.mp3");
  audio.volume = 0.3;
  audio.play().catch((e) => console.log("Hover sound prevented:", e));
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, query } = router;
  const { t } = useTranslation("common");

  const [mounted, setMounted] = useState(false);
  const [lastSoundPlayed, setLastSoundPlayed] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Preload hover sound
    new Audio("/audio/hover.mp3").load();
  }, []);

  const languages = [
    { code: "en", label: t("common:English"), dir: "ltr" },
    { code: "ar", label: t("common:Arabic"), dir: "rtl" },
  ];

  const changeLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Play sound with cooldown
    const now = Date.now();
    if (now - lastSoundPlayed > 200) {
      const audio = new Audio("/sounds/click.mp3");
      audio.volume = 0.3;
      audio.play().catch(console.error);
      setLastSoundPlayed(now);
    }

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
    router.push({ pathname, query }, undefined, { locale: newLocale });
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="subtle"
          leftSection={<IconLanguage size={16} />}
          onMouseEnter={playHoverSound}
        >
          {languages.find((lang) => lang.code === locale)?.label ?? "Language"}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("select_language")}</Menu.Label>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            onClick={() => changeLocale(lang.code)}
            onMouseEnter={playHoverSound}
            dir={lang.dir}
          >
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
