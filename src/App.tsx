import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import {
  Activity, AlertTriangle, Apple, BadgeIndianRupee, Bell, BriefcaseBusiness, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, CreditCard, Download,
  FileText, Gauge, Gift, Headphones, LayoutDashboard, LogOut, Menu,
  Search, Settings, ShieldCheck, SlidersHorizontal, Users,
  WalletCards, X, UserRound, Building2, ReceiptText, RefreshCw, ScrollText
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import './App.css'
import { businesses, customers, subscriptions, ticketItems, transactions } from './data/demoData'
import {
  completeAuthRedirect,
  getAdminRole,
  isFirebaseConfigured,
  loginWithApple,
  loginWithGoogle,
  logoutFromFirebase,
  observeFirebaseAuth,
  type AdminRole,
} from './services/authService'

type Role = AdminRole

const rupee = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
function Login({ authError }: { authError?: string }) {
  const [error, setError] = useState('')
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null)
  const [remember, setRemember] = useState(true)

  useEffect(() => {
    if (authError) setError(authError)
  }, [authError])

  const handleProviderSignIn = async (provider: 'google' | 'apple') => {
    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Add the Firebase web app values to .env.local and restart the app.')
      return
    }
    setLoadingProvider(provider)
    setError('')
    try {
      if (provider === 'google') await loginWithGoogle(remember)
      else await loginWithApple(remember)
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : `Unable to sign in with ${provider}.`
      setError(message)
      setLoadingProvider(null)
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand">
        <div className="brand-lockup"><span className="brand-mark">S</span><span>SUBBERRY</span></div>
        <div className="login-art">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="login-art-card">
            <ShieldCheck size={34} />
            <strong>Secure platform operations</strong>
            <span>Role-based access for every team</span>
          </div>
        </div>
      </section>
      <section className="login-panel">
        <div className="login-form">
          <div className="mobile-brand brand-lockup"><span className="brand-mark">S</span><span>SUBBERRY</span></div>
          <div className="firebase-banner"><ShieldCheck size={16}/> FIREBASE AUTHENTICATION</div>
          <h1>Welcome back</h1>
          <p className="login-copy">Sign in to manage the Subberry platform.</p>
          {error && <div className="form-error">{error}</div>}
          <div className="login-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label></div>
          <div className="provider-login-buttons">
            <button className="primary-button login-button google-login-button" type="button" onClick={() => handleProviderSignIn('google')} disabled={loadingProvider !== null}>
              <GoogleMark/>{loadingProvider === 'google' ? 'Redirecting to Google...' : 'Continue with Google'}
            </button>
            <button className="primary-button login-button apple-login-button" type="button" onClick={() => handleProviderSignIn('apple')} disabled={loadingProvider !== null}>
              <Apple size={19} fill="currentColor"/>{loadingProvider === 'apple' ? 'Redirecting to Apple...' : 'Continue with Apple'}
            </button>
          </div>
          {!isFirebaseConfigured && <p className="social-setup-note">Firebase is not configured. Add values from Firebase Console to `.env.local`.</p>}
        </div>
      </section>
    </main>
  )
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" width="19" height="19">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" transform="translate(0 5)"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.63 5.92c4.45-4.11 7.15-10.15 7.15-17.57z"/>
    <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19z" transform="translate(0 5)"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.63-5.92c-2.12 1.42-4.84 2.27-8.27 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" transform="translate(0 -5)"/>
  </svg>
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = [
    ['Dashboard', '/', LayoutDashboard], ['Customers', '/customers', Users], ['Businesses', '/businesses', BriefcaseBusiness],
    ['Verification', '/verification', ShieldCheck], ['Subscriptions', '/subscriptions', CreditCard],
    ['Transactions', '/transactions', ReceiptText], ['Loyalty & Discounts', '/loyalty', Gift],
    ['Finance', '/finance', WalletCards], ['Refunds & Disputes', '/refunds', CircleDollarSign],
    ['Fraud & Risk', '/fraud', AlertTriangle], ['Analytics', '/analytics', Activity],
    ['Support', '/support', Headphones], ['Audit Logs', '/audit', ScrollText], ['Settings', '/settings', Settings],
  ] as const
  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="Close menu" onClick={onClose}/>}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand"><span className="brand-mark">S</span><span>SUBBERRY</span><button onClick={onClose} className="sidebar-close"><X size={20}/></button></div>
        <nav>
          {items.map(([label, path, Icon]) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={onClose} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <Icon size={19}/><span>{label}</span>{label === 'Verification' && <b className="nav-count">4</b>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><div className="help-icon"><Headphones size={18}/></div><div><strong>Need help?</strong><span>Contact support</span></div></div>
      </aside>
    </>
  )
}

function Topbar({ role, onMenu, onLogout }: { role: Role; onMenu: () => void; onLogout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="topbar">
      <button className="menu-button" onClick={onMenu}><Menu size={21}/></button>
      <div className="topbar-search"><Search size={17}/><input placeholder="Search customers, businesses, transactions..." /></div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19}/><i /></button>
        <div className="profile-wrap">
          <button className="profile-button" onClick={() => setMenuOpen(v => !v)}><div className="avatar">RK</div><div className="profile-copy"><strong>Rahul Kapoor</strong><span>{role}</span></div><ChevronDown size={16}/></button>
          {menuOpen && <div className="profile-menu"><button onClick={() => setMenuOpen(false)}><UserRound size={16}/> My profile</button><button onClick={onLogout}><LogOut size={16}/> Logout</button></div>}
        </div>
      </div>
    </header>
  )
}

