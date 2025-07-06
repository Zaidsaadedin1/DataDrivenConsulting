import React from "react";
import { Switch, Group, useMantineTheme, Tooltip } from "@mantine/core";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useSound } from "../../contexts/SoundContext";

export const SoundToggle = () => {
  const { isSoundOn, toggleSound } = useSound();
  const theme = useMantineTheme();

  return (
    <Tooltip
      label={isSoundOn ? "Mute background sound" : "Unmute background sound"}
    >
      <Group>
        <Switch
          size="md"
          checked={isSoundOn}
          onChange={toggleSound}
          onLabel={<IconVolume size="1rem" color={theme.colors.blue[6]} />}
          offLabel={<IconVolumeOff size="1rem" color={theme.colors.gray[6]} />}
        />
      </Group>
    </Tooltip>
  );
};
