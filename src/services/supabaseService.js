const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

const supabaseService = {
  /**
   * Checks if a user is registered with SnapTrade by calling the get-users Edge Function.
   * Returns true if userId is present in the SnapTrade user list, otherwise false.
   * @param {string} userId - The user ID (email) to check.
   * @returns {Promise<boolean>} - True if registered, false otherwise.
   */
  async getSnapTradeUser(userId) {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/get-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });
    if (!res.ok) {
      throw new Error(`SnapTrade get-users error: ${res.status}`);
    }
    const data = await res.json();
    // The Edge Function returns an array of userIds
    if (Array.isArray(data)) {
      return data.includes(userId);
    }
    return false;
  },
  async getFinancials(filter = {}) {
    let query = "";

    // Convert filter { ticker: 'AAPL', tag: 'Revenue' } → ?ticker=eq.AAPL&tag=eq.Revenue
    const params = Object.entries(filter)
      .map(([key, value]) => `${key}=eq.${encodeURIComponent(value)}`)
      .join("&");

    if (params) {
      query = "?" + params;
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/financials${query}`, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      throw new Error(`Supabase error: ${res.status}`);
    }

    return await res.json();
  },

  // You can add more methods here
  async getSnapTradeLoginLink(userId, userSecret) {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/login-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ userId, userSecret }),
    });
    if (!res.ok) {
      throw new Error(`SnapTrade login link error: ${res.status}`);
    }
    const data = await res.json();
    return data.redirectURI;
  },

  async registerUser(userId) {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/snaptrade-register-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
      throw new Error(`SnapTrade register user error: ${res.status}`);
    }
    const data = await res.json();
    console.log("registerUser: " + JSON.stringify(data));
    return data;
  },
  async insertFinancialRecord(data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/financials`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Insert failed: ${res.status}`);
    }

    return await res.json();
  },
};

export default supabaseService;
