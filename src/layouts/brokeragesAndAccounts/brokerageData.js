// List of major brokerages in Canada and the US with logo paths
export const isIntegrationAvailable = {
  notAvailable: "notAvailable",
  snapTrade: "snapTrade",
};

export const brokerages = {
  Canada: [
    {
      name: "BMO InvestorLine",
      logo: "/logos/bmo.png",
      integration: isIntegrationAvailable.notAvailable,
    },
    {
      name: "CIBC Investor's Edge",
      logo: "/logos/cibc.png",
      integration: isIntegrationAvailable.notAvailable,
    },
    {
      name: "National Bank Direct Brokerage",
      logo: "/logos/nbdb.png",
      integration: isIntegrationAvailable.notAvailable,
    },
    {
      name: "Questrade",
      logo: "/logos/questrade.png",
      integration: isIntegrationAvailable.snapTrade,
    },
    {
      name: "RBC Direct Investing",
      logo: "/logos/rbc.png",
      integration: isIntegrationAvailable.notAvailable,
    },
    {
      name: "Scotia iTRADE",
      logo: "/logos/scotia.png",
      integration: isIntegrationAvailable.notAvailable,
    },
    {
      name: "TD Direct Investing",
      logo: "/logos/td.png",
      integration: isIntegrationAvailable.notAvailable,
    },
    {
      name: "Wealthsimple",
      logo: "/logos/wealthsimple.png",
      integration: isIntegrationAvailable.snapTrade,
    },
  ],
  "United States": [
    {
      name: "Charles Schwab",
      logo: "/logos/charles.png",
      integration: isIntegrationAvailable.snapTrade,
    },
    { name: "Chase", logo: "/logos/chase.png", integration: isIntegrationAvailable.snapTrade },
    { name: "E*TRADE", logo: "/logos/etrade.png", integration: isIntegrationAvailable.snapTrade },
    {
      name: "Fidelity",
      logo: "/logos/fidelity.png",
      integration: isIntegrationAvailable.snapTrade,
    },
    {
      name: "Interactive Brokers",
      logo: "/logos/ibkr.png",
      integration: isIntegrationAvailable.snapTrade,
    },
    {
      name: "Merrill Edge",
      logo: "/logos/merrill.png",
      integration: isIntegrationAvailable.snapTrade,
    },
    {
      name: "Robinhood",
      logo: "/logos/robinhood.png",
      integration: isIntegrationAvailable.snapTrade,
    },
    {
      name: "Vanguard",
      logo: "/logos/vanguard.png",
      integration: isIntegrationAvailable.snapTrade,
    },
    {
      name: "Wells Fargo",
      logo: "/logos/fargo.png",
      integration: isIntegrationAvailable.snapTrade,
    },
  ],
};
