import { useState, useEffect } from "react";
import supabaseService from "services/supabaseService";
import useAppStore from "store";

const columns = [
  { name: "Company", align: "left" },
  { name: "Ownership Share", align: "right" },
  { name: "Revenue", align: "right" },
  { name: "COGS", align: "right" },
  { name: "Operating Expenses", align: "right" },
  { name: "Net Income", align: "right" }
];

function useAggregatedIncomeStatement() {
  const [aggregatedData, setAggregatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const portfolioHoldings = useAppStore((state) => state.accountHoldings) || [];

  useEffect(() => {
    async function loadAggregatedIncomeStatement() {
      try {
        const rows = await Promise.all(
          portfolioHoldings.map(async ({ Symbol, Quantity }) => {
            const quantity = parseFloat(Quantity);
            if (isNaN(quantity) || quantity <= 0) return null;

            try {
              const financials = await supabaseService.getFinancials({ ticker: Symbol });
              if (!Array.isArray(financials) || financials.length === 0) return null;

              const requiredTags = [
                "Revenue",
                "COGS",
                "OperatingExpenses",
                "NetIncome",
                "SharesOutstanding"
              ];

              const tagMap = {};
              for (const row of financials) {
                const { tag, value, fy_end_date } = row;
                if (!requiredTags.includes(tag) || value == null) continue;
                const isNewer = !tagMap[tag] || new Date(fy_end_date) > new Date(tagMap[tag].fy_end_date);
                if (isNewer) tagMap[tag] = row;
              }

              const sharesOutstanding = Number(tagMap["SharesOutstanding"]?.value);
              if (!sharesOutstanding || isNaN(sharesOutstanding) || sharesOutstanding <= 0)
                return null;

              const prorated = (tag) => {
                const val = Number(tagMap[tag]?.value);
                return isNaN(val) ? null : (val / sharesOutstanding) * quantity;
              };

              const formatMoney = (num) =>
                "$" + Number(num).toLocaleString("en-US", { maximumFractionDigits: 0 });

              const formatOwnership = (q, s) => {
                const ratio = s / q;
                const units =
                  ratio >= 1_000_000
                    ? `${(ratio / 1_000_000).toFixed(2)}M`
                    : `${(ratio / 1_000).toFixed(2)}K`;
                return `1 in ${units}`;
              };

              return {
                "Company": `${Symbol} (${Symbol})`,
                "Ownership Share": formatOwnership(quantity, sharesOutstanding),
                "Revenue": prorated("Revenue") !== null ? formatMoney(prorated("Revenue")) : "N/A",
                "COGS": prorated("COGS") !== null ? formatMoney(prorated("COGS")) : "N/A",
                "Operating Expenses": prorated("OperatingExpenses") !== null ? formatMoney(prorated("OperatingExpenses")) : "N/A",
                "Net Income": prorated("NetIncome") !== null ? formatMoney(prorated("NetIncome")) : "N/A"
              };
            } catch (err) {
              console.error(`Error loading financials for ${Symbol}:`, err);
              return null;
            }
          })
        );

        setAggregatedData({
          columns,
          rows: rows.filter(Boolean)
        });
      } catch (error) {
        console.error("Failed to load aggregated income statement:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAggregatedIncomeStatement();
  }, [portfolioHoldings]);

  return { loading, aggregatedData };
}

export default useAggregatedIncomeStatement;
