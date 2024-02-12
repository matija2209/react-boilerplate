import { useNavigate, useParams } from "react-router-dom";
import createFetcher from "../utils/fetcher";
import { deleteRecording, fetchRecording } from "../lib/firebase";
import useSWR, { SWRResponse } from "swr";
import {
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import useIsMobile from "../hooks/useIsMobile";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../hoc/ConfirmationModal";
// components/RecordingDetails.js (or .tsx if using TypeScript)
const RecordingDetails = () => {
  // You can access the recording ID from the URL params
  const { id } = useParams();
  const isMobile = useIsMobile();

  if (!id) return <div>use correct recording</div>;
  const fetcher = createFetcher(fetchRecording);
  const navigate = useNavigate();

  // Fetch from Firebase using SWR
  const { data, error, isLoading } = useSWR<any>(`recording-${id}`, () =>
    fetcher(id)
  );
  const IconButtonWithConfirmation = ConfirmationModal(IconButton);

  const handleDeleteRecording = async () => {
    try {
      await deleteRecording(id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "2rem",
        py: 2,
      }}
    >
      <Box sx={{ width: isMobile ? "100%" : "75%" }}>
        <IconButton
          sx={{ mb: 0.5 }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIosIcon></ArrowBackIosIcon>
          <Typography variant="body1" color="initial">
            Back
          </Typography>
        </IconButton>

        <IconButtonWithConfirmation
          aria-label="delete"
          sx={{ color: "darkred", mt: 1 }}
          onConfirm={handleDeleteRecording}
          buttonCTAText="Delete"
        >
          <DeleteIcon />
          <Typography
            sx={{ textTransform: "uppercase", color: "darkred" }}
            variant="body1"
            color="initial"
          >
            delete
          </Typography>
        </IconButtonWithConfirmation>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "100%" : "25%",
        }}
      >

      </Box>
    </Container>
  );
};

export default RecordingDetails;