function StatCard({ title, value, change, icon: Icon, tone }: { title: string; value: string; change?: string; icon: typeof Users; tone: string }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={20}/></div><div><span className="stat-title">{title}</span><strong>{value}</strong>{change && <small className={change.startsWith('+') ? 'positive' : 'negative'}>{change}</small>}</div></article>
}

function StatusBadge({ status }: { status: string }) {
  const cls = status.toLowerCase().replaceAll(' ', '-')
  return <span className={`status-badge status-${cls}`}>{status}</span>
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><div className="modal-head"><h3>{title}</h3><button onClick={onClose}><X size={19}/></button></div><div className="modal-body">{children}</div></div></div>
}

function DataTable({ columns, rows, actionLabel = 'View', onAction }: { columns: { key: string; label: string }[]; rows: Record<string, ReactNode>[]; actionLabel?: string; onAction?: (row: Record<string, ReactNode>) => void }) {
  const [page, setPage] = useState(1)
  const pageRows = rows.slice((page - 1) * 8, page * 8)
  const pages = Math.max(1, Math.ceil(rows.length / 8))
  return (
    <div className="table-wrap">
      <table><thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th>Actions</th></tr></thead>
      <tbody>{pageRows.map((row, i) => <tr key={i}>{columns.map(c => <td key={c.key}>{c.key === 'status' ? <StatusBadge status={String(row[c.key])}/> : row[c.key]}</td>)}<td><button className="row-action" onClick={() => onAction?.(row)}>{actionLabel}</button></td></tr>)}</tbody></table>
      {rows.length === 0 && <div className="empty-state"><Search size={28}/><strong>No records found</strong><span>Try changing the search or filters.</span></div>}
      <div className="table-footer"><span>Showing {pageRows.length ? (page - 1) * 8 + 1 : 0}–{Math.min(page * 8, rows.length)} of {rows.length}</span><div className="pagination"><button disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={16}/></button>{Array.from({ length: pages }, (_, i) => i + 1).slice(0, 5).map(p => <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>)}<button disabled={page === pages} onClick={() => setPage(p => p + 1)}><ChevronRight size={16}/></button></div></div>
    </div>
  )
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="page-header"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}

function Toolbar({ search, setSearch, placeholder = 'Search...', filters = [] }: { search: string; setSearch: (v: string) => void; placeholder?: string; filters?: string[] }) {
  return <div className="toolbar"><div className="table-search"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={placeholder}/></div><button className="filter-button"><SlidersHorizontal size={16}/> Filters</button>{filters.map(f => <select key={f} aria-label={f}><option>{f}: All</option></select>)}</div>
}

