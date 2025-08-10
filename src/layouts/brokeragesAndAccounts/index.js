import React, { useState, useEffect } from "react";
import { useAppStore } from "stores/store";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddBrokerageDialog from "./AddBrokerageDialog"; // adjust the path as needed

export default function BrokeragesAndAccounts() {
  // Get accounts from Zustand store
  const accounts = useAppStore((state) => state.accounts);
  const setAccounts = useAppStore((state) => state.setAccounts);
  const loadDummyData = useAppStore((state) => state.loadDummyData);
  const clearData = useAppStore((state) => state.clearData);

  const [open, setOpen] = useState(false);
  const [snapTradeSuccess, setSnapTradeSuccess] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Load dummy data on component mount if no accounts exist
  useEffect(() => {
    if (accounts.length === 0) {
      loadDummyData();
    }
  }, [accounts.length, loadDummyData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleInclude = (accountId) => {
    const updatedAccounts = accounts.map((account) =>
      account.id === accountId ? { ...account, included: !account.included } : account
    );
    setAccounts(updatedAccounts);
  };

  // Group accounts by brokerage
  const groupedByBrokerage = accounts.reduce((acc, account) => {
    const brokerageName = account.brokerageName;
    if (!acc[brokerageName]) {
      acc[brokerageName] = {
        name: brokerageName,
        logo: account.brokerageLogo,
        accounts: [],
      };
    }
    acc[brokerageName].accounts.push(account);
    return acc;
  }, {});

  const brokerages = Object.values(groupedByBrokerage);

  const computeSummary = (accounts) => {
    const linked = accounts.filter((a) => a.included);
    const linkedCount = linked.length;
    const totalCount = accounts.length;
    const linkedBalance = linked.reduce((sum, a) => sum + a.balance, 0);
    return { linkedCount, totalCount, linkedBalance };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {/* Debug Section */}
        <Box mb={3} p={2} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Data Management</Typography>
            <Button onClick={() => setShowDebug(!showDebug)} variant="outlined" size="small">
              {showDebug ? "Hide" : "Show"} Debug Info
            </Button>
          </Box>

          {showDebug && (
            <Box mt={2} p={2} sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Current Data State:
              </Typography>
              <Typography variant="body2" component="pre" sx={{ fontSize: 12, overflow: "auto" }}>
                {JSON.stringify(
                  {
                    totalAccounts: accounts.length,
                    brokerages: Object.keys(groupedByBrokerage),
                    accounts: accounts.map((acc) => ({
                      id: acc.id,
                      brokerage: acc.brokerageName,
                      type: acc.accountType,
                      balance: acc.balance,
                      included: acc.included,
                      holdingsCount: acc.holdings?.length || 0,
                    })),
                  },
                  null,
                  2
                )}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Main Content */}
        {brokerages.map((brokerage, index) => {
          const { linkedCount, totalCount, linkedBalance } = computeSummary(brokerage.accounts);
          return (
            <Accordion key={`${brokerage.name}-${index}`}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" flexDirection="column" width="100%">
                  <Box display="flex" alignItems="center" gap={1}>
                    <img
                      src={brokerage.logo}
                      alt={`${brokerage.name} logo`}
                      style={{ height: 48 }}
                    />
                    <Typography variant="h6">{brokerage.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {linkedCount} of {totalCount} accounts linked | Linked total: $
                    {linkedBalance.toLocaleString()}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {brokerage.accounts.map((account) => (
                    <ListItem key={account.id} divider>
                      <Checkbox
                        checked={account.included}
                        onChange={() => toggleInclude(account.id)}
                      />
                      <ListItemText
                        primary={`${account.accountType} | #${account.accountNumber}`}
                        secondary={`Balance: $${account.balance.toLocaleString()} | Holdings: ${
                          account.holdings?.length || 0
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box mt={1}>
                  <Button color="error" variant="outlined" size="small">
                    Unlink Brokerage
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleOpen}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderColor: "#000",
              fontWeight: 500,
              fontSize: 16,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#000",
                color: "#000",
              },
              minWidth: 200,
            }}
          >
            Connect to Brokerage
          </Button>
        </Box>
      </ArgonBox>
      <AddBrokerageDialog
        open={open}
        onClose={() => setOpen(false)}
        onSnapTradeSuccess={() => {
          setSnapTradeSuccess(true);
          setTimeout(() => setSnapTradeSuccess(false), 4000);
          // Optionally: trigger a refresh of accounts here
        }}
      />
      {snapTradeSuccess && (
        <Box mt={2}>
          <Typography color="success.main">SnapTrade connection successful!</Typography>
        </Box>
      )}
      <Footer />
    </DashboardLayout>
  );
}
