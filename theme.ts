import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "brand",
  primaryShade: 6,
  fontFamily: "var(--open-sans-font), sans-serif",
  headings: {
    fontFamily: "'Playfair Display', serif",
  },
  components: {
    Menu: {
      styles: (theme: {
        colors: { [x: string]: any[]; gray: any[] };
        primaryColor: string | number;
        black: any;
        fontSizes: { sm: any };
      }) => ({
        item: {
          fontFamily: "Oswald, sans-serif",
          color: theme.black,
          fontSize: theme.fontSizes.sm,
          "&:hover": {
            backgroundColor: theme.colors.gray[2], // soft gray hover
          },
        },
      }),
    },
  },
  colors: {
    brand: [
      "#ffffff", // white
      "#f5f5f5",
      "#e5e5e5",
      "#d4d4d4",
      "#a3a3a3",
      "#737373",
      "#525252", // index 6 - primary shade (dark gray)
      "#404040",
      "#262626",
      "#000000", // black
    ] as const,
    gray: [
      "#f9fafb",
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#9ca3af",
      "#6b7280",
      "#4b5563",
      "#374151",
      "#1f2937",
      "#111827",
    ] as const,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  defaultGradient: {
    from: "brand.0", // white
    to: "brand.6", // dark gray
    deg: 90,
  },
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 4px 8px rgba(0, 0, 0, 0.15)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.2)",
    xl: "0 12px 48px rgba(0, 0, 0, 0.25)",
  },
};
