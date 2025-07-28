import { useState, useEffect } from "react";
import supabaseService from "services/supabaseService";
import useAppStore from "store";

const columns = [
  { name: "Company", align: "left" },
  { name: "Ownership Share", align: "right" },
  { name: "Assets", align: "right" },
  { name: "Equity", align: "right" },
  { name: "Cash & Equivalents", align: "right" },
  { name: "Liabilities", align: "right" },
];

function useAggregatedFinancials() {
  const [aggregatedData, setAggregatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const portfolioHoldings = useAppStore((state) => state.accountHoldings) || [];

  useEffect(() => {
    async function loadAggregatedFinancials() {
      try {
        const rows = await Promise.all(
          portfolioHoldings.map(async ({ Symbol, Quantity }) => {
            const quantity = parseFloat(Quantity);
            if (isNaN(quantity) || quantity <= 0) return null;

            try {
              const financials = await supabaseService.getFinancials({ ticker: Symbol });
              if (!Array.isArray(financials) || financials.length === 0) return null;

              const requiredTags = [
                "Assets",
                "Equity",
                "CashAndEquivalents",
                "Liabilities",
                "SharesOutstanding",
              ];

              const tagMap = {};
              for (const row of financials) {
                const { tag, value, fy_end_date } = row;
                if (!requiredTags.includes(tag) || value == null) continue;
                const isNewer =
                  !tagMap[tag] || new Date(fy_end_date) > new Date(tagMap[tag].fy_end_date);
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
                Company: `${Symbol} (${Symbol})`,
                "Ownership Share": formatOwnership(quantity, sharesOutstanding),
                Assets: prorated("Assets") !== null ? formatMoney(prorated("Assets")) : "N/A",
                Equity: prorated("Equity") !== null ? formatMoney(prorated("Equity")) : "N/A",
                "Cash & Equivalents":
                  prorated("CashAndEquivalents") !== null
                    ? formatMoney(prorated("CashAndEquivalents"))
                    : "N/A",
                Liabilities:
                  prorated("Liabilities") !== null ? formatMoney(prorated("Liabilities")) : "N/A",
              };
            } catch (err) {
              console.error(`Error loading financials for ${Symbol}:`, err);
              return null;
            }
          })
        );

        setAggregatedData({
          columns,
          rows: rows.filter(Boolean),
        });
      } catch (error) {
        console.error("Failed to load aggregated financials:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAggregatedFinancials();
  }, [portfolioHoldings]);

  return { loading, aggregatedData };
}

export default useAggregatedFinancials;
