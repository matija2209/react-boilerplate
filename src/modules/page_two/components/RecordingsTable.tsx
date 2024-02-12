import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../../hooks/useIsMobile";

interface Recording {
  documentId: string;
  patientLastName: string;
  patientFirstName: string;
  checkupTime: string;
}

interface RecordingsListProps {
  recordings: Recording[];
}

const RecordingsList: React.FC<RecordingsListProps> = ({ recordings }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Date of Visit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordings
            .sort((a, b) => (a.checkupTime < b.checkupTime ? 1 : -1))
            .map((recording) => (
              <TableRow
                key={recording.documentId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  // Add a bottom border to create a gap-like effect
                  "td, th": {
                    borderBottom: "2px solid transparent", // Adjust the color and size as needed
                    paddingBottom: "10px", // Adjust the bottom padding as needed
                  },
                }}
                hover
                onClick={() => navigate(`/recordings/${recording.documentId}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell component="th" scope="row">
                  {`${recording.patientFirstName} ${recording.patientLastName}`}
                </TableCell>
                <TableCell>
                  {new Date(recording.checkupTime).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordingsList;
