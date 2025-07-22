/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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

import useAppStore from "store";

function Billing() {
  const userSession = useAppStore((state) => state.session);
  const monthlyPriceId = "price_1RmkNY2LzMkIzpdDw5MeMEfD";
  const yearlyPriceId = "price_1Rml7V2LzMkIzpdDdynGsUOE";

  return (
    <BaseLayout stickyNavbar>
      <ArgonBox mt={4}>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <BillingInformation
                monthlyPriceId={monthlyPriceId}
                yearlyPriceId={yearlyPriceId}
                userSession={userSession}
              />
            </Grid>
          </Grid>
        </ArgonBox>

        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Invoices />
            </Grid>
          </Grid>
        </ArgonBox>
      </ArgonBox>
    </BaseLayout>
  );
}

export default Billing;
