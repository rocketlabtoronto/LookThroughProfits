import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Papa from "papaparse";
import PropTypes from "prop-types";
import { parseBrokerageCsv } from "services/parseBrokerageCsv";
import useAppStore from "store";

export default function AddBrokerageDialog({ open, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);

        parseBrokerageCsv(file, (result) => {
            console.log("First table: ", result.firstTable);
            console.log("Second table: ", result.secondTable);
            // Save data in the Zustand store
            useAppStore.getState().setBrokeragesAndAccounts(result.firstTable);
            useAppStore.getState().setAccountHoldings(result.secondTable);
        });
    };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    console.log("Uploading file:", selectedFile);
    console.log("Parsed data:", parsedData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Add New Brokerage
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          
        </Typography>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
        {selectedFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected file: {selectedFile.name}
          </Typography>
        )}
        {parsedData.length > 0 && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Parsed {parsedData.length} rows.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpload} variant="contained" color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddBrokerageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
