import React, { useEffect, useRef, useState } from "react";
import { Title, Text, Group, Button, Box, ThemeIcon } from "@mantine/core";
import { IconDatabase, IconChartLine } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const homePageVideo = "/videos/video1.mp4";

export const HomePage = () => {
  const { t, i18n } = useTranslation("home");
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const currentLang = i18n.language;

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
          height: "100vh", // Full viewport height
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

        {/* Overlay content - always aligned to right */}
        <motion.div
          initial="hidden"
          animate={isVideoLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          style={{
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: "50%",
            maxWidth: "600px",
            textAlign: "right",
          }}
        >
          <motion.div variants={itemVariants}>
            <Group justify="flex-end" mb="xl">
              <ThemeIcon size={80} radius="xl" variant="white">
                <IconDatabase size={40} />
              </ThemeIcon>
            </Group>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Title
              order={1}
              size={60}
              fw={900}
              c="white"
              mb="md"
              style={{ textAlign: "right" }}
            >
              {t("hero_title")}
            </Title>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Text size="xl" c="white" mb="xl" style={{ textAlign: "right" }}>
              {t("hero_subtitle")}
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Group justify="flex-end" gap="lg" mb={60}>
              <Button
                size="xl"
                variant="white"
                leftSection={<IconChartLine size={24} />}
                onClick={() => router.push(`/${currentLang}/contact`)}
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
