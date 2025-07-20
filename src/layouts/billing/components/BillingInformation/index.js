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
    <div style={{ position: 'relative', width: '100%', minHeight: '600px', paddingTop: '32px' }}>
      <h2
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          margin: 0,
          padding: '24px 0 16px 0',
          width: '100%',
          fontWeight: 700,
          fontSize: '2rem',
          color: '#1a237e',
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        Look Through Profits (Annual)
      </h2>
      <div
        style={{ paddingTop: '90px' }}
        dangerouslySetInnerHTML={{
          __html:
            `<stripe-pricing-table pricing-table-id="prctbl_1RmqJv2LzMkIzpdDWLDVxpFo" publishable-key="pk_test_z0VhfWM9rkUycPiMvzQXojLv"></stripe-pricing-table>`
        }}
      />
    </div>
  );
}