function exportCsv(filename: string, rows: Record<string, ReactNode>[]) {
  if (!rows.length) return
  const keys = Object.keys(rows[0])
  const csv = [keys.join(','), ...rows.map(row => keys.map(k => `"${String(row[k] ?? '').replaceAll('"', '""')}"`).join(','))].join('\n')
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

function Dashboard() {
  const growth = [
    { name: 'Jun', customers: 720, businesses: 42 }, { name: 'Jul', customers: 980, businesses: 55 },
    { name: 'Aug', customers: 1120, businesses: 68 }, { name: 'Sep', customers: 1480, businesses: 79 },
    { name: 'Oct', customers: 1760, businesses: 92 }, { name: 'Nov', customers: 2140, businesses: 108 },
  ]
  const revenue = [
    { name: 'Jun', revenue: 820 }, { name: 'Jul', revenue: 960 }, { name: 'Aug', revenue: 1120 },
    { name: 'Sep', revenue: 1360 }, { name: 'Oct', revenue: 1580 }, { name: 'Nov', revenue: 1820 },
  ]
  const pie = [{ name: 'Active', value: 78, fill: '#7c5cff' }, { name: 'Expired', value: 22, fill: '#dfe3ef' }]
  return <>
    <PageHeader title="Dashboard" subtitle="Tuesday, 19 November 2026 · Demo data"/>
    <div className="stats-grid">
      <StatCard title="Total customers" value="24,842" change="+12.5%" icon={Users} tone="purple"/>
      <StatCard title="Registered businesses" value="1,248" change="+8.2%" icon={Building2} tone="blue"/>
      <StatCard title="Active memberships" value="18,420" change="+14.1%" icon={CreditCard} tone="green"/>
      <StatCard title="Monthly revenue" value="₹18.2L" change="+9.8%" icon={BadgeIndianRupee} tone="orange"/>
      <StatCard title="Pending approvals" value="38" change="+6 today" icon={ShieldCheck} tone="rose"/>
      <StatCard title="Platform revenue" value="₹4.8L" change="+11.3%" icon={WalletCards} tone="cyan"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel large"><div className="panel-head"><div><h3>Platform growth</h3><p>Customers and businesses</p></div><select defaultValue="6"><option value="6">Last 6 months</option></select></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={growth}><defs><linearGradient id="purple" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c5cff" stopOpacity={.25}/><stop offset="95%" stopColor="#7c5cff" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5"/><XAxis dataKey="name" tickLine={false} axisLine={false}/><YAxis tickLine={false} axisLine={false}/><Tooltip/><Legend/><Area type="monotone" dataKey="customers" stroke="#7c5cff" fill="url(#purple)" strokeWidth={2}/><Area type="monotone" dataKey="businesses" stroke="#42b9a8" fill="transparent" strokeWidth={2}/></AreaChart></ResponsiveContainer></div></section>
      <section className="panel membership-panel"><div className="panel-head"><div><h3>Memberships</h3><p>Status overview</p></div></div><div className="donut"><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={pie} innerRadius={58} outerRadius={78} paddingAngle={3} dataKey="value"/><Tooltip/></PieChart></ResponsiveContainer><div className="donut-center"><strong>78%</strong><span>Active</span></div></div><div className="legend-row"><span><i className="dot purple"/>Active <strong>18,420</strong></span><span><i className="dot grey"/>Expired <strong>5,201</strong></span></div></section>
      <section className="panel chart-panel"><div className="panel-head"><div><h3>Subscription revenue</h3><p>Monthly recurring revenue</p></div></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={revenue}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5"/><XAxis dataKey="name" tickLine={false} axisLine={false}/><YAxis tickFormatter={v => `₹${v}K`} tickLine={false} axisLine={false}/><Tooltip/><Bar dataKey="revenue" fill="#7c5cff" radius={[5,5,0,0]} barSize={26}/></BarChart></ResponsiveContainer></div></section>
      <section className="panel activity-panel"><div className="panel-head"><div><h3>Recent activity</h3><p>Latest platform events</p></div><button className="link-button">View all</button></div><div className="activity-list">
        <div><span className="activity-icon green"><CheckCircle2 size={16}/></span><p><strong>Urban Brew Cafe</strong> application submitted<small>12 minutes ago</small></p></div>
        <div><span className="activity-icon purple"><UserRound size={16}/></span><p><strong>Aarav Sharma</strong> registered<small>28 minutes ago</small></p></div>
        <div><span className="activity-icon orange"><BadgeIndianRupee size={16}/></span><p>Subscription payment of <strong>₹1,499</strong><small>45 minutes ago</small></p></div>
        <div><span className="activity-icon red"><RefreshCw size={16}/></span><p>Refund request for <strong>₹680</strong><small>1 hour ago</small></p></div>
      </div></section>
    </div>
  </>
}

function CustomersPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Record<string, ReactNode> | null>(null)
  const rows = useMemo(() => customers.filter(c => `${c.name} ${c.email} ${c.mobile}`.toLowerCase().includes(search.toLowerCase())).map(c => ({ id: c.id, name: <div className="person"><span>{c.name.slice(0,2).toUpperCase()}</span><strong>{c.name}</strong></div>, email: c.email, mobile: c.mobile, date: c.date, memberships: c.memberships, spend: rupee(c.spend), status: c.status })), [search])
  return <>
    <PageHeader title="Customers" subtitle="Manage customer accounts and loyalty profiles" action={<button className="secondary-button" onClick={() => exportCsv('customers.csv', rows)}><Download size={16}/> Export CSV</button>}/>
    <section className="panel content-panel"><Toolbar search={search} setSearch={setSearch} placeholder="Search name, email or mobile..." filters={['Status', 'Registration date']}/><DataTable columns={[{key:'id',label:'Customer ID'},{key:'name',label:'Name'},{key:'email',label:'Email'},{key:'mobile',label:'Mobile'},{key:'date',label:'Registration date'},{key:'memberships',label:'Memberships'},{key:'spend',label:'Total spending'},{key:'status',label:'Status'}]} rows={rows} onAction={setSelected}/></section>
    {selected && <Modal title="Customer profile" onClose={() => setSelected(null)}><div className="detail-hero"><div className="large-avatar">{String(selected.name).slice(0,2)}</div><div><h3>{selected.name}</h3><p>{String(selected.email)} · {String(selected.mobile)}</p></div></div><div className="detail-grid"><div><span>Total qualifying spend</span><strong>{selected.spend}</strong></div><div><span>Active memberships</span><strong>{selected.memberships}</strong></div><div><span>Account status</span><StatusBadge status={String(selected.status)}/></div></div><h4>Membership activity</h4><p className="muted">Subscription history, payment history, loyalty tier progress and support tickets would load from Firestore.</p><div className="modal-actions"><button className="danger-button" onClick={() => alert('Demo action: account suspension confirmation recorded.')}>Suspend account</button><button className="primary-button" onClick={() => setSelected(null)}>Close</button></div></Modal>}
  </>
}

function BusinessesPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Record<string, ReactNode> | null>(null)
  const rows = useMemo(() => businesses.filter(b => b.name.toLowerCase().includes(search.toLowerCase())).map(b => ({ id:b.id, name:b.name, category:b.category, owner:b.owner, contact:b.contact, date:b.date, status:b.status, branches:b.branches })), [search])
  return <>
    <PageHeader title="Businesses" subtitle="Manage registered merchants and verification" action={<button className="primary-button" onClick={() => alert('Demo: new business application form opened.')}>Add business</button>}/>
    <section className="panel content-panel"><Toolbar search={search} setSearch={setSearch} placeholder="Search business name..." filters={['Category','Verification status']}/><DataTable columns={[{key:'id',label:'Business ID'},{key:'name',label:'Business name'},{key:'category',label:'Category'},{key:'owner',label:'Owner'},{key:'contact',label:'Contact'},{key:'date',label:'Registration date'},{key:'status',label:'Verification'},{key:'branches',label:'Branches'}]} rows={rows} onAction={setSelected}/></section>
    {selected && <Modal title="Business profile" onClose={() => setSelected(null)}><div className="detail-hero"><div className="business-avatar"><Building2 size={24}/></div><div><h3>{selected.name}</h3><p>{String(selected.category)} · Owner: {String(selected.owner)}</p></div></div><div className="detail-grid"><div><span>Contact</span><strong>{selected.contact}</strong></div><div><span>Registered</span><strong>{selected.date}</strong></div><div><span>Verification</span><StatusBadge status={String(selected.status)}/></div></div><h4>Documents & branches</h4><p className="muted">GST, CIN, ownership, address proofs and branch records are available in production review.</p><div className="modal-actions"><button className="danger-button" onClick={() => alert('Demo: suspension confirmation and reason recorded.')}>Suspend</button><button className="primary-button" onClick={() => setSelected(null)}>Close</button></div></Modal>}
  </>
}

function VerificationPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const pending = businesses.filter(b => b.status === 'Pending')
  return <>
    <PageHeader title="Business verification" subtitle="Review applications and submitted documents"/>
    <div className="verification-layout"><section className="panel content-panel"><Toolbar search="" setSearch={() => {}} placeholder="Search pending applications..." filters={['Category']}/><div className="application-list">{pending.length ? pending.map(b => <button key={b.id} className={selected === b.id ? 'application active' : 'application'} onClick={() => setSelected(b.id)}><div className="business-avatar"><Building2 size={20}/></div><div><strong>{b.name}</strong><span>{b.category} · Submitted {b.date}</span></div><ChevronRight size={17}/></button>) : <div className="empty-state">No pending applications</div>}</div></section><section className="panel document-panel"><div className="panel-head"><h3>Document review</h3><StatusBadge status="Pending"/></div>{selected ? <><div className="document-preview"><FileText size={38}/><strong>GST Certificate.pdf</strong><span>Scanned document preview</span><button className="secondary-button" onClick={() => alert('Demo: document opened in secure viewer.')}>Open document</button></div><div className="document-list"><div><span>GSTIN certificate</span><StatusBadge status="Pending"/></div><div><span>Business address proof</span><StatusBadge status="Pending"/></div><div><span>Owner identity proof</span><StatusBadge status="Pending"/></div></div><div className="modal-actions"><button className="danger-button" onClick={() => alert('Demo: rejection reason recorded.')}>Reject</button><button className="primary-button" onClick={() => alert('Demo: business approved and audit entry created.')}>Approve business</button></div></> : <div className="empty-state"><ShieldCheck size={30}/><strong>Select an application</strong><span>Choose a pending business to review documents.</span></div>}</section></div>
  </>
}

