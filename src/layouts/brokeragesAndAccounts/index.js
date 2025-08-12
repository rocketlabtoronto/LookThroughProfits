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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkIcon from "@mui/icons-material/Link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsightsIcon from "@mui/icons-material/Insights";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddBrokerageDialog from "./AddBrokerageDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
  const unlinkBrokerage = useAppStore((state) => state.unlinkBrokerage);

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
        const holdings = Array.isArray(item.accountHoldings)
          ? item.accountHoldings
          : Array.isArray(item.holdings)
          ? item.holdings
          : [];
        const balance = holdings.reduce((sum, h) => {
          const qty = parseFloat(h.Quantity ?? h.shares ?? 0);
          const price = parseFloat(h.currentPrice ?? 0);
          const mv = h.marketValue != null ? parseFloat(h.marketValue) : qty * price;
          return sum + (isNaN(mv) ? 0 : mv);
        }, 0);
        return {
          id: accountNum || accountRaw || `brokerage_${Math.random()}`,
          brokerageName,
          brokerageLogo: logoFromBank(item.bank),
          accountType: "Account",
          accountNumber: accountNum,
          balance,
          included: true,
          holdings,
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
        logo: account.brokerageLogo || logoFromBank(account.bank),
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

  // Logos that are roughly square and need a visual scale boost
  const squareLogoBoost = new Set([
    "/logos/CIBC.png",
    "/logos/TD.png",
    "/logos/rbc.png",
    "/logos/bmo.png",
    "/logos/nbdb.png",
    "/logos/scotia.png",
    "/logos/ibkr.png",
    "/logos/fidelity.png",
    "/logos/etrade.png",
    "/logos/robinhood.png",
    "/logos/vanguard.png",
    "/logos/merrill.png",
    "/logos/charles.png",
    "/logos/chase.png",
    "/logos/questrade.png",
  ]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        {/* Main Content */}
        {brokerages.length === 0 ? (
          // Enhanced Empty State
          <Box px={{ xs: 1, md: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                mb: 4,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.primary.dark}10)`,
              }}
            >
              {/* subtle background accent */}
              <Box
                sx={{
                  position: "absolute",
                  top: -60,
                  right: -80,
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: (theme) => `${theme.palette.primary.main}14`,
                  filter: "blur(6px)",
                }}
              />
              <Stack spacing={4} position="relative">
                <Box>
                  <Typography variant="h4" fontWeight={600} gutterBottom>
                    Invest Like an Owner. See Your Look‑Through Earnings.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={400}
                    sx={{ maxWidth: 900, lineHeight: 1.55, mb: 1 }}
                  >
                    We aggregate the net earnings of the businesses you own so you move beyond price
                    watching and start compounding intelligently.
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: 960, lineHeight: 1.55 }}
                >
                  Connect your brokerage to instantly unify holdings across accounts, surface your
                  proportional share of revenue and profit, and focus decisions on business
                  value—not stock price volatility. This is your look‑through earnings dashboard:
                  invest like a business owner, not a speculator.
                </Typography>
                <Grid container spacing={4}>
                  {[
                    {
                      title: "1. Secure or Manual",
                      desc: "Use secure connection (when enabled) or upload a simple CSV export.",
                      Icon: LinkIcon,
                    },
                    {
                      title: "2. Normalize Holdings",
                      desc: "We standardize symbols, quantities & values across institutions.",
                      Icon: CloudUploadIcon,
                    },
                    {
                      title: "3. Look‑Through Views",
                      desc: "Instant consolidated exposure & statement‑style analytics.",
                      Icon: InsightsIcon,
                    },
                  ].map(({ title, desc, Icon }, i) => (
                    <Grid key={i} item xs={12} md={4}>
                      <Stack spacing={1.5} direction="row" alignItems="flex-start">
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: (theme) => `${theme.palette.primary.main}12`,
                            boxShadow: (theme) => `0 2px 4px ${theme.palette.primary.main}1F`,
                          }}
                        >
                          <Icon color="primary" fontSize="small" />
                        </Box>
                        <Box>
                          <Typography fontWeight={600}>{title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {desc}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2.5}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleOpen}
                    sx={{
                      background: "linear-gradient(90deg,#2e7d32,#43a047)",
                      fontWeight: 600,
                      px: 4,
                      py: 1.8,
                      fontSize: 16,
                      borderRadius: 3,
                      textTransform: "none",
                      letterSpacing: 0.3,
                      boxShadow: "0 6px 18px rgba(46,125,50,0.35)",
                      transition: "all .25s",
                      color: "#fff",
                      "& .MuiButton-startIcon svg": { color: "#fff" },
                      "&:hover": {
                        background: "linear-gradient(90deg,#25662a,#378a39)",
                        boxShadow: "0 10px 26px rgba(46,125,50,0.45)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Connect Brokerage
                  </Button>
                  <Stack direction="row" spacing={1} alignItems="center" color="success.main">
                    <CheckCircleOutlineIcon fontSize="small" />
                    <Typography variant="body2" color="success.main">
                      Your data remains private & can be removed anytime.
                    </Typography>
                  </Stack>
                </Stack>
                {/* Logos grid */}
                <Box>
                  <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>
                    SUPPORTED INSTITUTIONS
                  </Typography>
                  <Grid container spacing={2} mt={0.5}>
                    {Array.from(new Set(Object.values(bankLogoMap)))
                      .slice(0, 12)
                      .map((src) => (
                        <Grid item xs={4} sm={3} md={2} key={src}>
                          <Paper
                            variant="outlined"
                            sx={{
                              px: 1,
                              py: 1,
                              borderRadius: 3,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: "background.paper",
                              transition: "all .25s",
                              height: 90,
                              position: "relative",
                              overflow: "hidden",
                              "&:hover": {
                                boxShadow: 3,
                                transform: "translateY(-3px)",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={src}
                              alt="brokerage logo"
                              sx={{
                                height: 56,
                                width: "auto",
                                maxWidth: "100%",
                                objectFit: "contain",
                                display: "block",
                                // Removed transform scaling to keep all within outline
                              }}
                            />
                          </Paper>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Stack>
            </Paper>
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
                      {linkedCount} of {totalCount} accounts linked
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
                          primaryTypographyProps={{ variant: "body2" }}
                          secondary={`Balance: $${account.balance.toLocaleString()} | Holdings: ${
                            account.holdings?.length || 0
                          }`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box mt={1} display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => unlinkBrokerage(brokerage.name)}
                      sx={{
                        backgroundColor: "#fff",
                        color: "#000",
                        borderColor: "#000",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                          borderColor: "#000",
                          color: "#000",
                        },
                      }}
                    >
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
