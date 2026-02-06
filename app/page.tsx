'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<{ amount: number; type: string } | null>(null);
  const [menPrice, setMenPrice] = useState(18000);
  const [womenPrice, setWomenPrice] = useState(8000);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setMenPrice(data.menTicketPrice);
        setWomenPrice(data.womenTicketPrice);
      })
      .catch(() => {
        // Use defaults if fetch fails
      });
  }, []);

  const openEmailModal = (amount: number, ticketType: string) => {
    setSelectedTicket({ amount, type: ticketType });
    setQuantity(1);
    setShowEmailModal(true);
  };

  const handlePayment = () => {
    if (!email || !name || !selectedTicket) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Check if Paystack is loaded
    if (typeof window === 'undefined' || !(window as any).PaystackPop) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }
    
    setIsPaymentLoading(true);
    setShowEmailModal(false);
    
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    
    if (!paystackKey) {
      alert('Payment configuration error. Please contact support.');
      setIsPaymentLoading(false);
      return;
    }
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handler = (window as any).PaystackPop.setup({
        key: paystackKey,
        email: email,
        amount: selectedTicket.amount * quantity * 100,
        currency: 'NGN',
        ref: 'NLH_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: { 
          custom_fields: [
            { display_name: "Ticket", variable_name: "ticket", value: selectedTicket.type },
            { display_name: "Name", variable_name: "name", value: name },
            { display_name: "Quantity", variable_name: "quantity", value: quantity.toString() }
          ]
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: function(response: any) {
          // Verify payment
          fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: response.reference })
          })
          .then(res => res.json())
          .then(data => {
            setIsPaymentLoading(false);
            if (data.success) {
              setShowSuccessModal(true);
              setEmail('');
              setName('');
              setQuantity(1);
            } else {
              alert('Payment verification failed. Please contact support with reference: ' + response.reference);
            }
          })
          .catch(() => {
            setIsPaymentLoading(false);
            alert('Error verifying payment. Please contact support with reference: ' + response.reference);
          });
        },
        onClose: function() {
          setIsPaymentLoading(false);
        }
      });
      handler.openIframe();
    } catch (error) {
      console.error('Paystack error:', error);
      alert('Error initializing payment. Please refresh and try again.');
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in duration-300">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Payment Successful!
            </h2>
            <p className="text-gray-600 text-center mb-6 text-lg">
              Your ticket has been sent to your email
            </p>

            {/* Details */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Check your inbox</p>
                  <p className="text-gray-900 font-semibold">Ticket sent via email</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Your QR code</p>
                  <p className="text-gray-900 font-semibold">Ready for entry</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Got it!
            </button>

            {/* Additional Info */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Can't find the email? Check your spam folder
            </p>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-black mb-2">Complete Your Purchase</h3>
            <p className="text-gray-600 mb-6">
              {selectedTicket?.type} Ticket • ₦{((selectedTicket?.amount || 0) * quantity).toLocaleString()}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Number of Tickets</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="10"
                    className="w-20 px-4 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">(Max: 10)</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!email || !name || isPaymentLoading}
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPaymentLoading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your ticket will be sent to your email after payment
            </p>
          </div>
        </div>
      )}

      {/* Minimal Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/logo.png" alt="NLH" width={60} height={20} className="object-contain" unoptimized />
          <a href="#tickets" className="px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
            Get Tickets
          </a>
        </div>
      </nav>

      {/* Hero - Clean & Minimal */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Feb 14, 2026 • 9PM
            </div>
            <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
              NO LOVERS<br/>HERE
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              An exclusive 18+ experience. No romance, no pretense—just raw energy and connection.
            </p>
          </div>

          {/* Hero Image Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image src="/1.jpg" alt="Event" fill className="object-cover" />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image src="/2.jpg" alt="Event" fill className="object-cover" />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image src="/3.jpg" alt="Event" fill className="object-cover" />
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="text-center">
              <p className="text-gray-400 uppercase tracking-wider mb-1">Location</p>
              <p className="font-semibold">Port Harcourt</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 uppercase tracking-wider mb-1">Age</p>
              <p className="font-semibold">18+ Only</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 uppercase tracking-wider mb-1">Dress</p>
              <p className="font-semibold">Provocative</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Simple Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl">
              <div className="text-4xl mb-4">🎧</div>
              <h3 className="text-xl font-bold mb-2">DJ Eros</h3>
              <p className="text-gray-600">Hypnotic beats all night</p>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="text-4xl mb-4">🍸</div>
              <h3 className="text-xl font-bold mb-2">Premium Bar</h3>
              <p className="text-gray-600">Curated cocktails</p>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Intimate Vibes</h3>
              <p className="text-gray-600">Connection spaces</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flyer - MUCH SMALLER */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Event Details</h2>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image src="/flyer.png" alt="Event Flyer" width={400} height={300} className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Tickets - Clean Design */}
      <section id="tickets" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Get Your Ticket</h2>
            <p className="text-gray-600">Limited capacity. Don&apos;t miss out.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Men */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-600 transition-colors">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase rounded-full">Men</span>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-black mb-2">₦{menPrice.toLocaleString()}</div>
                <p className="text-gray-500">Per ticket</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full event access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium bar
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Location reveal
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All-night experience
                </li>
              </ul>
              <button
                onClick={() => openEmailModal(menPrice, 'Men')}
                disabled={isPaymentLoading}
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            {/* Women */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-600 transition-colors">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase rounded-full">Women</span>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-black mb-2">₦{womenPrice.toLocaleString()}</div>
                <p className="text-gray-500">Per ticket</p>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full event access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium bar
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Location reveal
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All-night experience
                </li>
              </ul>
              <button
                onClick={() => openEmailModal(womenPrice, 'Women')}
                disabled={isPaymentLoading}
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          </div>

          <p className="text-center text-amber-600 text-sm mt-6">
            ⚠️ Limited spots. Prices may increase.
          </p>
        </div>
      </section>

      {/* Rules - Minimal */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">The Rules</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🔞</span>
                <div>
                  <h3 className="font-bold mb-1">18+ Only</h3>
                  <p className="text-sm text-gray-600">Valid ID required</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🎫</span>
                <div>
                  <h3 className="font-bold mb-1">No Ticket, No Entry</h3>
                  <p className="text-sm text-gray-600">Pre-purchase required</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🤫</span>
                <div>
                  <h3 className="font-bold mb-1">Discretion</h3>
                  <p className="text-sm text-gray-600">What happens here, stays here</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🤝</span>
                <div>
                  <h3 className="font-bold mb-1">Consent</h3>
                  <p className="text-sm text-gray-600">Mutual respect always</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Clean */}
      <footer className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <Image src="/logo.png" alt="NLH" width={140} height={45} className="mx-auto mb-8 object-contain" unoptimized />
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Questions?</h3>
            <a href="tel:09034399874" className="text-red-600 text-lg font-semibold hover:text-red-700">
              📞 0903 439 9874
            </a>
          </div>
          <a 
            href="https://wa.me/2349034399874" 
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            💬 WhatsApp Us
          </a>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">© 2026 NO LOVERS HERE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