function GenericTablePage({ title, subtitle, data, columns, searchPlaceholder, exportName }: { title:string; subtitle:string; data: Record<string, ReactNode>[]; columns:{key:string;label:string}[]; searchPlaceholder:string; exportName:string }) {
  const [search,setSearch] = useState('')
  const [selected,setSelected] = useState<Record<string, ReactNode>|null>(null)
  const rows = data.filter(row => Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase()))
  return <><PageHeader title={title} subtitle={subtitle} action={<button className="secondary-button" onClick={() => exportCsv(exportName,rows)}><Download size={16}/> Export CSV</button>}/><section className="panel content-panel"><Toolbar search={search} setSearch={setSearch} placeholder={searchPlaceholder} filters={['Status','Date']}/><DataTable columns={columns} rows={rows} onAction={setSelected}/></section>{selected && <Modal title={`${title} details`} onClose={() => setSelected(null)}><div className="detail-grid detail-grid-wide">{Object.entries(selected).map(([key,value]) => <div key={key}><span>{key.replace(/([A-Z])/g,' $1')}</span>{key === 'status' ? <StatusBadge status={String(value)}/> : <strong>{value}</strong>}</div>)}</div><div className="modal-actions"><button className="secondary-button" onClick={() => setSelected(null)}>Close</button><button className="primary-button" onClick={() => alert('Demo status update saved.')}>Save update</button></div></Modal>}</>
}

function SubscriptionsPage() {
  const [search,setSearch] = useState('')
  const rows = subscriptions.filter(s => `${s.customer} ${s.business}`.toLowerCase().includes(search.toLowerCase())).map(s => ({ id:s.id, customer:s.customer, business:s.business, plan:s.plan, price:rupee(s.price), period:s.period, start:s.start, renewal:s.renewal, status:s.status }))
  return <><PageHeader title="Subscriptions" subtitle="Monitor memberships, renewals and payment states"/><div className="mini-stats"><div><span>Active memberships</span><strong>18,420</strong></div><div><span>Past due</span><strong>326</strong></div><div><span>Cancelled this month</span><strong>418</strong></div><div><span>Renewal rate</span><strong>84.6%</strong></div></div><section className="panel content-panel"><Toolbar search={search} setSearch={setSearch} placeholder="Search customer or business..." filters={['Subscription status']}/><DataTable columns={[{key:'id',label:'Subscription ID'},{key:'customer',label:'Customer'},{key:'business',label:'Business'},{key:'plan',label:'Plan'},{key:'price',label:'Price'},{key:'period',label:'Billing period'},{key:'start',label:'Start date'},{key:'renewal',label:'Renewal date'},{key:'status',label:'Status'}]} rows={rows}/></section></>
}

function TransactionsPage() {
  const [search,setSearch] = useState('')
  const rows = transactions.filter(t => `${t.id} ${t.customer} ${t.business}`.toLowerCase().includes(search.toLowerCase())).map(t => ({ id:t.id, customer:t.customer, business:t.business, bill:rupee(t.bill), discount:rupee(t.discount), final:rupee(t.final), method:t.method, date:t.date, status:t.status }))
  return <><PageHeader title="Transactions" subtitle="Review transactions, payments and receipts" action={<button className="secondary-button" onClick={() => exportCsv('transactions.csv',rows)}><Download size={16}/> Export CSV</button>}/><section className="panel content-panel"><Toolbar search={search} setSearch={setSearch} placeholder="Search transaction ID, customer or business..." filters={['Status','Business','Date']}/><DataTable columns={[{key:'id',label:'Transaction ID'},{key:'customer',label:'Customer'},{key:'business',label:'Business'},{key:'bill',label:'Bill amount'},{key:'discount',label:'Discount'},{key:'final',label:'Final amount'},{key:'method',label:'Payment method'},{key:'date',label:'Date'},{key:'status',label:'Status'}]} rows={rows}/></section></>
}

