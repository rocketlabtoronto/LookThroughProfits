import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import ArgonBox from "components/ArgonBox";
import FinancialExplanation from "../balanceSheet/FinancialExplanation";
import ProRataTable from "../balanceSheet/ProRataTable";
import useAggregatedFinancials from "../balanceSheet/useAggregatedFinancials";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function IncomeStatement() {
  const { loading, aggregatedData } = useAggregatedFinancials();
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
          <FinancialExplanation />
          <ProRataTable loading={loading} data={aggregatedData} />
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default IncomeStatement;
