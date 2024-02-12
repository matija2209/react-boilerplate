import { ReactJSXElementChildrenAttribute } from "@emotion/react/types/jsx-namespace";
import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useIsMobile();
  const drawerWidth = isMobile ? 240 : 240; // Width of the sidebar
  return (
    <Box sx={{ display: isMobile ? "block" : "flex" }}>
      <Sidebar width={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