function LoyaltyPage() {
  const tiers = [['Starter','₹0','5%'],['Silver','₹5,000','10%'],['Gold','₹15,000','15%'],['Platinum','₹30,000','20%'],['Diamond','₹60,000','25%']]
  return <><PageHeader title="Loyalty & Discounts" subtitle="Programme configurations and inactivity reductions"/><div className="loyalty-layout"><section className="panel loyalty-table"><div className="panel-head"><div><h3>Sample programme tiers</h3><p>Urban Brew Cafe</p></div><button className="secondary-button" onClick={() => alert('Demo: tier configuration editor opened.')}>Edit tiers</button></div><table><thead><tr><th>Tier</th><th>Qualifying spend</th><th>Discount</th></tr></thead><tbody>{tiers.map(t => <tr key={t[0]}><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td><StatusBadge status={t[2]}/></td></tr>)}</tbody></table></section><section className="panel inactivity-card"><div className="panel-head"><div><h3>Inactivity discount rule</h3><p>Business-specific tracking</p></div></div><div className="inactivity-row"><span>Reduction interval</span><strong>1 month</strong></div><div className="inactivity-row"><span>Reduction amount</span><strong>5 percentage points</strong></div><div className="inactivity-row"><span>Minimum discount</span><strong>0%</strong></div><div className="customer-inactivity"><div><span>Customer</span><strong>Aarav Sharma</strong></div><div><span>Original / current</span><strong>20% / 15%</strong></div><div><span>Inactive months</span><strong>1</strong></div><div><span>Last purchase</span><strong>19 Oct 2026</strong></div></div><button className="primary-button" onClick={() => alert('Demo: inactivity policy updated for this business.')}>Update policy</button></section></div></>
}

function FinancePage() {
  const refundData = [{id:'PAY-2026-101',type:'Customer membership',amount:'₹1,499',gateway:'Razorpay',status:'Approved'},{id:'PAY-2026-100',type:'Merchant SaaS',amount:'₹4,999',gateway:'Razorpay',status:'Pending'},{id:'PAY-2026-099',type:'Platform commission',amount:'₹368',gateway:'Cashfree',status:'Approved'}]
  return <><PageHeader title="Finance" subtitle="Payments, settlements and reconciliation"/><div className="stats-grid"><StatCard title="Membership payments" value="₹18.2L" icon={CreditCard} tone="purple"/><StatCard title="Merchant SaaS" value="₹6.4L" icon={Building2} tone="blue"/><StatCard title="Platform commission" value="₹4.8L" icon={BadgeIndianRupee} tone="green"/><StatCard title="Refunds issued" value="₹1.2L" icon={RefreshCw} tone="rose"/></div><section className="panel content-panel"><div className="panel-head"><div><h3>Payment reconciliation</h3><p>Demo records — gateway webhooks required</p></div></div><table><thead><tr><th>Reference</th><th>Category</th><th>Amount</th><th>Gateway</th><th>Status</th></tr></thead><tbody>{refundData.map(r => <tr key={r.id}><td><strong>{r.id}</strong></td><td>{r.type}</td><td>{r.amount}</td><td>{r.gateway}</td><td><StatusBadge status={r.status}/></td></tr>)}</tbody></table></section></>
}

function RefundsPage() {
  const rows = [{id:'RFD-891',customer:'Aarav Sharma',transaction:'TXN-993184',amount:'₹680',reason:'Duplicate charge',status:'Open'},{id:'RFD-887',customer:'Kabir Verma',transaction:'TXN-993166',amount:'₹1,530',reason:'Not satisfied',status:'Pending'}]
  return <GenericTablePage title="Refunds & Disputes" subtitle="Review refund requests and customer disputes" data={rows} columns={[{key:'id',label:'Request ID'},{key:'customer',label:'Customer'},{key:'transaction',label:'Transaction'},{key:'amount',label:'Refund amount'},{key:'reason',label:'Reason'},{key:'status',label:'Status'}]} searchPlaceholder="Search refund or customer..." exportName="refunds.csv"/>
}

function FraudPage() {
  const alerts = [{id:'FRD-2208',type:'Duplicate QR attempt',account:'CUS-1039',severity:'High',status:'Open'},{id:'FRD-2203',type:'Unusual refund pattern',account:'BUS-2072',severity:'Medium',status:'Open'},{id:'FRD-2198',type:'Repeated payment failure',account:'CUS-1041',severity:'Low',status:'Resolved'}]
  return <><PageHeader title="Fraud & Risk Monitoring" subtitle="Investigate suspicious activity without automatic suspension"/><div className="stats-grid"><StatCard title="Open alerts" value="42" icon={AlertTriangle} tone="rose"/><StatCard title="Cases assigned" value="17" icon={UserRound} tone="purple"/><StatCard title="Resolved today" value="8" icon={CheckCircle2} tone="green"/><StatCard title="Escalated" value="3" icon={Gauge} tone="orange"/></div><section className="panel content-panel"><table><thead><tr><th>Alert ID</th><th>Alert type</th><th>Affected account</th><th>Severity</th><th>Status</th><th>Action</th></tr></thead><tbody>{alerts.map(a => <tr key={a.id}><td><strong>{a.id}</strong></td><td>{a.type}</td><td>{a.account}</td><td><StatusBadge status={a.severity}/></td><td><StatusBadge status={a.status}/></td><td><button className="row-action" onClick={() => alert('Demo: case assigned and investigation note started.')}>Review</button></td></tr>)}</tbody></table></section></>
}

