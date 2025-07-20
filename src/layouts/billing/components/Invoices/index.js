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
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card sx={{ height: "100%" }}>
      <ArgonBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <ArgonTypography variant="h6" fontWeight="medium">
          Payment Records
        </ArgonTypography>
        <ArgonButton variant="outlined" color="info" size="small">
          View All
        </ArgonButton>
      </ArgonBox>
      <ArgonBox p={2}>
        <ArgonBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="March. 01, 2025" id="PAY20250301-A7F3D9B2-01" price="$19.00" />
          <Invoice date="February. 01, 2025" id="PAY20250201-A7F3D9B2-01" price="$19.00" />
          <Invoice date="April. 01, 2025" id="PAY20250401-A7F3D9B2-01" price="$19.00" />
          <Invoice date="May. 01, 2025" id="PAY20250501-A7F3D9B2-01" price="$19.00" />
          <Invoice date="June, 01, 2025" id="PAY20250601-A7F3D9B2-01" price="$19.00" noGutter />
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default Invoices;
