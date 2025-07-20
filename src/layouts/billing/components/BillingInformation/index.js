import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function BillingSection() {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={3}
      p={2}
    >
      {[
        {
          title: "Monthly Plan",
          price: "$19",
          period: "/mo",
          features: [
            "Look-through portfolio reports",
            "Monthly financial statement updates",
            "Moat & earnings trends analysis",
          ],
          buttonText: "Subscribe Monthly",
          border: "1px solid #e0e0e0",
          titleColor: "text.primary",
          saveText: "",
        },
        {
          title: "Yearly Plan",
          price: "$180",
          period: "/yr",
          features: [
            "Look-through portfolio reports",
            "Monthly financial statement updates",
            "Moat & earnings trends analysis",
            "Priority support",
          ],
          buttonText: "Subscribe Yearly",
          border: "2px solid #1976d2",
          titleColor: "primary",
          saveText: "(Save 20%)",
        },
      ].map((plan, index) => (
        <Card
          key={index}
          sx={{
            flex: "1 1 300px",
            borderRadius: 3,
            border: plan.border,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&:hover": { boxShadow: 6 },
            transition: "box-shadow 0.2s",
          }}
        >
          <CardHeader
            title={
              <Box textAlign="center">
                <Typography variant="h3" color={plan.titleColor}>
                  {plan.title}
                </Typography>
                {plan.saveText && (
                  <Typography variant="caption" color="text.secondary">
                    {plan.saveText}
                  </Typography>
                )}
              </Box>
            }
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h1" fontWeight="bold">
              {plan.price}
              <Typography
                variant="subtitle1"
                component="span"
                fontWeight="regular"
              >
                {plan.period}
              </Typography>
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0, textAlign: "left" }}>
              {plan.features.map((feature, i) => (
                <Typography component="li" variant="body2" key={i}>
                  {feature}
                </Typography>
              ))}
            </Box>
          </CardContent>
          <Box p={2}>
            <Button variant="contained" fullWidth size="large">
              {plan.buttonText}
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
