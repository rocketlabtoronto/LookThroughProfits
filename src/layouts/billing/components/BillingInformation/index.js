import React, { useEffect } from "react";

export default function BillingSection() {
  useEffect(() => {
    // Dynamically add Stripe Pricing Table script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{ paddingTop: "90px" }}
      dangerouslySetInnerHTML={{
        __html: `<stripe-pricing-table pricing-table-id="prctbl_1RmqJv2LzMkIzpdDWLDVxpFo" publishable-key="pk_test_z0VhfWM9rkUycPiMvzQXojLv"></stripe-pricing-table>`,
      }}
    />
  );
}
