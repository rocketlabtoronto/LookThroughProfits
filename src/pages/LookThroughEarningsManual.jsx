import React, { useEffect } from "react";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function LookThroughEarningsManual() {
  useEffect(() => {
    // Load Google Fonts - Libre Franklin (primary) and Lora (secondary)
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700&family=Lora:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Apply background styling
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.fontFamily = "'Lora'";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.fontFamily = "";
    };
  }, []);

  const containerStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    fontFamily: "'Libre Franklin'",
    lineHeight: 1.7,
    fontSize: 18,
    color: "#1a1a1a",
  };

  const headingStyle = {
    fontFamily: "'Lora'",
    fontWeight: 600,
    color: "#1a1a1a",
    lineHeight: 1.3,
    marginBottom: 24,
  };

  const bodyStyle = {
    fontFamily: "'Lora'",
    fontSize: 18,
    color: "#444e5e",
    lineHeight: 1.7,
    marginBottom: 24,
  };

  const sectionDivider = {
    borderTop: "1px solid #e1e5e9",
    paddingTop: 40,
    marginTop: 40,
  };

  const highlightBox = {
    backgroundColor: "#f8f9fa",
    padding: 24,
    margin: "24px 0",
    borderLeft: "4px solid #bfa14a",
    fontSize: 18,
    fontStyle: "italic",
    color: "#1a1a1a",
  };

  const exampleBox = {
    backgroundColor: "#fafbfc",
    border: "1px solid #e1e5e9",
    borderRadius: 8,
    padding: 32,
    margin: "32px 0",
  };

  return (
    <ArgonBox px={{ xs: 3, sm: 5, md: 8 }} py={6} maxWidth={900} mx="auto" style={containerStyle}>
      {/* Hero Section */}
      <ArgonTypography
        variant="h1"
        style={{
          ...headingStyle,
          fontSize: 42,
          fontWeight: 700,
          marginBottom: 32,
          borderBottom: "3px solid #bfa14a",
          paddingBottom: 16,
        }}
      >
        Look-Through Earnings: Investing Like a Business Owner, Not a Speculator
      </ArgonTypography>

      <div style={highlightBox}>
        &quot;We regard look-through earnings as a much better gauge of economic reality than GAAP
        earnings.&quot;
        <br />
        <span style={{ fontStyle: "normal", fontWeight: 600, color: "#1a1a1a" }}>
          — Warren Buffett, Berkshire Hathaway Shareholder Letter
        </span>
      </div>

      {/* Mindset Section */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        Your Mindset Is Everything: Owner vs. Speculator
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        Most people approach the stock market like a casino. They try to guess price movements. They
        buy because they hope someone will pay more tomorrow.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        But business owners don&apos;t think this way. They care about:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            What the business earns
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            What it reinvests
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            And what that means for long-term value
          </li>
        </ul>
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        Our motto is:
      </ArgonTypography>
      <div style={highlightBox}>&quot;Invest in Stocks Like a Business Owner.&quot;</div>
      <ArgonTypography variant="body1" style={bodyStyle}>
        To do that, you must learn to see through the noise of market prices and reported earnings —
        and look at the true economic performance of the companies you own.
      </ArgonTypography>

      {/* Mr. Lookthrough vs Mr. Market */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        Meet Mr. Lookthrough and Mr. Market
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        These are two imaginary characters that represent how people think about stocks.
      </ArgonTypography>

      <div style={exampleBox}>
        <ArgonTypography
          variant="h5"
          style={{
            ...headingStyle,
            fontSize: 22,
            color: "#bfa14a",
            marginBottom: 16,
          }}
        >
          Mr. Lookthrough (Buffett&apos;s ideal investor)
        </ArgonTypography>
        <ul
          style={{
            margin: 0,
            paddingLeft: 0,
            listStyle: "none",
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Thinks like a business owner.
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Measures his share of the real earnings of companies he owns.
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Doesn&apos;t care about short-term stock prices.
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Focuses on retained earnings, reinvestment returns, and intrinsic value.
          </li>
        </ul>
      </div>

      <div style={exampleBox}>
        <ArgonTypography
          variant="h5"
          style={{
            ...headingStyle,
            fontSize: 22,
            color: "#bfa14a",
            marginBottom: 16,
          }}
        >
          Mr. Market (from Benjamin Graham)
        </ArgonTypography>
        <ul
          style={{
            margin: 0,
            paddingLeft: 0,
            listStyle: "none",
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Is manic, emotional, and short-sighted.
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Offers you a price every day — sometimes too high, sometimes too low.
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Is your servant, not your guide.
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Obsessively watches charts but ignores what the business is actually earning.
          </li>
        </ul>
      </div>

      <ArgonTypography variant="body1" style={bodyStyle}>
        To succeed as an investor, you must ignore Mr. Market and embrace the clarity of Mr.
        Lookthrough.
      </ArgonTypography>

      {/* What Are Look-Through Earnings? */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        What Are Look-Through Earnings?
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        Speculators focus on:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Stock price movements
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Daily news cycles
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Market sentiment and trading volume
          </li>
        </ul>
        But that&apos;s not how an owner thinks.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        Look-through earnings reflect:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Your proportionate share of all the profits earned by the companies you own — whether or
            not they pay dividends or appear on your income statement.
          </li>
        </ul>
        This includes:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Your share of reported earnings (if applicable)
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Your share of retained earnings (profits that the company reinvests for growth)
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Dividends received
          </li>
        </ul>
        Buffett argues that if those retained earnings are used wisely, they grow the value of the
        business — and your wealth, even if you don&apos;t see the money today.
      </ArgonTypography>

      {/* Why Retained Earnings Matter */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        Why Retained Earnings Matter
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        Smart companies retain and reinvest profits for growth — building future earnings per share
        and long-term value.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        But GAAP often ignores retained earnings unless you own more than 20%. So millions in real
        economic value go unrecognized on traditional income statements.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        But that&apos;s not how an owner thinks.
      </ArgonTypography>
      <div style={highlightBox}>
        &quot;Many of the businesses we own retain all earnings. These earnings do not hit our
        income statement but are building our wealth nonetheless.&quot;
        <br />
        <span style={{ fontStyle: "normal", fontWeight: 600, color: "#1a1a1a" }}>
          — Warren Buffett
        </span>
      </div>
      <ArgonTypography variant="body1" style={bodyStyle}>
        This is the economic substance — and what a true owner cares about.
      </ArgonTypography>

      {/* Example: What a Speculator Sees vs. What an Owner Sees */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
          borderLeft: "4px solid #bfa14a",
          paddingLeft: 16,
        }}
      >
        Example: What a Speculator Sees vs. What an Owner Sees
      </ArgonTypography>

      <div style={exampleBox}>
        <ArgonTypography variant="body1" style={bodyStyle}>
          Let&apos;s say you invest $10,000 in a small public company called Acme Tools. The company
          has a market cap of $1 million and earns $100,000 per year in profit, giving it a starting
          P/E ratio of 10 (Price divided by Earnings).<br></br>
          The stock price is $10/share, so there are 100,000 shares outstanding.
          <br />
          <br />
          Your $10,000 investment buys 1,000 shares, or 1% ownership of the company.
          <br />
          Acme pays out 25% of its earnings as dividends and reinvests the rest.
          <br />
          Your proportionate share of earnings is 1% of $100,000 = $1,000.
          <br />
          You receive $250 in dividends (25% payout ratio).
          <br />
          <br />
          The company reinvests $750 of your share back into the business to grow future earnings.
        </ArgonTypography>
        <ArgonTypography
          variant="body1"
          style={{ ...bodyStyle, fontWeight: 600, color: "#000000ff" }}
        >
          However, this year the stock price dropped 15%, falling from $10/share to $8.50/share. You
          think your investment is now worth $8,500. Is it?
        </ArgonTypography>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, margin: "32px 0" }}>
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            padding: 24,
          }}
        >
          <ArgonTypography
            variant="h5"
            style={{
              ...headingStyle,
              fontSize: 20,
              color: "#dc2626",
              marginBottom: 16,
            }}
          >
            What a Speculator Sees:
          </ArgonTypography>
          <ArgonTypography
            variant="body2"
            style={{ fontSize: 18, color: "#7f1d1d", lineHeight: 1.6 }}
          >
            &quot;Ugh, my portfolio is down 15%.&quot;
            <br />
            <br />
            &quot;This company is losing value. I should cut my losses.&quot;
            <br />
            <br />
            <em>Focused only on price decline, not business fundamentals.</em>
          </ArgonTypography>
        </div>

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            padding: 24,
          }}
        >
          <ArgonTypography
            variant="h5"
            style={{
              ...headingStyle,
              fontSize: 20,
              color: "#166534",
              marginBottom: 16,
            }}
          >
            What an Owner Sees:
          </ArgonTypography>
          <ArgonTypography
            variant="body2"
            style={{ fontSize: 18, color: "#14532d", lineHeight: 1.6 }}
          >
            &quot;I invested $10,000 and earned $1,000 this year — that&apos;s a 10% return from
            real business profits.&quot;
            <br />
            <br />
            &quot;I received $250 in cash dividends, and $750 is still working inside the company —
            growing the value of my ownership.&quot;
            <br />
            <br />
            &quot;The market price dropped, but the business didn&apos;t stop earning. In fact,
            it&apos;s more attractively priced now.&quot;
            <br />
            <br />
            &quot;I can buy more of this business at a better valuation — a lower P/E ratio means I
            get more earnings per dollar invested.&quot;
          </ArgonTypography>
        </div>
      </div>

      <ArgonTypography variant="body1" style={{ ...bodyStyle, fontWeight: 500, fontSize: 20 }}>
        The speculator sees a paper loss. But the owner sees steady value creation. By focusing on
        your proportionate share of earnings, you think like a business owner — and make more
        rational, long-term decisions.
        <br />
        <br />
        <span style={{ color: "#bfa14a", fontWeight: 600 }}>
          That&apos;s the look-through mindset.
        </span>
      </ArgonTypography>

      {/* Example: The Dividend Trap */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
          borderLeft: "4px solid #bfa14a",
          paddingLeft: 16,
        }}
      >
        Example: The Dividend Trap
      </ArgonTypography>

      <div style={exampleBox}>
        <ArgonTypography variant="body1" style={bodyStyle}>
          Let&apos;s say you invest $10,000 in a company called YieldMax Corp, a public company that
          pays a high dividend. The company has a market cap of $2 million and reports $100,000 in
          annual profit.
        </ArgonTypography>
        <ArgonTypography variant="body1" style={bodyStyle}>
          The stock price is $20/share, with 100,000 shares outstanding.
          <br />
          <br />
          Your $10,000 buys 500 shares, or 0.5% ownership.
          <br />
          <br />
          YieldMax has a 100% payout ratio, meaning it pays out all its earnings as dividends.
          <br />
          <br />
          You receive $500 in dividends (0.5% of $100,000). The stock price hasn&apos;t moved much,
          but let&apos;s look deeper.
        </ArgonTypography>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, margin: "32px 0" }}>
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            padding: 24,
          }}
        >
          <ArgonTypography
            variant="h5"
            style={{
              ...headingStyle,
              fontSize: 20,
              color: "#dc2626",
              marginBottom: 16,
            }}
          >
            What a Dividend Chaser Sees:
          </ArgonTypography>
          <ArgonTypography
            variant="body2"
            style={{ fontSize: 18, color: "#7f1d1d", lineHeight: 1.6 }}
          >
            &quot;Nice! I made $500 in dividends.&quot;
            <br />
            <br />
            &quot;That&apos;s a 5% yield. I&apos;ll keep collecting.&quot;
            <br />
            <br />
            <em>Ignores what the company is doing — or not doing — with retained capital.</em>
          </ArgonTypography>
        </div>

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            padding: 24,
          }}
        >
          <ArgonTypography
            variant="h5"
            style={{
              ...headingStyle,
              fontSize: 20,
              color: "#166534",
              marginBottom: 16,
            }}
          >
            What an Owner Sees:
          </ArgonTypography>
          <ArgonTypography
            variant="body2"
            style={{ fontSize: 18, color: "#14532d", lineHeight: 1.6 }}
          >
            &quot;The company paid out everything. There&apos;s no reinvestment, no R&amp;D, no
            growth.&quot;
            <br />
            <br />
            &quot;Future earnings will likely stagnate or shrink due to inflation, competition, or
            disruption.&quot;
            <br />
            <br />
            &quot;I may get $500 this year — but five years from now, my ownership might be worth
            less.&quot;
          </ArgonTypography>
        </div>
      </div>

      <div style={highlightBox}>
        This is the dividend trap: the appearance of income while the underlying business slowly
        erodes.
        <br />
        <br />
        Look-through thinking asks:
        <ul
          style={{
            marginTop: 18,
            marginBottom: 0,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 8, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Is my share of earnings growing?
          </li>
          <li style={{ marginBottom: 8, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Is capital being deployed productively?
          </li>
        </ul>
      </div>

      <ArgonTypography variant="body1" style={bodyStyle}>
        Sometimes, a lower dividend with smart reinvestment leads to greater long-term wealth than a
        fat check today.
      </ArgonTypography>

      {/* How Accounting Classifies Ownership */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        How Accounting Classifies Ownership
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        Traditional accounting separates investments by percentage of ownership:
      </ArgonTypography>

      <div
        style={{
          backgroundColor: "#fafbfc",
          border: "1px solid #e1e5e9",
          borderRadius: 8,
          fontSize: 18,
          padding: 24,
          margin: "24px 0",
        }}
      >
        <table
          style={{
            width: "100%",
            fontSize: 18,
            borderCollapse: "collapse",
            fontFamily: "'Libre Franklin'",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #bfa14a" }}>
              <th
                style={{
                  textAlign: "left",
                  fontSize: 18,
                  padding: "12px 8px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Ownership
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#1a1a1a",
                }}
              >
                Category
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Method
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Recognition
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e1e5e9" }}>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>0–20%</td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>
                Passive Investment
              </td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>Fair value</td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>
                Only dividends and price changes
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e1e5e9" }}>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>20–50%</td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>Associate</td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>Equity</td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>
                Your share of net income
              </td>
            </tr>
            <tr>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>&gt;50%</td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>Subsidiary</td>
              <td style={{ padding: "12px 8px", fontSize: 18, color: "#444e5e" }}>Consolidation</td>
              <td style={{ padding: "12px 8px", fontSize: 1, color: "#444e5e" }}>
                100% of income (with NCI adjustments)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ArgonTypography variant="body1" style={bodyStyle}>
        Most retail investors hold shares in the 0–20% range — and are treated as passive investors.
        The accounting focuses on market value, not underlying earnings. You only see dividends and
        price changes.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        But Buffett&apos;s approach — and the one we use at LookThroughProfits.com — encourages
        investors to think like 20–50% owners.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        That&apos;s what the equity method assumes: even with a minority stake, you see your share
        of the company&apos;s net income as if you were sitting at the boardroom table.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        This shift in mindset changes everything:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Instead of tracking stock prices, you track business performance.
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Instead of reacting to volatility, you assess value.
          </li>
        </ul>
        Whether you own 0.1% or 10%, your proportionate share of the business still exists — and
        it&apos;s earning for you.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        That&apos;s the look-through lens we help you adopt.
      </ArgonTypography>
      <div style={highlightBox}>
        <strong>What is my real economic ownership, and what is it earning for me?</strong>
      </div>

      {/* LookThroughProfits.com: Financial Statements for Real Owners */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        LookThroughProfits.com: Financial Statements for Real Owners
      </ArgonTypography>

      <div style={highlightBox}>
        <strong>Real-World Example from LookThroughProfits.com</strong>
      </div>

      <ArgonTypography variant="body1" style={bodyStyle}>
        To bring this concept to life, here&apos;s how our actual Look-Through Income Statement tool
        works:
      </ArgonTypography>

      <div style={exampleBox}>
        <ArgonTypography variant="body1" style={bodyStyle}>
          Each row represents a company in the user&apos;s portfolio. For example:
          <ul
            style={{
              marginTop: 16,
              marginBottom: 16,
              marginLeft: 0,
              listStyle: "none",
              paddingLeft: 0,
            }}
          >
            <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
              <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
                •
              </span>
              SSTK (Shutterstock) generated $28,308 in revenue, of which $3,569 was the user&apos;s
              pro-rata share of net income, based on a ~1 in 31,000 ownership stake.
            </li>
            <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
              <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
                •
              </span>
              WU (Western Union) contributed over $5,000 in net income from a ~1 in 120,000
              ownership share.
            </li>
          </ul>
        </ArgonTypography>
        <ArgonTypography variant="body1" style={bodyStyle}>
          Even though these are tiny slivers of large companies, the platform aggregates your actual
          economic stake — showing exactly how much of the company&apos;s revenue, profit, and cash
          you effectively own.
        </ArgonTypography>
      </div>

      <ArgonTypography variant="body1" style={bodyStyle}>
        The totals at the bottom show the user&apos;s look-through earnings across all holdings:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Total Revenue Exposure: $82,198
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Total Gross Profit: $41,596
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Total Operating Profit: $13,216
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Total Net Income (Look-Through Earnings): $11,011
          </li>
        </ul>
      </ArgonTypography>

      <ArgonTypography variant="body1" style={{ ...bodyStyle, fontWeight: 500, fontSize: 20 }}>
        This means the investor effectively &quot;earned&quot; $11,011 from these businesses —
        regardless of stock price movement — simply by being an owner.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        Instead of relying on dividends or price charts, this approach reveals the true economic
        power of your portfolio: what it actually earns on your behalf.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        At LookThroughProfits.com, we take Buffett&apos;s philosophy and turn it into a real-world
        tool. We generate clear, owner-style reports that show you:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Your proportionate share of each company&apos;s assets, liabilities, equity, income, and
            cash flow
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            A breakdown of retained vs. distributed earnings
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Simple, readable look-through financial statements — as if you owned a private stake in
            each company
          </li>
        </ul>
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        It&apos;s like owning 5% of a laundromat, 2% of a trucking company, and 1% of a software
        business. You wouldn&apos;t take your cousin Bob seriously if he offered you five bucks for
        your laundromat stake — you wouldn&apos;t actually believe it&apos;s worth five bucks. Yet
        that&apos;s exactly how many stock speculators think — they determine the value of a stock
        based solely on what Uncle Bob, or the general market, is willing to pay today. That&apos;s
        not valuation — that&apos;s guesswork. And it&apos;s dangerous.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        You need to focus on how much profit the business actually earned this year — and what
        it&apos;s likely to earn next year — because that&apos;s what determines its true economic
        value. In fact, the value of any business — large or small — is ultimately the present value
        of all future profits it can generate. That&apos;s the foundation of all rational investing.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        If your laundromat earned $100,000 this year, your 5% share means you earned $5,000. If you
        believe it&apos;ll earn $120,000 next year, your expected share rises to $6,000. That&apos;s
        how owners estimate the true value of a business — by projecting the future income it can
        generate, not by reacting to someone&apos;s opinion or mood.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        That&apos;s how a true owner thinks. Just like a business owner, you&apos;d want to know:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            How much are we earning?
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            What did we reinvest this year?
          </li>
        </ul>
        That&apos;s how real owners think. And that&apos;s what we deliver.
      </ArgonTypography>

      {/* Why This Changes How You Evaluate Stocks */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        Why This Changes How You Evaluate Stocks
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        When you use look-through earnings:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            You stop asking &quot;What&apos;s the stock price?&quot;
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            And start asking: &quot;What&apos;s my share of the profits?&quot; &quot;Are those
            profits growing?&quot; &quot;Are they being reinvested wisely?&quot;
          </li>
        </ul>
        That&apos;s how business owners think. That&apos;s how Warren Buffett invests. That&apos;s
        how wealth is built.
      </ArgonTypography>

      {/* Summary: How to Think Like Mr. Lookthrough */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        Summary: How to Think Like Mr. Lookthrough
      </ArgonTypography>

      <div
        style={{
          backgroundColor: "#fafbfc",
          border: "1px solid #e1e5e9",
          borderRadius: 8,
          padding: 24,
          fontSize: 18,
          margin: "24px 0",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 18,
            fontFamily: "'Libre Franklin'",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #bfa14a" }}>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Principle
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Mr. Market
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 8px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Mr. Lookthrough
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e1e5e9" }}>
              <td style={{ padding: "12px 8px", color: "#444e5e", fontWeight: 600 }}>Focus</td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>Price & sentiment</td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>Profits & intrinsic value</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e1e5e9" }}>
              <td style={{ padding: "12px 8px", color: "#444e5e", fontWeight: 600 }}>
                Measurement
              </td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>Daily stock quote</td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>
                Share of total business earnings
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e1e5e9" }}>
              <td style={{ padding: "12px 8px", color: "#444e5e", fontWeight: 600 }}>Emotion</td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>Fear and greed</td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>Patience and rationality</td>
            </tr>
            <tr>
              <td style={{ padding: "12px 8px", color: "#444e5e", fontWeight: 600 }}>Goal</td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>Quick trades and trends</td>
              <td style={{ padding: "12px 8px", color: "#444e5e" }}>
                Long-term wealth from ownership
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={highlightBox}>
        <strong>Final Thought</strong>
        <br />
        <br />
        If you want to succeed in investing, don&apos;t trade stocks — buy businesses.
        <br />
        Forget the ticker. Ignore the headlines. Look through the financial statements — and into
        the business itself.
        <br />
        <br />
        Ask: &quot;What is my share of this business really earning?&quot; &quot;How much of it is
        working for me, every year?&quot;
        <br />
        <br />
        That&apos;s the power of look-through earnings — and the mindset that separates speculators
        from true business owners.
      </div>

      {/* Owner's Earnings Section */}
      <div style={sectionDivider} />
      <ArgonTypography
        variant="h3"
        style={{
          ...headingStyle,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        Owner&apos;s Earnings: The Advanced Layer
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        To go a step deeper, we need to address an important nuance:
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        While Buffett often refers to &quot;earnings&quot; the true value of a business is not based
        on net income alone. In finance, valuation is grounded in:
      </ArgonTypography>
      <div style={highlightBox}>
        <strong>The present value of all future free cash flows.</strong>
      </div>
      <ArgonTypography variant="body1" style={bodyStyle}>
        Cash — not accounting profit — is what matters to owners. But even cash must be considered
        after covering the costs needed to sustain the business.
      </ArgonTypography>
      <ArgonTypography variant="body1" style={bodyStyle}>
        This brings us to owner&apos;s earnings, Buffett&apos;s preferred measure of real economic
        profit.
      </ArgonTypography>

      <div style={exampleBox}>
        <ArgonTypography
          variant="h5"
          style={{
            ...headingStyle,
            fontSize: 22,
            color: "#bfa14a",
            marginBottom: 16,
          }}
        >
          Buffett&apos;s Definition:
        </ArgonTypography>
        <ArgonTypography
          variant="body2"
          style={{ fontSize: 18, color: "#444e5e", lineHeight: 1.6 }}
        >
          Owner&apos;s Earnings = Net Income + Depreciation & Amortization +/– Non-cash or one-time
          adjustments – Maintenance Capital Expenditures
          <br />
          <br />
          Unlike traditional free cash flow, this focuses only on CapEx required to maintain current
          operations — not what&apos;s spent on expansion or acquisitions.
        </ArgonTypography>
      </div>

      <ArgonTypography
        variant="h5"
        style={{
          ...headingStyle,
          fontSize: 22,
          color: "#bfa14a",
          marginBottom: 16,
        }}
      >
        Why Owner&apos;s Earnings Matter:
      </ArgonTypography>
      <ul
        style={{
          marginTop: 16,
          marginBottom: 16,
          marginLeft: 0,
          listStyle: "none",
          paddingLeft: 0,
        }}
      >
        <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
          <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
            •
          </span>
          They show how much cash the business could return to shareholders without shrinking.
        </li>
        <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
          <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
            •
          </span>
          They strip out accounting distortions.
        </li>
        <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
          <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
            •
          </span>
          They form the basis for intrinsic value estimation — what an intelligent buyer would pay
          today for the right to future cash flows.
        </li>
      </ul>

      <ArgonTypography variant="body1" style={bodyStyle}>
        If you expect a business to generate $2 million in owner&apos;s earnings annually, and
        discount those future earnings at a reasonable rate, you can estimate its present value —
        regardless of stock price.
      </ArgonTypography>

      <div style={highlightBox}>
        In short:
        <br />
        Speculators look at today&apos;s price.
        <br />
        <strong>Owners look at tomorrow&apos;s cash.</strong>
      </div>

      <ArgonTypography variant="body1" style={bodyStyle}>
        This advanced layer of look-through investing is what enables analysts and serious investors
        to assess whether a stock is cheap, fair, or overvalued — based on the real economics of
        ownership.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        However, there&apos;s a practical challenge: most 10-Ks and 10-Qs do not explicitly tell you
        how much capital expenditure is used for maintenance vs. growth. That makes it difficult to
        precisely calculate owner&apos;s earnings from public filings alone.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        To address this, LookThroughProfits.com uses a conservative industry-standard proxy: we
        assume depreciation approximates maintenance CapEx unless better disclosures are available.
        This method isn&apos;t perfect, but it provides a disciplined and consistent way to
        approximate the distributable cash that matters most to long-term owners.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        In many cases, this means owner&apos;s earnings ≈ net income, especially for mature
        businesses where:
        <ul
          style={{
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 0,
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Depreciation closely matches the true cost of asset upkeep
          </li>
          <li style={{ marginBottom: 12, position: "relative", paddingLeft: 24 }}>
            <span style={{ position: "absolute", left: 0, color: "#bfa14a", fontWeight: "bold" }}>
              •
            </span>
            Growth CapEx is minimal or disclosed separately
          </li>
        </ul>
        But in other cases — especially asset-heavy or rapidly growing companies — the difference
        can be material.
      </ArgonTypography>

      <ArgonTypography variant="body1" style={bodyStyle}>
        Understanding this relationship helps investors go beyond price charts and accounting
        headlines. It grounds your decisions in real cash economics, which is the cornerstone of
        intelligent, long-term investing.
      </ArgonTypography>

      <ArgonTypography
        variant="body1"
        style={{
          ...bodyStyle,
          fontSize: 20,
          fontWeight: 600,
          textAlign: "center",
          marginTop: 48,
          marginBottom: 0,
          color: "#bfa14a",
        }}
      >
        And at LookThroughProfits.com, we help bring that clarity to every investor.
      </ArgonTypography>
    </ArgonBox>
  );
}

export default LookThroughEarningsManual;
