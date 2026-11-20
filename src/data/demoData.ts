export type Status = 'Active' | 'Pending' | 'Verified' | 'Suspended' | 'Expired' | 'Cancelled' | 'Failed' | 'Approved' | 'Rejected' | 'Open' | 'Resolved'

export const customers = [
  { id: 'CUS-1042', name: 'Aarav Sharma', email: 'aarav.sharma@email.com', mobile: '+91 98765 43210', date: '18 Nov 2026', memberships: 3, spend: 84250, status: 'Active' as Status },
  { id: 'CUS-1041', name: 'Diya Patel', email: 'diya.patel@email.com', mobile: '+91 99876 54321', date: '17 Nov 2026', memberships: 2, spend: 46750, status: 'Active' as Status },
  { id: 'CUS-1039', name: 'Kabir Verma', email: 'kabir.verma@email.com', mobile: '+91 97654 32109', date: '16 Nov 2026', memberships: 1, spend: 18200, status: 'Suspended' as Status },
  { id: 'CUS-1037', name: 'Ananya Iyer', email: 'ananya.iyer@email.com', mobile: '+91 96543 21098', date: '15 Nov 2026', memberships: 4, spend: 126800, status: 'Active' as Status },
  { id: 'CUS-1035', name: 'Rohan Mehta', email: 'rohan.mehta@email.com', mobile: '+91 95432 10987', date: '14 Nov 2026', memberships: 2, spend: 32150, status: 'Pending' as Status },
]

export const businesses = [
  { id: 'BUS-2081', name: 'Urban Brew Cafe', category: 'Food & Beverage', owner: 'Neha Kapoor', contact: '+91 98111 22334', date: '18 Nov 2026', status: 'Pending' as Status, branches: 3 },
  { id: 'BUS-2078', name: 'FitZone Studios', category: 'Health & Fitness', owner: 'Arjun Malhotra', contact: '+91 98222 33445', date: '17 Nov 2026', status: 'Verified' as Status, branches: 5 },
  { id: 'BUS-2075', name: 'The Groom Room', category: 'Beauty & Grooming', owner: 'Sana Ali', contact: '+91 98333 44556', date: '15 Nov 2026', status: 'Verified' as Status, branches: 2 },
  { id: 'BUS-2072', name: 'Fresh Basket', category: 'Retail', owner: 'Vikram Singh', contact: '+91 98444 55667', date: '14 Nov 2026', status: 'Rejected' as Status, branches: 8 },
]

export const subscriptions = [
  { id: 'SUB-8841', customer: 'Aarav Sharma', business: 'Urban Brew Cafe', plan: 'Gold Monthly', price: 1499, period: 'Monthly', start: '18 Oct 2026', renewal: '18 Nov 2026', status: 'Active' as Status },
  { id: 'SUB-8838', customer: 'Diya Patel', business: 'FitZone Studios', plan: 'Annual Elite', price: 8999, period: 'Yearly', start: '12 Apr 2026', renewal: '12 Apr 2027', status: 'Active' as Status },
  { id: 'SUB-8832', customer: 'Kabir Verma', business: 'The Groom Room', plan: 'Premium', price: 2499, period: 'Monthly', start: '10 Nov 2026', renewal: '10 Dec 2026', status: 'Failed' as Status },
  { id: 'SUB-8829', customer: 'Ananya Iyer', business: 'Fresh Basket', plan: 'Family Plus', price: 3999, period: 'Quarterly', start: '01 Sep 2026', renewal: '01 Dec 2026', status: 'Expired' as Status },
]

export const transactions = [
  { id: 'TXN-993184', customer: 'Aarav Sharma', business: 'Urban Brew Cafe', bill: 2450, discount: 367, final: 2083, method: 'UPI', date: '19 Nov 2026, 10:42 AM', status: 'Approved' as Status },
  { id: 'TXN-993179', customer: 'Diya Patel', business: 'FitZone Studios', bill: 5200, discount: 520, final: 4680, method: 'Card', date: '19 Nov 2026, 09:18 AM', status: 'Approved' as Status },
  { id: 'TXN-993166', customer: 'Kabir Verma', business: 'The Groom Room', bill: 1800, discount: 270, final: 1530, method: 'Cash', date: '18 Nov 2026, 06:32 PM', status: 'Failed' as Status },
]

export const ticketItems = [
  { id: 'TKT-7721', subject: 'Unable to apply loyalty discount', user: 'Aarav Sharma', channel: 'Customer', priority: 'High', status: 'Open' as Status, assignee: 'Priya S.' },
  { id: 'TKT-7718', subject: 'GST invoice correction', user: 'Urban Brew Cafe', channel: 'Merchant', priority: 'Medium', status: 'Resolved' as Status, assignee: 'Rahul K.' },
  { id: 'TKT-7715', subject: 'Payment deducted twice', user: 'Diya Patel', channel: 'Customer', priority: 'High', status: 'Open' as Status, assignee: 'Unassigned' },
]
