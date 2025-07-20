/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import BaseLayout from "layouts/billing/components/BaseLayout";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

// Import Stripe.js — used to redirect the user to Stripe Checkout
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your public key (replace 'pk_test_...' with your actual key)
// This returns a promise because the Stripe library loads asynchronously
const stripePromise = loadStripe('pk_test_z0VhfWM9rkUycPiMvzQXojLv');

// Function to initiate the subscription process
// Takes the Stripe Price ID (for monthly or yearly plan) as input
async function subscribe(priceId) {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userSession.access_token}`,
    },
    body: JSON.stringify({ priceId }),
  });
  const { sessionId } = await res.json();
  const stripe = await stripePromise;
  stripe?.redirectToCheckout({ sessionId });
}

import useAppStore from 'store';

function Billing() {
  // Example: get user session from your store (adjust as needed)
  const userSession = useAppStore((state) => state.session);

  // Replace with your actual Stripe price IDs
  const monthlyPriceId = 'price_1RmkNY2LzMkIzpdDw5MeMEfD';
  const yearlyPriceId = 'price_1Rml7V2LzMkIzpdDdynGsUOE';

  const handleSubscribe = (priceId) => {
    console.log("Handling subscription for Price ID:", priceId);
    if (userSession) {
      subscribe(priceId, userSession);
    } else {
      alert('User session not found. Please log in.');
    }
  };

  return (
    <BaseLayout stickyNavbar>
      <ArgonBox mt={4}>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <BillingInformation />
            </Grid>
          </Grid>
        </ArgonBox>


        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
                <Grid item xs={12}>
                  {/* Stripe Subscribe Buttons */}
                  <Button variant="contained" color="primary" onClick={() => handleSubscribe(monthlyPriceId)} style={{ marginRight: 8 }}>
                    Subscribe Monthly
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleSubscribe(yearlyPriceId)}>
                    Subscribe Yearly
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </ArgonBox>

      </ArgonBox>
    </BaseLayout>
  );
}

export default Billing;