function AnalyticsPage() {
  const data = [{name:'Jun',customers:180,renewals:72},{name:'Jul',customers:220,renewals:76},{name:'Aug',customers:310,renewals:81},{name:'Sep',customers:390,renewals:79},{name:'Oct',customers:480,renewals:83},{name:'Nov',customers:560,renewals:85}]
  return <><PageHeader title="Analytics & Reports" subtitle="Platform performance and customer retention" action={<button className="secondary-button" onClick={() => exportCsv('analytics.csv',data)}><Download size={16}/> Export CSV</button>}/><div className="toolbar analytics-toolbar"><select><option>Last 30 days</option><option>Today</option><option>Last 7 days</option><option>Last 90 days</option><option>Custom range</option></select></div><div className="stats-grid"><StatCard title="Retention rate" value="86.4%" icon={Activity} tone="purple"/><StatCard title="Repeat purchase" value="62.8%" icon={RefreshCw} tone="green"/><StatCard title="Savings provided" value="₹8.6L" icon={Gift} tone="orange"/><StatCard title="Refund rate" value="1.24%" icon={CircleDollarSign} tone="rose"/></div><section className="panel chart-panel full-chart"><div className="panel-head"><div><h3>Growth and renewal trend</h3><p>Actual demo metrics</p></div></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5"/><XAxis dataKey="name" tickLine={false} axisLine={false}/><YAxis tickLine={false} axisLine={false}/><Tooltip/><Legend/><Line type="monotone" dataKey="customers" stroke="#7c5cff" strokeWidth={3}/><Line type="monotone" dataKey="renewals" stroke="#42b9a8" strokeWidth={3}/></LineChart></ResponsiveContainer></div></section></>
}

function SupportPage() {
  const [search,setSearch] = useState('')
  const [selected,setSelected] = useState<Record<string, ReactNode>|null>(null)
  const rows = ticketItems.filter(t => `${t.subject} ${t.user}`.toLowerCase().includes(search.toLowerCase())).map(t => ({ id:t.id, subject:t.subject, user:t.user, channel:t.channel, priority:t.priority, status:t.status, assignee:t.assignee }))
  return <><PageHeader title="Support" subtitle="Manage customer and merchant support tickets" action={<button className="primary-button" onClick={() => alert('Demo: support ticket created.')}>Create ticket</button>}/><section className="panel content-panel"><Toolbar search={search} setSearch={setSearch} placeholder="Search tickets..." filters={['Status','Priority']}/><DataTable columns={[{key:'id',label:'Ticket ID'},{key:'subject',label:'Subject'},{key:'user',label:'User'},{key:'channel',label:'Channel'},{key:'priority',label:'Priority'},{key:'status',label:'Status'},{key:'assignee',label:'Assigned to'}]} rows={rows} onAction={setSelected}/></section>{selected && <Modal title={`Ticket ${String(selected.id)}`} onClose={() => setSelected(null)}><h3>{selected.subject}</h3><p className="muted">Submitted by {selected.user} · {selected.channel} channel</p><label className="modal-label">Internal note<textarea defaultValue="" placeholder="Add an internal support note..." /></label><div className="modal-actions"><button className="secondary-button" onClick={() => alert('Demo: ticket assigned.')}>Assign ticket</button><button className="primary-button" onClick={() => alert('Demo: ticket resolved and resolution recorded.')}>Resolve ticket</button></div></Modal>}</>
}

function AuditPage() {
  const rows = [{id:'AUD-9921',admin:'Rahul Kapoor',action:'Business approved',affected:'BUS-2078',date:'19 Nov 2026, 11:18 AM',reason:'Documents verified'},{id:'AUD-9920',admin:'Priya Sharma',action:'Customer suspended',affected:'CUS-1039',date:'19 Nov 2026, 10:05 AM',reason:'Unusual activity investigation'}]
  return <GenericTablePage title="Audit Logs" subtitle="Immutable administrative action history" data={rows} columns={[{key:'id',label:'Action ID'},{key:'admin',label:'Administrator'},{key:'action',label:'Action performed'},{key:'affected',label:'Affected record'},{key:'date',label:'Date & time'},{key:'reason',label:'Reason'}]} searchPlaceholder="Search action or administrator..." exportName="audit-logs.csv"/>
}

