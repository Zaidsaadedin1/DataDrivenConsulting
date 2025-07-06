import React, { useEffect, useRef, useState } from "react";
import {
  Title,
  Text,
  Group,
  Button,
  Box,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconDatabase, IconChartLine } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

const homePageVideo = "/videos/video1.mp4";

export const HomePage = () => {
  const { t, i18n } = useTranslation("home");
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const currentLang = i18n.language;
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = true;
      video.controls = false;
      video.muted = true;

      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.play().catch((e) => {
          console.error("Play error:", e);
          document.addEventListener(
            "click",
            () => {
              video.play().catch(console.error);
            },
            { once: true }
          );
        });
      };

      video.addEventListener("canplay", handleCanPlay);
      return () => {
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, []);

  // Responsive font sizes
  const titleSize = isMobile ? 32 : isTablet ? 48 : 60;
  const textSize = isMobile ? "md" : isTablet ? "lg" : "xl";
  const buttonSize = isMobile ? "md" : "xl";
  const iconSize = isMobile ? 60 : 80;
  const iconInnerSize = isMobile ? 30 : 40;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box mt={0} style={{ overflow: "hidden" }}>
      <Box
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={homePageVideo} type="video/mp4" />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Text size="xl" color="white">
              {t("video_not_supported")}
            </Text>
          </div>
        </video>

        {/* Responsive content positioning */}
        <motion.div
          initial="hidden"
          animate={isVideoLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          style={{
            position: "absolute",
            right: isMobile ? "5%" : "10%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: isMobile ? "90%" : isTablet ? "70%" : "50%",
            maxWidth: "600px",
            textAlign: "right",
            padding: isMobile ? "0 10px" : "0",
          }}
        >
          <motion.div variants={itemVariants}>
            <Group justify="flex-end" mb={isMobile ? "md" : "xl"}>
              <ThemeIcon size={iconSize} radius="xl" variant="white">
                <IconDatabase size={iconInnerSize} />
              </ThemeIcon>
            </Group>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Title
              order={1}
              size={titleSize}
              fw={900}
              c="white"
              mb={isMobile ? "sm" : "md"}
              style={{ textAlign: "right", lineHeight: 1.2 }}
            >
              {t("hero_title")}
            </Title>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Text
              size={textSize}
              c="white"
              mb={isMobile ? "lg" : "xl"}
              style={{
                textAlign: "right",
                lineHeight: 1.5,
              }}
            >
              {t("hero_subtitle")}
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Group justify="flex-end" gap="lg" mb={isMobile ? 40 : 60}>
              <Button
                size={buttonSize}
                variant="white"
                leftSection={<IconChartLine size={isMobile ? 20 : 24} />}
                onClick={() => router.push(`/${currentLang}/dataConsulting`)}
              >
                {t("request_consultation")}
              </Button>
            </Group>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
};
