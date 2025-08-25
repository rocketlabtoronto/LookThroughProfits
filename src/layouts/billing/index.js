import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// @mui material components
import Grid from "@mui/material/Grid";
// import Button from '@mui/material/Button';

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import BaseLayout from "layouts/billing/components/BaseLayout";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { useAppStore } from "../../stores/store";

function Billing() {
  const userSession = useAppStore((state) => state.session);
  const starter = process.env.REACT_APP_STRIPE_STARTER_PRICE_ID;
  const professional = process.env.REACT_APP_STRIPE_PROFESSIONAL_PRICE_ID;
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
              maxWidth: 400,
              width: "100%",
            }}
          >
            <BillingInformation
              monthlyPriceId={starter}
              yearlyPriceId={professional}
              userSession={userSession}
            />
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
