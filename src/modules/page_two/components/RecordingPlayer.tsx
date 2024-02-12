import React, { useState, useRef, useEffect } from "react";
import { IconButton, Slider, Box, Typography, Popover } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const AudioPlayer = ({ url }: { url: string }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const audioRef = useRef(new Audio(url));
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleVolumeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const togglePlayPause = () => {
    const prevValue = playing;
    setPlaying(!prevValue);
    if (prevValue) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (event: any, newValue: any) => {
    setVolume(newValue);
    audioRef.current.volume = newValue / 100;
  };

  const handleSeekChange = (event: any, newValue: any) => {
    setCurrentTime(newValue);
    setSeeking(true);
  };

  const handleSeekCommit = (event: any, newValue: any) => {
    audioRef.current.currentTime = newValue;
    setSeeking(false);
    if (!playing) {
      audioRef.current.pause();
    }
  };

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  // ...

  // Inside your component's return statement, replace the time display with:
  <Typography variant="body2">
    {formatTime(currentTime)} / {formatTime(duration)}
  </Typography>;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 0,
        }}
      >
        <IconButton onClick={togglePlayPause}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={handleVolumeClick}>
          <VolumeUpIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 2,
              overflow: "hidden",
              width: "100%",
              height: 100,
              display: "flex",
              alignItems: "center",
            }}
          >
            {" "}
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              orientation="vertical"
              min={0}
              max={100}
              sx={{ height: "100%" }}
            />
          </Box>
        </Popover>
      </Box>
      <Slider
        sx={{ width: "80%" }}
        min={0}
        max={duration}
        value={seeking ? currentTime : audioRef.current.currentTime}
        onChange={handleSeekChange}
        onChangeCommitted={handleSeekCommit}
        aria-labelledby="audio-seek-slider"
      />
      <Typography variant="body2">
        {formatTime(currentTime)} / {formatTime(duration)}
      </Typography>
    </Box>
  );
};

export default AudioPlayer;
