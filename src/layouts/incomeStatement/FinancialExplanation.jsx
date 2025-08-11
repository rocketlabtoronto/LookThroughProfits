import React from "react";
import ArgonTypography from "components/ArgonTypography";

function FinancialExplanation() {
  return (
    <ArgonTypography
      variant="body2"
      color="text"
      sx={{ color: "text.secondary", fontWeight: 400 }}
      gutterBottom
    >
      This table shows your proportionate share of each company’s income statement. It represents
      the portion of the company’s revenues, expenses, and profits that you effectively own based on
      your shareholding. For example, if you own 1% of a company, we calculate 1% of its total
      revenues, costs, and net income, along with other income statement items. This gives you a
      clear view of how much profit your investment generates, as if you personally held that
      fraction of the entire business.
    </ArgonTypography>
  );
}

export default FinancialExplanation;
