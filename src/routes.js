import BrokeragesAndAccounts from "layouts/brokeragesAndAccounts";
import BalanceSheet from "layouts/balanceSheet/BalanceSheet";
import Billing from "layouts/billing";
import IncomeStatement from "layouts/incomeStatement/IncomeStatement";
import SetPassword from "layouts/setPassword/setPassword";
import SendPasswordReset from "layouts/sendPasswordReset/sendPasswordReset";
import Login from "layouts/login/login";

import ArgonBox from "components/ArgonBox";
import RequireAuth from "components/RequireAuth";

const routes = [
  {
    type: "route",
    name: "Brokerages and Accounts",
    key: "dashboard",
    route: "/brokeragesAndAccounts",
    icon: <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-tv-2" />,
    component: (
      <RequireAuth>
        <BrokeragesAndAccounts />
      </RequireAuth>
    ),
  },
  {
    type: "route",
    name: "Balance Sheet",
    key: "balanceSheet",
    route: "/balanceSheet",
    icon: (
      <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: (
      <RequireAuth>
        <BalanceSheet />
      </RequireAuth>
    ),
  },
  {
    type: "route",
    name: "Income Statement",
    key: "incomeStatement",
    route: "/incomeStatement",
    icon: <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-money-coins" />,
    component: (
      <RequireAuth>
        <IncomeStatement />
      </RequireAuth>
    ),
  },
  {
    type: "route",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-credit-card" />,
    component: <Billing />, // Billing does NOT require auth
  },
  {
    type: "route",
    name: "Set Password",
    key: "setPassword",
    route: "/set-password",
    icon: (
      <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-lock-circle-open" />
    ),
    component: <SetPassword />,
  },
  {
    type: "route",
    name: "Login",
    key: "login",
    route: "/login",
    icon: <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-key-25" />,
    component: <Login />,
  },
  {
    type: "route",
    name: "Send Password Reset",
    key: "sendPasswordReset",
    route: "/send-password-reset",
    icon: <ArgonBox component="i" color="black" fontSize="14px" className="ni ni-email-83" />,
    component: <SendPasswordReset />,
  },
];

export default routes;
