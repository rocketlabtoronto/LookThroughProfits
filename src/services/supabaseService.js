const SUPABASE_URL = 'https://ioggynmosufvlozhlhta.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZ2d5bm1vc3VmdmxvemhsaHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NjAwNjYsImV4cCI6MjA2ODAzNjA2Nn0.GAeN2VyPAMWaB3GzDswQ2CH2YPpFP2KizRpRNBQbiEE';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

const supabaseService = {
  async getFinancials(filter = {}) {
    let query = '';

    // Convert filter { ticker: 'AAPL', tag: 'Revenue' } → ?ticker=eq.AAPL&tag=eq.Revenue
    const params = Object.entries(filter)
      .map(([key, value]) => `${key}=eq.${encodeURIComponent(value)}`)
      .join('&');

    if (params) {
      query = '?' + params;
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/financials${query}`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      throw new Error(`Supabase error: ${res.status}`);
    }

    return await res.json();
  },

  // You can add more methods here
  async insertFinancialRecord(data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/financials`, {
      method: 'POST',
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
