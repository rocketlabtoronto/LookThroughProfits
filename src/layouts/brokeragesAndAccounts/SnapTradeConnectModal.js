import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export default function SnapTradeConnectModal({ open, onClose, brokerageName, onConnect }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Connect to SnapTrade
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Integration is available for <b>{brokerageName}</b> via SnapTrade.
        </Typography>
        <Typography gutterBottom>
          Click the button below to securely connect your account using SnapTrade.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConnect} variant="contained" color="primary">
          Connect to SnapTrade
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SnapTradeConnectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  brokerageName: PropTypes.string.isRequired,
  onConnect: PropTypes.func.isRequired,
};
