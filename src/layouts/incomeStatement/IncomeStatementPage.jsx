


import useAggregatedIncomeStatement from "./useAggregatedIncomeStatement";
import FinancialExplanation from "./FinancialExplanation";
import ProRataTable from "./ProRataTable";
import { Card } from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import Footer from "examples/Footer";

function IncomeStatementPage() {
  const { loading, aggregatedData } = useAggregatedIncomeStatement();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Card>
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

export default IncomeStatementPage;
