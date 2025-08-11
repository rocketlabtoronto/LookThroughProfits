import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import FinancialExplanation from "./FinancialExplanation";
import ProRataTable from "./ProRataTable";
import useAggregatedFinancials from "./useAggregatedFinancials";

function BalanceSheet() {
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const { loading, aggregatedData, allAccountsWithLogos } =
    useAggregatedFinancials(selectedAccountId);

  // Auto-select first account when available
  useEffect(() => {
    if (!selectedAccountId && Array.isArray(allAccountsWithLogos) && allAccountsWithLogos.length) {
      setSelectedAccountId(allAccountsWithLogos[0].id);
    }
  }, [allAccountsWithLogos, selectedAccountId]);

  const selectedAcc = (allAccountsWithLogos || []).find((a) => a.id === selectedAccountId);
  const handleSelect = (id) => setSelectedAccountId(id);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox display="flex" justifyContent="center">
          <Card
            sx={{
              p: 3,
              background: "#fff",
              overflow: "visible",
              borderRadius: 3,
              boxShadow: 3,
              maxWidth: 1200,
              width: "100%",
            }}
          >
            <ArgonTypography variant="h4" fontWeight="bold" gutterBottom>
              Balance Sheet
            </ArgonTypography>

            {/* Account selector */}
            {allAccountsWithLogos.length > 0 && (
              <ArgonBox mb={2}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <ArgonTypography variant="h6" fontWeight="medium">
                    Accounts
                  </ArgonTypography>
                  {selectedAcc && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <img src={selectedAcc.logo} alt="selected account" style={{ height: 18 }} />
                      <ArgonTypography variant="caption" color="text">
                        Viewing: {selectedAcc.brokerageName}
                      </ArgonTypography>
                      {selectedAcc.accountNumber && (
                        <ArgonTypography variant="caption" color="text">
                          #{selectedAcc.accountNumber}
                        </ArgonTypography>
                      )}
                    </Box>
                  )}
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1.5}>
                  {allAccountsWithLogos.map((acc) => (
                    <Box
                      key={acc.id}
                      onClick={() => handleSelect(acc.id)}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{
                        border:
                          selectedAccountId === acc.id ? "2px solid #344767" : "1px solid #eee",
                        borderRadius: 2,
                        px: 1.5,
                        py: 1,
                        backgroundColor: selectedAccountId === acc.id ? "#eef2ff" : "#fafbfc",
                        cursor: "pointer",
                      }}
                      title={`${acc.brokerageName} #${acc.accountNumber}`}
                    >
                      <img
                        src={acc.logo}
                        alt={`${acc.brokerageName} logo`}
                        style={{ height: 22 }}
                      />
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
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default BalanceSheet;
