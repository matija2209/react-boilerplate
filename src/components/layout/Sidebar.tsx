import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link, useNavigate } from "react-router-dom";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import useIsMobile from "../../hooks/useIsMobile";
import { Box, Button, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useFirebaseAuth } from "../../contexts/AuthContext";

const Sidebar = ({ width }: { width: number }) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logOut } = useFirebaseAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    setIsSidebarOpen(false);
    await logOut();
    navigate("/login");
  };
  return (
    <>
      <IconButton
        edge="start"
        sx={{
          alignSelf: "flex-start", // Align to the start of the flex container
          mx: "auto",
        }}
        color="inherit"
        aria-label="menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle the drawer
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        sx={{
          width: width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: width,
            boxSizing: "border-box",
            backgroundColor: (theme) => theme.palette.secondary.light,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Distributes space between elements
            height: "100%", // Full viewport height
          },
        }}
        open={isSidebarOpen}
      >
        <Box>
          <Typography
            sx={{ textAlign: "center", mt: 2, color: "white" }}
            variant="h6"
            component="h1"
            color="initial"
          >
            Medical Transcriber
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
            <List>
              {/* Recordings Link */}
              <ListItem
                button
                component={Link}
                to="/"
                onClick={() => setIsSidebarOpen(false)}
              >
                <ListItemIcon>
                  <AudioFileIcon></AudioFileIcon>
                </ListItemIcon>
                <ListItemText primary="Recordings" />
              </ListItem>

              {/* Upload Recording Link */}
              <ListItem
                button
                component={Link}
                to="/upload"
                onClick={() => setIsSidebarOpen(false)}
              >
                <ListItemIcon>
                  <FileUploadIcon></FileUploadIcon>
                </ListItemIcon>
                <ListItemText primary="Upload Recording" />
              </ListItem>
            </List>
            <IconButton
              sx={{ display: isMobile ? "block" : "none" }}
              onClick={() => setIsSidebarOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={() => handleLogOut()}
            >
              <ListItemIcon>
                <LogoutIcon></LogoutIcon>
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
