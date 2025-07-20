
import React from "react";
import { Card, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";
import ArgonTypography from "components/ArgonTypography";

const incomeStatementData = [
  { category: "Revenue", amount: 120000 },
  { category: "Cost of Goods Sold (COGS)", amount: 45000 },
  { category: "Operating Expenses", amount: 30000 },
];

const netIncome =
  incomeStatementData[0].amount -
  incomeStatementData[1].amount -
  incomeStatementData[2].amount;

function IncomeStatement() {
  return (
    <TableContainer component={Card} sx={{ mb: 3 }}>
      <ArgonTypography variant="h6" sx={{ p: 2 }}>
        Income Statement
      </ArgonTypography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeStatementData.map((row) => (
            <TableRow key={row.category}>
              <TableCell>{row.category}</TableCell>
              <TableCell align="right">{row.amount.toLocaleString()}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <strong>Net Income</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{netIncome.toLocaleString()}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IncomeStatement;