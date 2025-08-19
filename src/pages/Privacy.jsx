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

            {/* 1. Introduction */}
            <ArgonTypography
              id="introduction"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
            >
              1. Introduction
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              LookThroughProfits, Inc. (&quot;LookThroughProfits,&quot; &quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to
              protecting your personal information. This Privacy Policy explains what information we
              collect, how we use it, and the rights you have with respect to that information.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              By using LookThroughProfits.com or any of our services (the &quot;Service&quot;), you
              consent to this Privacy Policy.
            </ArgonTypography>

            {/* 2. Information We Collect */}
            <ArgonTypography
              id="information-we-collect"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              2. Information We Collect
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We collect the following categories of information:
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Account Information:</i> Name, email address, login credentials, and subscription
              details.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Payment Information:</i> Processed securely by our third-party payment provider
              (Stripe). We do not store credit card numbers.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Usage Data:</i> Pages visited, features used, browser type, device type, IP
              address, and similar analytics data.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Communications:</i> Messages you send us through email or support.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Business Customer Data:</i> If you are an organization, we may process limited
              personal data on your behalf (e.g., user login details).
            </ArgonTypography>

            {/* 3. How We Use Information */}
            <ArgonTypography
              id="how-we-use"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              3. How We Use Information
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We use collected information to:
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Provide, operate, and improve the Service.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Process payments and manage subscriptions.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Communicate with you about updates, features, and support.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Monitor system performance and prevent misuse or fraud.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Comply with legal and regulatory obligations.
            </ArgonTypography>

            {/* 4. Sharing of Information */}
            <ArgonTypography
              id="sharing"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              4. Sharing of Information
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We do not sell or rent personal data. We may share information with:
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Service Providers:</i> Such as Stripe (payments), Supabase (database/hosting),
              cloud providers, analytics tools, and email delivery services.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Legal Authorities:</i> When required to comply with applicable law, regulation, or
              legal process.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              <i>Corporate Transactions:</i> If LookThroughProfits is involved in a merger,
              acquisition, or sale of assets, information may be transferred as part of that
              transaction.
            </ArgonTypography>

            {/* 5. Data Retention */}
            <ArgonTypography
              id="retention"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              5. Data Retention
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We retain personal information only for as long as necessary to provide the Service,
              comply with legal obligations, and resolve disputes.
            </ArgonTypography>

            {/* 6. Security */}
            <ArgonTypography
              id="security"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              6. Security
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We implement technical and organizational measures (encryption in transit/at rest,
              access controls, monitoring) to protect your data. However, no method of transmission
              or storage is 100% secure, and we cannot guarantee absolute security.
            </ArgonTypography>

            {/* 7. International Transfers */}
            <ArgonTypography
              id="international"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              7. International Transfers
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Your information may be stored and processed in the United States and accessed from
              other jurisdictions. By using the Service, you consent to such transfers.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              For Canadian users, we comply with PIPEDA. For European users, we apply safeguards
              consistent with the GDPR.
            </ArgonTypography>

            {/* 8. Your Rights */}
            <ArgonTypography
              id="rights"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              8. Your Rights
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Depending on your jurisdiction, you may have the right to:
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Access, correct, or delete your personal data.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Withdraw consent to processing.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7 }}>
              Request data portability.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" sx={{ lineHeight: 1.7, mb: 1 }}>
              File a complaint with a supervisory authority.
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              Requests can be made to{" "}
              <Link href="mailto:support@lookthroughprofits.com">
                support@lookthroughprofits.com
              </Link>
              .
            </ArgonTypography>

            {/* 9. Children’s Privacy */}
            <ArgonTypography
              id="children"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              9. Children&rsquo;s Privacy
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              The Service is not directed at children under 18, and we do not knowingly collect
              personal information from children.
            </ArgonTypography>

            {/* 10. Changes */}
            <ArgonTypography
              id="changes"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              10. Changes
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              We may update this Privacy Policy from time to time. Material changes will be
              communicated by email or a notice on our website.
            </ArgonTypography>

            {/* 11. Contact Us */}
            <ArgonTypography
              id="contact"
              variant="h6"
              fontWeight={700}
              color="text"
              gutterBottom
              sx={{ mt: 2 }}
            >
              11. Contact Us
            </ArgonTypography>
            <ArgonTypography variant="body2" color="text" paragraph sx={{ lineHeight: 1.7 }}>
              If you have any questions or concerns about this Privacy Policy, contact us at:{" "}
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
