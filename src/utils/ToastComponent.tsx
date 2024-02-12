import React, { useState, useEffect, SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomToast = ({
  message,
  severity,
}: {
  message: string;
  severity: Severity;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message && severity) {
      setOpen(true);
    }
  }, [message, severity]);

  const handleClose = (event: Event | SyntheticEvent<any, Event>) => {
    // Cast the event to any to access the reason
    const reason = (event as any).reason as string | undefined;

    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomToast;
