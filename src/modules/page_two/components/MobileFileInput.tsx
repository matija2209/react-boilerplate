import { Button, FormControl, InputLabel } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const MobileFileInput = ({
  control,
  isLoading,
  file,
}: {
  control: any;
  isLoading: boolean;
  file: any;
}) => {
  return (
    <Controller
      name="fileInput"
      control={control}
      defaultValue=""
      render={({ field: { onChange, onBlur, name, ref } }) => (
        <FormControl variant="standard" fullWidth margin="normal">
          {/* <InputLabel htmlFor="file-input">Upload File</InputLabel> */}
          <input
            id="file-input"
            ref={ref}
            type="file"
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.files && e.target.files[0])} // Update the form state with the File object
            accept=".mp3, .m4a"
            style={{ display: "none" }}
          />
          <Button variant="outlined" component="span" fullWidth>
            <label htmlFor="file-input">Add Recording</label>
          </Button>
          <p>Selected file: {file ? file.name : "No file selected"}</p>
        </FormControl>
      )}
    />
  );
};

export default MobileFileInput;
