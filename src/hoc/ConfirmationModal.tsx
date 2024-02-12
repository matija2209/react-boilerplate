// ConfirmationModal.jsx
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";

const ConfirmationModal = (WrappedComponent: React.ComponentType<any>) => {
  return function WithConfirmationModal({
    onConfirm,
    buttonCTAText,
    ...props
  }: {
    onConfirm: () => void;
    buttonCTAText: string;
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
  }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleConfirm = () => {
      onConfirm();
      handleClose();
    };

    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    };

    return (
      <>
        <WrappedComponent {...props} onClick={handleOpen} />
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure?
            </Typography>
            <Typography variant="body1" color="initial">
              This action cannot be undone. Your data will be permanently
              deleted.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleConfirm}
              >
                {buttonCTAText}
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={handleClose}
                sx={{ ml: 1 }}
              >
                Dimiss
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  };
};

export default ConfirmationModal;
