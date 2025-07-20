import React from "react";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function FinancialExplanation() {
  return (
    <ArgonBox p={3}>
      <ArgonTypography variant="h5" fontWeight="bold" gutterBottom>
        Aggregated Pro Rata Income Statement
      </ArgonTypography>
      <ArgonTypography variant="body2" color="textSecondary" component="div">
        <p>
          <strong>Portfolio Financial Statements</strong> give you a proportional view of your
          portfolio’s earnings, inspired by the equity method used for investments in associates.
        </p>
        <p>
          Rather than just tracking the market price of stocks, this report treats your holdings as
          if you owned a fractional stake in each business — reflecting underlying earnings, cash
          flow, and profitability.
        </p>
        <p>
          While you don’t hold a 20% stake in each company, this approach gives a more accurate view
          of your portfolio’s true economic exposure, similar to how sophisticated investors analyze
          their holdings.
        </p>
      </ArgonTypography>
    </ArgonBox>
  );
}

export default FinancialExplanation;
