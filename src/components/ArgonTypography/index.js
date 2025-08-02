import { forwardRef } from "react";
import PropTypes from "prop-types";

// Custom styles for ArgonTypography
import ArgonTypographyRoot from "components/ArgonTypography/ArgonTypographyRoot";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

const ArgonTypography = forwardRef(
  (
    { color, fontWeight, textTransform, verticalAlign, textGradient, opacity, children, ...rest },
    ref
  ) => {
    const [controller] = useArgonController();
    const { darkMode } = controller;

    // Remove verticalAlign from props passed to DOM
    const { verticalAlign: _omit, ...cleanRest } = rest;

    return (
      <ArgonTypographyRoot
        {...cleanRest}
        ref={ref}
        ownerState={{
          color,
          fontWeight,
          textTransform,
          verticalAlign, // ✅ only used by styled component
          textGradient,
          opacity,
          darkMode,
        }}
      >
        {children}
      </ArgonTypographyRoot>
    );
  }
);

// Default props
ArgonTypography.defaultProps = {
  color: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
};

// PropTypes
ArgonTypography.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  opacity: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default ArgonTypography;
