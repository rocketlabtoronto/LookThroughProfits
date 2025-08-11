import React, { useState } from "react";
import ConsentModal from "./ConsentModal";
import { brokerages, isIntegrationAvailable } from "./brokerageData";
import ManualUploadInstructionsModal from "./ManualUploadInstructionsModal";
import SnapTradeConnectModal from "./SnapTradeConnectModal";
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
import { useAppStore } from "../../stores/store";

export default function AddBrokerageDialog({ open, onClose, onSnapTradeSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [country, setCountry] = useState("Canada");
  const [consentOpen, setConsentOpen] = useState(false);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualBrokerage, setManualBrokerage] = useState("");
  const [snapTradeModalOpen, setSnapTradeModalOpen] = useState(false);
  const [snapTradeBrokerage, setSnapTradeBrokerage] = useState("");
  const [snapTradeError, setSnapTradeError] = useState("");
  const [snapTradeLoading, setSnapTradeLoading] = useState(false);

  // For manual upload modal, handle file selection
  const handleManualFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const storeParsed = (result) => {
    const first = result.firstTable || {};
    const accountRaw = String(first.Account || "");
    const [namePart] = accountRaw.split(" - ");
    const brokerageName = (namePart || "").trim();
    const bank = inferBankFromName(brokerageName);
    const accountId = accountRaw; // use full string as ID; can refine if needed

    const holdings = result.secondTable || [];

    // Persist on the element itself
    useAppStore.getState().upsertBrokerageAccount({ Account: accountRaw, bank, holdings });

    // Also maintain per-account and flat legacy stores for backward compatibility
    useAppStore.getState().setAccountHoldingsForAccount(accountId, holdings);
    useAppStore.getState().setAccountHoldings(holdings);
  };

  // For manual upload modal, handle upload
  const handleManualUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    parseBrokerageCsv(selectedFile, (result) => {
      storeParsed(result);
    });
    setManualModalOpen(false);
    setSelectedFile(null);
    onClose();
  };

  // For SnapTrade flow file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    parseBrokerageCsv(file, (result) => {
      storeParsed(result);
    });
  };

  // Infer short bank code from the brokerage display name for logo mapping
  const inferBankFromName = (name) => {
    const n = String(name || "").toLowerCase();
    if (n.includes("td")) return "TD";
    if (n.includes("rbc")) return "rbc";
    if (n.includes("questrade")) return "questrade";
    if (n.includes("wealthsimple")) return "wealthsimple";
    if (n.includes("cibc")) return "cibc";
    if (n.includes("national bank")) return "nbdb";
    if (n.includes("scotia")) return "scotia";
    if (n.includes("bmo")) return "bmo";
    if (n.includes("schwab")) return "charles";
    if (n.includes("chase")) return "chase";
    if (n.includes("etrade") || n.includes("e*trade")) return "etrade";
    if (n.includes("fidelity")) return "fidelity";
    if (n.includes("interactive brokers")) return "ibkr";
    if (n.includes("merrill")) return "merrill";
    if (n.includes("robinhood")) return "robinhood";
    if (n.includes("vanguard")) return "vanguard";
    if (n.includes("wells fargo")) return "fargo";
    return "logo_image"; // default fallback
  };

  const handleConsent = () => {
    setConsentOpen(false);
    onClose();
  };

  // Handle tile click
  const handleBrokerageTileClick = (broker) => {
    if (broker.integration === isIntegrationAvailable.notAvailable) {
      setManualBrokerage(broker.name);
      setManualModalOpen(true);
      setSelectedFile(null);
    } else if (broker.integration === isIntegrationAvailable.snapTrade) {
      setSnapTradeBrokerage(broker.name);
      setSnapTradeModalOpen(true);
    }
  };

  // SnapTradeReact SDK handles the connection, so these callbacks are passed to the modal
  const handleSnapTradeSuccess = (authorizationId) => {
    setSnapTradeModalOpen(false);
    setSnapTradeError("");
    setSnapTradeLoading(false);
    if (onSnapTradeSuccess) onSnapTradeSuccess(authorizationId);
  };
  const handleSnapTradeError = (error) => {
    setSnapTradeError(error?.detail || "Failed to connect to SnapTrade.");
    setSnapTradeLoading(false);
  };
  const handleSnapTradeExit = () => {
    setSnapTradeModalOpen(false);
    setSnapTradeLoading(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Connect to your Brokerage
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Select your country and brokerage:</Typography>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ fontSize: 16, padding: 6, borderRadius: 6 }}
            >
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 24,
              justifyContent: "center",
            }}
          >
            {brokerages[country].map((broker) => (
              <div
                key={broker.name}
                onClick={() => handleBrokerageTileClick(broker)}
                style={{
                  width: 125,
                  height: 125,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  background: "#fafbfc",
                  cursor: "pointer",
                  boxShadow:
                    broker.integration === isIntegrationAvailable.notAvailable
                      ? "0 0 0 2px #f5a623"
                      : "none",
                  opacity: broker.integration === isIntegrationAvailable.notAvailable ? 0.85 : 1,
                  transition: "box-shadow 0.2s, opacity 0.2s",
                }}
                title={
                  broker.integration === isIntegrationAvailable.notAvailable
                    ? "Manual upload required"
                    : "Connect via API"
                }
              >
                <img
                  src={broker.logo}
                  alt={broker.name}
                  style={{ width: 100, height: 100, objectFit: "contain", marginBottom: 4 }}
                />
                <span style={{ fontSize: 12, textAlign: "center", color: "#333" }}>
                  {broker.name}
                </span>
              </div>
            ))}
          </div>
          {/* Only show file input for SnapTrade brokerages (if needed) */}
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "none" }}
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
        {/* No Cancel or Upload buttons needed here anymore */}
      </Dialog>
      <SnapTradeConnectModal
        open={snapTradeModalOpen}
        onClose={() => setSnapTradeModalOpen(false)}
        brokerageName={snapTradeBrokerage}
        error={snapTradeError}
        loading={snapTradeLoading}
        onSuccess={handleSnapTradeSuccess}
        onError={handleSnapTradeError}
        onExit={handleSnapTradeExit}
      />
      <ConsentModal open={consentOpen} onConsent={handleConsent} />
      <ManualUploadInstructionsModal
        open={manualModalOpen}
        onClose={() => setManualModalOpen(false)}
        brokerageName={manualBrokerage}
        onFileChange={handleManualFileChange}
        onUpload={handleManualUpload}
        selectedFile={selectedFile}
      />
    </>
  );
}

AddBrokerageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSnapTradeSuccess: PropTypes.func,
};
