import React from "react";
import ArgonTypography from "components/ArgonTypography";

function FinancialExplanation() {
  return (
    <ArgonTypography variant="body2" color="text" sx={{ color: "text.secondary", fontWeight: 400 }} gutterBottom>
      This table shows your proportionate share of each company’s balance sheet. Proportionate Share
      of the Balance Sheet shows the portion of a company’s assets, liabilities, and equity you
      effectively own based on your shareholding. For example, if you own 1% of a company, we
      calculate 1% of its assets, cash, liabilities, and equity. and other balance sheet items—so
      you can see exactly what resources and obligations your investment represents, just as if you
      personally owned that fraction of the entire business.
    </ArgonTypography>
  );
}

export default FinancialExplanation;
