
export interface Wallet {
  id: string | number;
  user_id: string;
  balance: number;
  currency: string;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string | number;
  wallet_id: string | number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'purchase';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  details?: string;
  created_at: string;
  updated_at?: string;
}

export interface WithdrawalMethod {
  id: string | number;
  user_id: string;
  type: 'bank' | 'card';
  bank_name?: string;
  account_number?: string;
  routing_number?: string;
  account_holder?: string;
  card_last4?: string;
  card_holder?: string;
  expiry_date?: string;
  is_default: boolean;
  created_at: string;
}
