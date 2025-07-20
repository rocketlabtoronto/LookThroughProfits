/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonProgress from "components/ArgonProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <ArgonBox display="flex" alignItems="center">
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </ArgonTypography>
      <ArgonBox width="8rem">
        <ArgonProgress value={value} color={color} variant="gradient" label={false} />
      </ArgonBox>
    </ArgonBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const balanceSheetTableData = {
  columns: [
    { name: "Company", align: "left" },
    { name: "~Ownership Share", align: "right" },
    { name: "Book Equity", align: "right" },
    { name: "Debt", align: "right" },
    { name: "Cash", align: "right" }
  ],
  rows: [
    {
      Company: "Apple (AAPL)",
      "~Ownership Share": "1 in 2M",
      "Book Equity": "$52,000",
      "Debt": "$41,000",
      "Cash": "$17,000"
    },
    {
      Company: "Microsoft (MSFT)",
      "~Ownership Share": "1 in 2.5M",
      "Book Equity": "$48,000",
      "Debt": "$20,000",
      "Cash": "$19,000"
    },
    {
      Company: "Alphabet (GOOGL)",
      "~Ownership Share": "1 in 3M",
      "Book Equity": "$55,000",
      "Debt": "$10,000",
      "Cash": "$22,000"
    },
    {
      Company: "Amazon (AMZN)",
      "~Ownership Share": "1 in 4M",
      "Book Equity": "$24,000",
      "Debt": "$21,000",
      "Cash": "$12,000"
    },
    {
      Company: "Johnson & Johnson (JNJ)",
      "~Ownership Share": "1 in 3M",
      "Book Equity": "$28,000",
      "Debt": "$14,000",
      "Cash": "$7,000"
    },
    {
      Company: "Berkshire Hathaway (BRK.B)",
      "~Ownership Share": "1 in 5M",
      "Book Equity": "$65,000",
      "Debt": "$9,000",
      "Cash": "$22,000"
    },
    {
      Company: "ExxonMobil (XOM)",
      "~Ownership Share": "1 in 2M",
      "Book Equity": "$42,000",
      "Debt": "$28,000",
      "Cash": "$8,000"
    },
    {
      Company: "JPMorgan Chase (JPM)",
      "~Ownership Share": "1 in 4M",
      "Book Equity": "$38,000",
      "Debt": "$30,000",
      "Cash": "$15,000"
    },
    {
      Company: "Tesla (TSLA)",
      "~Ownership Share": "1 in 3M",
      "Book Equity": "$22,000",
      "Debt": "$9,000",
      "Cash": "$5,000"
    },
    {
      Company: "Meta (META)",
      "~Ownership Share": "1 in 2.5M",
      "Book Equity": "$50,000",
      "Debt": "$12,000",
      "Cash": "$15,000"
    }
  ]
};


export default balanceSheetTableData;