function SettingsPage() {
  const [tab,setTab] = useState('Profile')
  const tabs = ['Profile','Admin users','Roles & permissions','Notifications','Platform','Security']
  return <><PageHeader title="Settings" subtitle="Configure the Subberry administration portal"/><div className="settings-layout"><aside className="settings-tabs">{tabs.map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}</aside><section className="panel settings-panel"><div className="panel-head"><h3>{tab}</h3></div>{tab === 'Profile' ? <div className="settings-form"><div className="profile-avatar">RK</div><label>Display name<input defaultValue="Rahul Kapoor"/></label><label>Email<input defaultValue="rahul.kapoor@subberry.in"/></label><label>Role<select defaultValue="Super Admin"><option>Super Admin</option><option>Finance Admin</option><option>Support Admin</option></select></label><button className="primary-button" onClick={() => alert('Demo: profile settings saved.')}>Save changes</button></div> : tab === 'Admin users' ? <div className="admin-users"><div><div className="avatar">PS</div><p><strong>Priya Sharma</strong><span>Support Admin</span></p><StatusBadge status="Active"/></div><div><div className="avatar">AM</div><p><strong>Arnav Mehta</strong><span>Finance Admin</span></p><StatusBadge status="Active"/></div><button className="secondary-button" onClick={() => alert('Demo: invite administrator form opened.')}>Invite administrator</button></div> : <div className="empty-state"><Settings size={30}/><strong>{tab} configuration</strong><span>Demo configuration controls will be connected to Firestore.</span></div>}</section></div></>
}

function AdminLayout({ role, onLogout }: { role: Role; onLogout: () => void }) {
  const [sidebarOpen,setSidebarOpen] = useState(false)
  return <div className="app-shell"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/><div className="main-shell"><Topbar role={role} onMenu={() => setSidebarOpen(true)} onLogout={onLogout}/><main className="page-content"><Routes><Route path="/" element={<Dashboard/>}/><Route path="/customers" element={<CustomersPage/>}/><Route path="/businesses" element={<BusinessesPage/>}/><Route path="/verification" element={<VerificationPage/>}/><Route path="/subscriptions" element={<SubscriptionsPage/>}/><Route path="/transactions" element={<TransactionsPage/>}/><Route path="/loyalty" element={<LoyaltyPage/>}/><Route path="/finance" element={<FinancePage/>}/><Route path="/refunds" element={<RefundsPage/>}/><Route path="/fraud" element={<FraudPage/>}/><Route path="/analytics" element={<AnalyticsPage/>}/><Route path="/support" element={<SupportPage/>}/><Route path="/audit" element={<AuditPage/>}/><Route path="/settings" element={<SettingsPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></main></div></div>
}

export default function App() {
  const isLocalDemoMode = import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get('demo') === 'true'
  const [role,setRole] = useState<Role | null>(isLocalDemoMode ? 'Super Admin' : null)
  const [authLoading,setAuthLoading] = useState(isFirebaseConfigured && !isLocalDemoMode)
  const [authError,setAuthError] = useState('')

  useEffect(() => {
    if (!isFirebaseConfigured || isLocalDemoMode) return
    const unsubscribe = observeFirebaseAuth(async user => {
      if (!user) {
        setRole(null)
        setAuthLoading(false)
        return
      }
      try {
        const verifiedRole = await getAdminRole(user)
        if (!verifiedRole) {
          setAuthError('This account does not have an authorized Subberry admin role.')
          await logoutFromFirebase()
          return
        }
        setAuthError('')
        setRole(verifiedRole)
      } catch (caught) {
        setAuthError(caught instanceof Error ? caught.message : 'Unable to verify the admin role.')
        setRole(null)
      } finally {
        setAuthLoading(false)
      }
    })
    void completeAuthRedirect().catch(caught => {
      setAuthError(caught instanceof Error ? caught.message : 'Social sign-in could not be completed.')
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    if (isLocalDemoMode) {
      window.location.assign(window.location.pathname)
      return
    }
    await logoutFromFirebase()
  }

  if (authLoading) {
    return <main className="auth-loading"><span className="brand-mark">S</span><strong>Verifying admin session...</strong></main>
  }
  return <BrowserRouter>{role ? <>{isLocalDemoMode && <div className="demo-mode-notice">LOCAL DEMO MODE — Firebase authentication is bypassed.</div>}<AdminLayout role={role} onLogout={logout}/></> : <Login authError={authError}/>}</BrowserRouter>
}
