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

            {/* Top meta */}
            <ArgonTypography variant="body2" color="text" display="block" sx={{ lineHeight: 1.7 }}>
              Effective Date: {effectiveDate}
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" display="block" sx={{ lineHeight: 1.7 }}>
              Company: LookThroughProfits, Inc.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" display="block" sx={{ lineHeight: 1.7 }}>
              Address: 169 Madison Ave STE 38180, New York, NY 10016, USA
            </ArgonTypography>
            <ArgonTypography
              variant="body2"
              color="text"
              display="block"
              sx={{ lineHeight: 1.7, mb: 1 }}
            >
              Contact:{" "}
              <Link href="mailto:support@lookthroughprofits.com">
                support@lookthroughprofits.com
              </Link>
            </ArgonTypography>

            <Divider sx={{ my: 2 }} />

            {/* 1. Acceptance of Terms */}
            <ArgonTypography
              id="acceptance"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
            >
              1. Acceptance of Terms
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              By accessing or using LookThroughProfits.com or any related services (the
              &quot;Service&quot;), you agree to be bound by these Terms of Use (&quot;Terms&quot;).
              If you do not agree, do not use the Service.
            </ArgonTypography>

            {/* 2. Service Provided */}
            <ArgonTypography
              id="service"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              2. Service Provided
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              LookThroughProfits, Inc. provides subscription software that analyzes and presents
              data from public company filings and other financial information. The Service is
              intended for informational and educational purposes only.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              We are not a registered investment adviser, broker-dealer, financial institution, or
              fiduciary.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Nothing in the Service constitutes investment, financial, tax, or legal advice.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Users are solely responsible for their own investment and financial decisions.
            </ArgonTypography>

            {/* 3. Accounts */}
            <ArgonTypography
              id="accounts"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              3. Accounts
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              To access certain features, you must create an account. You agree to:
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Provide accurate and complete information.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Maintain the confidentiality of your login credentials.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Be responsible for all activity under your account.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We may suspend or terminate your account if you violate these Terms.
            </ArgonTypography>

            {/* 4. Payments & Subscriptions */}
            <ArgonTypography
              id="payments"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              4. Payments &amp; Subscriptions
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Fees are charged via Stripe.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              All payments are due in advance and are non-refundable unless required by law.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We may change pricing with prior notice; continued use constitutes acceptance of new
              fees.
            </ArgonTypography>

            {/* 5. Acceptable Use */}
            <ArgonTypography
              id="acceptable-use"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              5. Acceptable Use
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              You agree not to:
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Reverse engineer, copy, resell, or misuse the Service.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Use the Service for unlawful, fraudulent, or harmful purposes.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Interfere with the operation or security of the Service.
            </ArgonTypography>

            {/* 6. Intellectual Property */}
            <ArgonTypography
              id="ip"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              6. Intellectual Property
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              All content, software, and branding provided through the Service are owned by
              LookThroughProfits, Inc. You are granted a limited, non-exclusive, non-transferable
              license to use the Service for personal or internal business purposes only.
            </ArgonTypography>

            {/* 7. Disclaimers */}
            <ArgonTypography
              id="disclaimers"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              7. Disclaimers
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              The Service is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We
              make no warranties, express or implied, regarding:
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Accuracy, completeness, or reliability of the information.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Availability or uninterrupted access.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Suitability of the Service for any investment decision.
            </ArgonTypography>

            {/* 8. Limitation of Liability */}
            <ArgonTypography
              id="liability"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              8. Limitation of Liability
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              To the maximum extent permitted by law, LookThroughProfits, Inc. and its officers,
              directors, employees, and affiliates are not liable for any indirect, incidental, or
              consequential damages, including but not limited to loss of profits, arising out of or
              related to the use of the Service.
            </ArgonTypography>

            {/* 9. Indemnification */}
            <ArgonTypography
              id="indemnification"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              9. Indemnification
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              You agree to indemnify and hold harmless LookThroughProfits, Inc. from any claims,
              liabilities, damages, or expenses resulting from your use of the Service or violation
              of these Terms.
            </ArgonTypography>

            {/* 10. Governing Law & Disputes */}
            <ArgonTypography
              id="law"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              10. Governing Law &amp; Disputes
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              These Terms are governed by the laws of the State of Delaware, United States, without
              regard to conflict-of-law principles. Any disputes shall be resolved in the courts
              located in Delaware.
            </ArgonTypography>

            {/* 11. Changes */}
            <ArgonTypography
              id="changes"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              11. Changes
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We may update these Terms from time to time. Material changes will be communicated via
              email or a notice on the website. Continued use of the Service after changes take
              effect constitutes acceptance.
            </ArgonTypography>

            {/* 12. Contact Us */}
            <ArgonTypography
              id="contact"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              12. Contact Us
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Questions about these Terms may be directed to:{" "}
              <Link href="mailto:support@lookthroughprofits.com">
                support@lookthroughprofits.com
              </Link>
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              LookThroughProfits, Inc.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              169 Madison Ave STE 38180
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              New York, NY 10016, USA
            </ArgonTypography>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}
