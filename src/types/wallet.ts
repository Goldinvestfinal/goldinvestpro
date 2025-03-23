
export interface WithdrawalMethod {
  id: string;
  user_id?: string;
  method: 'crypto' | 'paypal' | 'bank';
  label: string;
  address: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}
