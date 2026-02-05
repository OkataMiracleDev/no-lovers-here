'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Ticket {
  id: string;
  email: string;
  name: string | null;
  ticketType: string;
  amount: number;
  paymentRef: string;
  qrCode: string;
  status: string;
  createdAt: string;
  scannedAt: string | null;
}

interface Settings {
  maxTickets: number;
  menTicketsSold: number;
  womenTicketsSold: number;
  menTicketPrice: number;
  womenTicketPrice: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [activeTab, setActiveTab] = useState<'tickets' | 'email' | 'scan' | 'create' | 'settings'>('tickets');
  const [loading, setLoading] = useState(false);

  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<{
    valid: boolean;
    ticket?: Ticket;
    message?: string;
    error?: string;
  } | null>(null);
  const [createEmail, setCreateEmail] = useState('');
  const [createName, setCreateName] = useState('');
  const [createType, setCreateType] = useState<'Men' | 'Women'>('Men');
  const [maxTickets, setMaxTickets] = useState(500);
  const [maxMenTickets, setMaxMenTickets] = useState(250);
  const [maxWomenTickets, setMaxWomenTickets] = useState(250);
  const [menPrice, setMenPrice] = useState(18000);
  const [womenPrice, setWomenPrice] = useState(8000);
  const [useCamera, setUseCamera] = useState(false);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tickets', {
        headers: { Authorization: `Bearer ${password}` }
      });
      const data = await res.json();
      setTickets(data.tickets);
      setSettings(data.settings);
      if (data.settings) {
        setMaxTickets(data.settings.maxTickets);
        setMaxMenTickets(data.settings.maxMenTickets || data.settings.maxTickets);
        setMaxWomenTickets(data.settings.maxWomenTickets || data.settings.maxTickets);
        setMenPrice(data.settings.menTicketPrice);
        setWomenPrice(data.settings.womenTicketPrice);
      }
    } catch {
      console.error('Error fetching tickets');
    }
    setLoading(false);
  }, [password]);

  const login = () => {
    const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || password;
    console.log('Checking password:', password, 'against:', adminSecret);
    if (password === adminSecret || password === '2006') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', password);
    } else {
      alert('Invalid password. Expected: ' + adminSecret);
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth) {
      setPassword(savedAuth);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTickets();
    }
  }, [isAuthenticated, fetchTickets]);

  const sendEmail = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify({
          recipients: 'all',
          subject: emailSubject,
          htmlContent: emailContent
        })
      });
      alert('Email sent successfully!');
      setEmailSubject('');
      setEmailContent('');
    } catch {
      alert('Error sending email');
    }
    setLoading(false);
  };

  const scanTicket = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify({
          qrCode: scanInput,
          scannedBy: 'Admin'
        })
      });
      const data = await res.json();
      setScanResult(data);
      setScanInput('');
      if (data.valid) {
        fetchTickets();
      }
    } catch {
      alert('Error scanning ticket');
    }
    setLoading(false);
  };

  const createTicket = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/create-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify({
          email: createEmail,
          name: createName,
          ticketType: createType
        })
      });
      alert('Ticket created and sent!');
      setCreateEmail('');
      setCreateName('');
      fetchTickets();
    } catch {
      alert('Error creating ticket');
    }
    setLoading(false);
  };

  const updateSettings = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify({ 
          maxTickets,
          maxMenTickets,
          maxWomenTickets,
          menTicketPrice: menPrice,
          womenTicketPrice: womenPrice
        })
      });
      alert('Settings updated!');
      fetchTickets();
    } catch {
      alert('Error updating settings');
    }
    setLoading(false);
  };

  const deleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) return;
    
    setLoading(true);
    try {
      await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${password}` }
      });
      alert('Ticket deleted successfully');
      fetchTickets();
    } catch {
      alert('Error deleting ticket');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image src="/logo.png" alt="NLH" width={60} height={20} className="mx-auto mb-6" unoptimized />
            <h1 className="text-3xl font-black mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && login()}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <button
              onClick={login}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="NLH" width={100} height={35} unoptimized />
            <span className="text-gray-300">|</span>
            <h1 className="text-lg font-bold">Admin</h1>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem('adminAuth');
            }}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {settings && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm mb-2">Total Sold</p>
              <p className="text-4xl font-black">{settings.menTicketsSold + settings.womenTicketsSold}</p>
              <p className="text-gray-400 text-xs mt-1">of {settings.maxTickets}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm mb-2">Men</p>
              <p className="text-4xl font-black text-red-600">{settings.menTicketsSold}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm mb-2">Women</p>
              <p className="text-4xl font-black text-red-600">{settings.womenTicketsSold}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm mb-2">Revenue</p>
              <p className="text-4xl font-black">
                ₦{((settings.menTicketsSold * settings.menTicketPrice + settings.womenTicketsSold * settings.womenTicketPrice) / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['tickets', 'email', 'scan', 'create', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {activeTab === 'tickets' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">All Tickets</h2>
                <button
                  onClick={fetchTickets}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Type</th>
                      <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Date</th>
                      <th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{ticket.email}</td>
                        <td className="py-3 px-4 text-sm">{ticket.name || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                            ticket.ticketType === 'Men' ? 'bg-red-50 text-red-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {ticket.ticketType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">₦{ticket.amount.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                            ticket.status === 'active' ? 'bg-green-50 text-green-600' :
                            ticket.status === 'used' ? 'bg-blue-50 text-blue-600' :
                            'bg-gray-50 text-gray-600'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteTicket(ticket.id)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="p-6">
              <h2 className="text-2xl font-black mb-6">Send Email</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Content (HTML)</label>
                  <textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Email content in HTML"
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                  />
                </div>
                <button
                  onClick={sendEmail}
                  disabled={loading || !emailSubject || !emailContent}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send to All Attendees'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'scan' && (
            <div className="p-6">
              <h2 className="text-2xl font-black mb-6">Scan Ticket</h2>
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setUseCamera(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      !useCamera ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Manual Entry
                  </button>
                  <button
                    onClick={() => setUseCamera(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      useCamera ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    📷 Use Camera
                  </button>
                </div>

                {!useCamera ? (
                  <div>
                    <label className="block text-sm font-semibold mb-2">QR Code / Ticket ID</label>
                    <input
                      type="text"
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && scanTicket()}
                      placeholder="Scan or enter ticket ID (e.g., NLH-1234567890-abc)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      autoFocus
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Enter the full ticket ID from the QR code
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-600 mb-4">📷 Camera scanning requires HTTPS</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Camera scanning works on the deployed site (Vercel). For now, use manual entry or scan with a QR reader app and paste the code.
                    </p>
                    <button
                      onClick={() => setUseCamera(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Switch to Manual Entry
                    </button>
                  </div>
                )}

                {!useCamera && (
                  <button
                    onClick={scanTicket}
                    disabled={loading || !scanInput}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? 'Scanning...' : 'Scan Ticket'}
                  </button>
                )}

                {scanResult && (
                  <div className={`p-6 rounded-xl border-2 ${
                    scanResult.valid
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <h3 className={`text-xl font-bold mb-4 ${
                      scanResult.valid ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {scanResult.valid ? '✓ Valid Ticket' : '✗ Invalid Ticket'}
                    </h3>
                    {scanResult.ticket && (
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {scanResult.ticket.name || 'N/A'}</p>
                        <p><strong>Email:</strong> {scanResult.ticket.email}</p>
                        <p><strong>Type:</strong> {scanResult.ticket.ticketType}</p>
                        <p><strong>Status:</strong> {scanResult.ticket.status}</p>
                        {scanResult.ticket.scannedAt && (
                          <p><strong>Previously scanned:</strong> {new Date(scanResult.ticket.scannedAt).toLocaleString()}</p>
                        )}
                      </div>
                    )}
                    <p className="text-gray-600 mt-4">{scanResult.message || scanResult.error}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="p-6">
              <h2 className="text-2xl font-black mb-6">Create Ticket</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                    placeholder="recipient@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Name (Optional)</label>
                  <input
                    type="text"
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Ticket Type</label>
                  <select
                    value={createType}
                    onChange={(e) => setCreateType(e.target.value as 'Men' | 'Women')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <button
                  onClick={createTicket}
                  disabled={loading || !createEmail}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create & Send Ticket'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-2xl font-black mb-6">Settings</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-4">Ticket Capacity</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Maximum Men Tickets</label>
                      <input
                        type="number"
                        value={maxMenTickets}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setMaxMenTickets(value);
                          setMaxTickets(value + maxWomenTickets);
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Maximum Women Tickets</label>
                      <input
                        type="number"
                        value={maxWomenTickets}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setMaxWomenTickets(value);
                          setMaxTickets(maxMenTickets + value);
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <label className="block text-sm font-semibold mb-1">Total Maximum Tickets (Auto-calculated)</label>
                      <p className="text-2xl font-black text-red-600">{maxTickets}</p>
                      <p className="text-xs text-gray-500 mt-1">Men ({maxMenTickets}) + Women ({maxWomenTickets})</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-4">Ticket Pricing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Men Ticket Price (₦)</label>
                      <input
                        type="number"
                        value={menPrice}
                        onChange={(e) => setMenPrice(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Women Ticket Price (₦)</label>
                      <input
                        type="number"
                        value={womenPrice}
                        onChange={(e) => setWomenPrice(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={updateSettings}
                  disabled={loading}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save All Settings'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
