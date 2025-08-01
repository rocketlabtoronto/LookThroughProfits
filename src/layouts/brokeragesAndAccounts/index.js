import React, { useState } from "react";
import brokeragesData from "../../data/brokerages.json";
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
import AddBrokerageDialog from "./AddBrokerageDialog";  // adjust the path as needed

export default function BrokeragesAndAccounts() {
  const [brokerages, setBrokerages] = useState(brokeragesData);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleInclude = (brokerageId, accountId) => {
    setBrokerages(prev =>
      prev.map(b =>
        b.id === brokerageId
          ? {
              ...b,
              accounts: b.accounts.map(a =>
                a.id === accountId ? { ...a, included: !a.included } : a
              )
            }
          : b
      )
    );
  };

  const computeSummary = accounts => {
    const linked = accounts.filter(a => a.included);
    const linkedCount = linked.length;
    const totalCount = accounts.length;
    const linkedBalance = linked.reduce((sum, a) => sum + a.balance, 0);
    return { linkedCount, totalCount, linkedBalance };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <ArgonBox py={3}>
        {brokerages.map(brokerage => {
          const { linkedCount, totalCount, linkedBalance } = computeSummary(brokerage.accounts);
          return (
            <Accordion key={brokerage.id}>
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
                  {brokerage.accounts.map(account => (
                    <ListItem key={account.id} divider>
                      <Checkbox
                        checked={account.included}
                        onChange={() => toggleInclude(brokerage.id, account.id)}
                      />
                      <ListItemText
                        primary={`${account.type} | #${account.number}`}
                        secondary={`Balance: $${account.balance.toLocaleString()}`}
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
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            + Add Brokerage
          </Button>
        </Box>
      </ArgonBox>
      <AddBrokerageDialog open={open} onClose={() => setOpen(false)} />
      <Footer />
    </DashboardLayout>
  );
}
