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
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddBrokerageDialog from "./AddBrokerageDialog";

// Map bank codes to logo files that exist in public/logos
const bankLogoMap = {
  TD: "/logos/TD.png",
  td: "/logos/TD.png",
  RBC: "/logos/rbc.png",
  rbc: "/logos/rbc.png",
  Questrade: "/logos/questrade.png",
  questrade: "/logos/questrade.png",
  Wealthsimple: "/logos/wealthsimple.png",
  wealthsimple: "/logos/wealthsimple.png",
  CIBC: "/logos/CIBC.png",
  cibc: "/logos/CIBC.png",
  NBDB: "/logos/nbdb.png",
  nbdb: "/logos/nbdb.png",
  Scotia: "/logos/scotia.png",
  scotia: "/logos/scotia.png",
  BMO: "/logos/bmo.png",
  bmo: "/logos/bmo.png",
  charles: "/logos/charles.png",
  chase: "/logos/chase.png",
  etrade: "/logos/etrade.png",
  fidelity: "/logos/fidelity.png",
  ibkr: "/logos/ibkr.png",
  merrill: "/logos/merrill.png",
  robinhood: "/logos/robinhood.png",
  vanguard: "/logos/vanguard.png",
  fargo: "/logos/fargo.png",
};

const logoFromBank = (bank) =>
  bankLogoMap[bank] || bankLogoMap[bank?.toLowerCase?.()] || "/logos/logo_image.png";

export default function BrokeragesAndAccounts() {
  // Get accounts from Zustand store
  const accounts = useAppStore((state) => state.accounts);
  const setAccounts = useAppStore((state) => state.setAccounts);
  const resetStorage = useAppStore((state) => state.resetStorage);
  const brokeragesAndAccounts = useAppStore((state) => state.brokeragesAndAccounts);
  const snapTradeAccounts = useAppStore((state) => state.snapTradeAccounts);

  const [open, setOpen] = useState(false);
  const [snapTradeSuccess, setSnapTradeSuccess] = useState(false);

  // Clear old dummy data from localStorage on component mount
  useEffect(() => {
    if (accounts.length > 0 && brokeragesAndAccounts.length === 0) {
      // Only clear if we have accounts but no brokeragesAndAccounts (likely dummy data)
      resetStorage();
    }
  }, []);

  // Note: Removed auto-loading of dummy data - users start with empty state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleInclude = (accountId) => {
    // Check if this is from the accounts array
    const accountIndex = accounts.findIndex((acc) => acc.id === accountId);
    if (accountIndex !== -1) {
      const updatedAccounts = accounts.map((account) =>
        account.id === accountId ? { ...account, included: !account.included } : account
      );
      setAccounts(updatedAccounts);
    }
    // Note: For brokeragesAndAccounts and snapTradeAccounts,
    // you might need separate update functions
  };

  // Build accounts list purely from brokeragesAndAccounts array
  const manualAccounts = Array.isArray(brokeragesAndAccounts)
    ? brokeragesAndAccounts.map((item) => {
        const accountRaw = String(item.Account || "");
        const [namePart, numberPart] = accountRaw.split(" - ");
        const brokerageName = (namePart || "Unknown Brokerage").trim();
        const accountNum = (numberPart || "").trim();
        return {
          id: accountNum || accountRaw || `brokerage_${Math.random()}`,
          brokerageName,
          brokerageLogo: logoFromBank(item.bank),
          accountType: "Account",
          accountNumber: accountNum,
          balance: 0,
          included: true,
          holdings: [],
        };
      })
    : [];

  const allAccounts = [...manualAccounts, ...(accounts || []), ...(snapTradeAccounts || [])];

  // Group accounts by brokerage (use fallback logo if missing)
  const groupedByBrokerage = allAccounts.reduce((acc, account) => {
    const brokerageName = account.brokerageName;
    if (!acc[brokerageName]) {
      acc[brokerageName] = {
        name: brokerageName,
        logo: account.brokerageLogo || getBrokerageLogo(brokerageName),
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
        {/* Main Content */}
        {brokerages.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="300px"
            textAlign="center"
            p={4}
          >
            <Typography variant="h5" color="text.secondary" mb={2}>
              No Brokerages Connected
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Connect to your brokerage account to view your portfolio and analyze your holdings.
            </Typography>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                backgroundColor: "#344767",
                color: "#fff",
                fontWeight: 500,
                fontSize: 16,
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#2d3c5f",
                },
              }}
            >
              Connect Your First Brokerage
            </Button>
          </Box>
        ) : (
          brokerages.map((brokerage, index) => {
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
          })
        )}
        {brokerages.length > 0 && (
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
              Connect Another Brokerage
            </Button>
          </Box>
        )}
      </ArgonBox>
      <AddBrokerageDialog
        open={open}
        onClose={() => setOpen(false)}
        onSnapTradeSuccess={() => {
          setSnapTradeSuccess(true);
          setTimeout(() => setSnapTradeSuccess(false), 4000);
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
