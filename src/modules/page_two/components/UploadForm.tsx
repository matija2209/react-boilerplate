import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeApiOneRequest } from "../../../lib/axios";
import {
  createDocument,
  createRecordingsDocument,
  uploadFileToStorage,
} from "../../../lib/firebase";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../../hooks/useIsMobile";
import FileUpload from "./DragZone";
import MobileFileInput from "./MobileFileInput";

function UploadForm() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const watchFileInput = watch("fileInput");

  const handleFormSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const recording = data.fileInput;
      const formData = new FormData();
      formData.append(
        "recording",
        new Blob([recording], { type: recording.type }),
        "recording"
      );
      const url: string = await uploadFileToStorage({
        file: recording,
        path: `recordings/${recording.name}`,
      }); // Image URL
      const payload = {
        url,
        fileName: recording.name,
        type: "recording",
        patientFirstName: data.patientFirstName,
        patientLastName: data.patientLastName,
        checkupTime: data.checkupTime,
      };
      const document = await createRecordingsDocument({
        fileName: recording.name,
        data: payload,
      });
      navigate(`/recordings/${document.id}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: isMobile ? "100%" : "50%",
      }}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          width: "100%",
        }}
      >
        <Controller
          name="patientFirstName"
          control={control}
          defaultValue=""
          rules={{ required: "First name required" }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: isMobile ? "100%" : "50%" }}
              disabled={isLoading}
              label="Patient First Name"
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="patientLastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isLoading}
              sx={{ width: isMobile ? "100%" : "50%" }}
              label="Patient Last name"
              variant="outlined"
              required
            />
          )}
        />
      </Box>

      <Controller
        name="checkupTime"
        control={control}
        defaultValue={new Date().toISOString().slice(0, 16)}
        render={({ field }) => (
          <TextField
            type="datetime-local"
            disabled={isLoading}
            {...field}
            label="Date of checkup"
            variant="outlined"
          />
        )}
      />
      {isMobile ? (
        <MobileFileInput
          control={control}
          isLoading={isLoading}
          file={watchFileInput}
        ></MobileFileInput>
      ) : (
        <FileUpload control={control} isLoading={isLoading}></FileUpload>
      )}

      <Button
        variant="contained"
        type="submit"
        color="primary"
        sx={{ width: "min-content", textWrap: "nowrap" }}
        disabled={!watchFileInput || isLoading}
        startIcon={isLoading ? <CircularProgress size={24} /> : ""}
      >
        Transcribe
      </Button>
    </Box>
  );
}

export default UploadForm;
