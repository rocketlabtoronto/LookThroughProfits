import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";

export default function Privacy() {
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
              Privacy Policy
            </ArgonTypography>
            <Divider sx={{ my: 3 }} />
            {/* Table of Contents */}
            <ArgonTypography variant="subtitle2" color="text" fontWeight={700} gutterBottom>
              Contents
            </ArgonTypography>
            <Link
              href="#info-we-collect"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mt: 1,
                mb: 0.5,
              }}
            >
              1. Information We Collect
            </Link>
            <Link
              href="#how-we-use"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mb: 0.5,
              }}
            >
              2. How We Use Information
            </Link>
            <Link
              href="#sharing"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mb: 0.5,
              }}
            >
              3. Sharing of Information
            </Link>

            <Link
              href="#retention"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mb: 0.5,
              }}
            >
              4. Data Retention
            </Link>

            <Link
              href="#security"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mb: 0.5,
              }}
            >
              5. Security
            </Link>
            <Link
              href="#rights"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mb: 0.5,
              }}
            >
              6. Your Rights
            </Link>
            <Link
              href="#international"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mb: 0.5,
              }}
            >
              7. International Users
            </Link>
            <Link
              href="#changes"
              underline="hover"
              sx={{
                display: "block",
                fontSize: "1rem",
                lineHeight: 1.4,
                mb: 2,
              }}
            >
              8. Changes
            </Link>

            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              LookThroughProfits, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides
              subscription software that delivers financial analytics based on public company
              filings. This Privacy Policy explains how we collect, use, and protect your
              information.
            </ArgonTypography>

            <ArgonTypography
              id="info-we-collect"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
            >
              1. Information We Collect
            </ArgonTypography>

            <ArgonTypography variant="body2" color="text">
              Account details (name, email, login credentials)
            </ArgonTypography>

            <ArgonTypography variant="body2" color="text">
              Billing information (processed by Stripe)
            </ArgonTypography>

            <ArgonTypography variant="body2" color="text">
              Usage data (pages viewed, features used, device/browser)
            </ArgonTypography>

            <ArgonTypography variant="body2" color="text">
              Communications you send us
            </ArgonTypography>

            <ArgonTypography
              id="how-we-use"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              2. How We Use Information
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Provide and improve our services
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Process payments and subscriptions
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Communicate with you about updates, features, or support
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text">
              Ensure security and prevent misuse
            </ArgonTypography>

            <ArgonTypography
              id="sharing"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              3. Sharing of Information
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We do not sell your data. We may share limited information with service providers
              (Stripe, Supabase, hosting, analytics) and with legal authorities if required by law.
            </ArgonTypography>

            <ArgonTypography
              id="retention"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              4. Data Retention
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We retain data only as long as necessary to provide services or comply with legal
              obligations.
            </ArgonTypography>

            <ArgonTypography
              id="security"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              5. Security
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We use reasonable technical and organizational measures to protect data. No system is
              100% secure.
            </ArgonTypography>

            <ArgonTypography
              id="rights"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              6. Your Rights
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Depending on your location, you may have rights to access, correct, or delete your
              data. Contact us at
              <Link href="mailto:support@lookthroughprofits.com" sx={{ ml: 0.5 }}>
                support@lookthroughprofits.com
              </Link>
              .
            </ArgonTypography>

            <ArgonTypography
              id="international"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              7. International Users
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Data may be stored in the United States and accessed from other regions.
            </ArgonTypography>

            <ArgonTypography
              id="changes"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              8. Changes
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We may update this policy and will notify users via email or site notice.
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
