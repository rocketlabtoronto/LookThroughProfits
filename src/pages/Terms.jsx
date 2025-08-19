import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";

export default function Terms() {
  const effectiveDate = "August 18, 2025";
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={4} px={{ xs: 2, md: 4 }}>
        <ArgonBox display="flex" justifyContent="center">
          <Card
            sx={{
              p: { xs: 3, md: 4 },
              background: "#fff",
              borderRadius: 3,
              boxShadow: 3,
              maxWidth: 960,
              width: "100%",
            }}
          >
            <ArgonTypography variant="h4" fontWeight="bold" color="text" gutterBottom>
              Terms of Use
            </ArgonTypography>
            <ArgonTypography variant="caption" color="text" display="block" gutterBottom>
              Effective Date: {effectiveDate}
            </ArgonTypography>
            <ArgonTypography variant="caption" color="text" display="block" gutterBottom>
              Company: LookThroughProfits, Inc.
            </ArgonTypography>
            <ArgonTypography variant="caption" color="text" display="block" gutterBottom>
              Address: 169 Madison Ave STE 38180, New York, NY 10016, USA
            </ArgonTypography>

            <Divider sx={{ my: 3 }} />

            {/* Table of Contents */}
            <ArgonTypography variant="subtitle2" color="text" fontWeight={700} gutterBottom>
              Contents
            </ArgonTypography>
            <Link
              href="#service"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mt: 1, mb: 0.5 }}
            >
              1. Service Provided
            </Link>
            <Link
              href="#accounts"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mb: 0.5 }}
            >
              2. Accounts
            </Link>
            <Link
              href="#payments"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mb: 0.5 }}
            >
              3. Payments
            </Link>
            <Link
              href="#acceptable-use"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mb: 0.5 }}
            >
              4. Acceptable Use
            </Link>
            <Link
              href="#ip"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mb: 0.5 }}
            >
              5. Intellectual Property
            </Link>
            <Link
              href="#liability"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mb: 0.5 }}
            >
              6. Limitation of Liability
            </Link>
            <Link
              href="#termination"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mb: 0.5 }}
            >
              7. Termination
            </Link>
            <Link
              href="#law"
              underline="hover"
              sx={{ display: "block", fontSize: "0.875rem", lineHeight: 1.4, mb: 2 }}
            >
              8. Governing Law
            </Link>

            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              By using LookThroughProfits.com (&quot;Service&quot;), you agree to the following
              terms. The Service is for informational and educational purposes only. We are not a
              registered investment adviser, broker-dealer, or financial institution.
            </ArgonTypography>

            <ArgonTypography id="service" variant="h6" fontWeight={700} color="text" gutterBottom>
              1. Service Provided
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              LookThroughProfits provides software analytics on public company data.
            </ArgonTypography>

            <ArgonTypography id="accounts" variant="h6" fontWeight={700} color="text" gutterBottom>
              2. Accounts
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              You must provide accurate information when creating an account. You are responsible
              for maintaining the security of your account.
            </ArgonTypography>

            <ArgonTypography id="payments" variant="h6" fontWeight={700} color="text" gutterBottom>
              3. Payments
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Subscriptions are billed through Stripe. All fees are non-refundable unless required
              by law.
            </ArgonTypography>

            <ArgonTypography
              id="acceptable-use"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
            >
              4. Acceptable Use
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Do not reverse engineer, copy, or resell the Service.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Do not use the Service for unlawful or harmful purposes.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Do not attempt to gain unauthorized access to our systems.
            </ArgonTypography>

            <ArgonTypography
              id="sharing"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              5. Intellectual Property
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              All content, software, and branding belong to LookThroughProfits, Inc. You are granted
              a limited, non-transferable license to use the Service.
            </ArgonTypography>

            <ArgonTypography id="liability" variant="h6" fontWeight={700} color="text" gutterBottom>
              6. Limitation of Liability
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We make no warranties regarding accuracy, completeness, or results. We are not liable
              for any investment decisions made based on the Service.
            </ArgonTypography>

            <ArgonTypography
              id="termination"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
            >
              7. Termination
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We may suspend or terminate accounts that violate these terms.
            </ArgonTypography>

            <ArgonTypography id="law" variant="h6" fontWeight={700} color="text" gutterBottom>
              8. Governing Law
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              These Terms are governed by the laws of Delaware and the United States.
            </ArgonTypography>

            <ArgonBox mt={4}>
              <Link href="#top" underline="hover">
                Back to top
              </Link>
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}
