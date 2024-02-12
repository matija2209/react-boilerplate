import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, IconButton, Typography } from "@mui/material";

const FileUpload = ({
  control,
  isLoading,
}: {
  control: any;
  isLoading: boolean;
}) => {
  const [draggedFileName, setDraggedFileName] = useState("");

  // Handle file rejections

  return (
    <Controller
      name="fileInput"
      control={control}
      defaultValue=""
      render={({ field: { onChange, onBlur, ref } }) => {
        const onDrop = (acceptedFiles: any) => {
          if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            onChange(file); // Notify React Hook Form of the change
            setDraggedFileName(file.name); // Update file name state
          }
        };
        const { getRootProps, getInputProps, isDragActive, fileRejections } =
          useDropzone({
            accept: {
              "audio/mpeg": [".mp3"],
              "audio/x-m4a": [".m4a"],
              "audio/wav": [".wav"],
            },
            maxSize: 20000000,
            onDrop,
          });

        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > 20000000;
        return (
          <Box
            {...getRootProps()}
            sx={{ border: "2px dashed gray", p: 2, textAlign: "center" }}
          >
            <input
              {...getInputProps({
                onBlur,
                disabled: isLoading,
                onChange: (e) => {
                  const file = e.target.files && e.target.files[0];
                  onChange(file); // Update the form state with the File object
                  setDraggedFileName(file?.name ?? ""); // Update file name state
                },
                ref,
              })}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <IconButton
                disabled={isLoading}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyItems: "center",
                  mx: "auto",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <CloudUploadIcon />
                )}
                <Typography variant="body1" color="initial">
                  {isDragActive
                    ? "Drop the file here..."
                    : "Click to upload or drag and drop"}
                </Typography>
              </IconButton>
              {draggedFileName && (
                <Typography sx={{ mt: 2 }}>
                  Selected file: {draggedFileName}
                </Typography>
              )}
            </label>
            {isFileTooLarge && (
              <Typography color="error">
                File is too large. Max size is 20MB.
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};

export default FileUpload;
