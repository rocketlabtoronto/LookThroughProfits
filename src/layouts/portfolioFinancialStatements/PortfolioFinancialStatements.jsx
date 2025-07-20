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

function PortfolioFinancialStatements() {
  const { loading, aggregatedData } = useAggregatedFinancials();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Card>
          <FinancialExplanation />
          <ProRataTable loading={loading} data={aggregatedData} />
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PortfolioFinancialStatements;
