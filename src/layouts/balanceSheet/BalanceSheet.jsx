import React from "react";
import { Card } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import FinancialExplanation from "./FinancialExplanation";
import ProRataTable from "./ProRataTable";
import useAggregatedFinancials from "./useAggregatedFinancials";

function BalanceSheet() {
  const { loading, aggregatedData } = useAggregatedFinancials();

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
