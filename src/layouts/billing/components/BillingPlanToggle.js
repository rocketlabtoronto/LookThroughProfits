import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArgonBox from "components/ArgonBox";

function BillingPlanToggle({ plan, onChange }) {
  return (
    <ArgonBox mb={2} display="flex" justifyContent="center">
      <ToggleButtonGroup
        value={plan}
        exclusive
        onChange={(_, value) => value && onChange(value)}
        aria-label="billing plan"
        size="small"
        color="primary"
      >
        <ToggleButton value="month" aria-label="Monthly Plan">
          Monthly
        </ToggleButton>
        <ToggleButton value="year" aria-label="Yearly Plan">
          Yearly
        </ToggleButton>
      </ToggleButtonGroup>
    </ArgonBox>
  );
}

BillingPlanToggle.propTypes = {
  plan: PropTypes.oneOf(["month", "year"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BillingPlanToggle;
