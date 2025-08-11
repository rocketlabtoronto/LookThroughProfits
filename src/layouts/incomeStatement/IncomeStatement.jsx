import React, { useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import Box from "@mui/material/Box";

import ArgonTypography from "components/ArgonTypography";
import ArgonBox from "components/ArgonBox";
import FinancialExplanation from "../balanceSheet/FinancialExplanation";
import ProRataTable from "../balanceSheet/ProRataTable";
import useAggregatedIncomeStatement from "../incomeStatement/useAggregatedIncomeStatement";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function IncomeStatement() {
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const { loading, aggregatedData, allAccountsWithLogos } =
    useAggregatedIncomeStatement(selectedAccountId);

  const handleSelect = (id) => setSelectedAccountId((prev) => (prev === id ? null : id));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} px={2}>
        <Card
          sx={{
            p: 3,
            background: "#fff",
            overflow: "visible",
            borderRadius: 3,
            boxShadow: 3,
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <ArgonTypography variant="h4" fontWeight="bold" gutterBottom>
            Income Statement
          </ArgonTypography>

          {allAccountsWithLogos?.length > 0 && (
            <ArgonBox mb={2}>
              <ArgonTypography variant="h6" fontWeight="medium" gutterBottom>
                Accounts
              </ArgonTypography>
              <Box display="flex" flexWrap="wrap" gap={1.5}>
                {allAccountsWithLogos.map((acc) => (
                  <Box
                    key={acc.id}
                    onClick={() => handleSelect(acc.id)}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      border: selectedAccountId === acc.id ? "2px solid #344767" : "1px solid #eee",
                      borderRadius: 2,
                      px: 1.5,
                      py: 1,
                      backgroundColor: selectedAccountId === acc.id ? "#eef2ff" : "#fafbfc",
                      cursor: "pointer",
                    }}
                    title={`${acc.brokerageName} #${acc.accountNumber}`}
                  >
                    <img src={acc.logo} alt={`${acc.brokerageName} logo`} style={{ height: 22 }} />
                    <ArgonTypography variant="button" color="text" sx={{ fontWeight: 600 }}>
                      {acc.brokerageName}
                    </ArgonTypography>
                    {acc.accountNumber && (
                      <ArgonTypography variant="caption" color="text">
                        #{acc.accountNumber}
                      </ArgonTypography>
                    )}
                  </Box>
                ))}
              </Box>
            </ArgonBox>
          )}

          <FinancialExplanation />
          <ProRataTable loading={loading} data={aggregatedData} />
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default IncomeStatement;
