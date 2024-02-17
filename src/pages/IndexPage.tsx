import Container from "@mui/material/Container";

import { Box, Paper, Typography } from "@mui/material";
import useSWR, { SWRResponse } from "swr";
import createFetcher from "../utils/fetcher";
import { fetchRecordings } from "../lib/firebase";
import RecordingsTable from "../modules/page_two/components/RecordingsTable";

export default function App() {
  const fetcher = createFetcher(fetchRecordings);
  const { data, error, isLoading }: SWRResponse<any> = useSWR(
    "all_recordings",
    fetcher
  );
  if (!data || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <Container sx={{ py: 2 }}>
      <Box component={"header"} sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          component={"h1"}
          fontWeight={500}
          color="initial"
        >
          Patient Recordings
        </Typography>
        <Typography variant="body1">View all patient recordings.</Typography>
      </Box>
      <Paper>
        <RecordingsTable recordings={data}></RecordingsTable>
      </Paper>
    </Container>
  );
}
