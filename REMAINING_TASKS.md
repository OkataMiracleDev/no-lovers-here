# Remaining Tasks to Complete

## ✅ What's Already Done

1. ✅ Payment initialization fixed
2. ✅ QR codes in emails (scannable with name, email, ticket type)
3. ✅ Delete tickets API endpoint created
4. ✅ Dynamic pricing working
5. ✅ Email copywriting improved
6. ✅ Venue location added to emails
7. ✅ Improved scan error messages

## 🔄 What's Left (3 Tasks)

### Task 1: Add Sold-Out Display to Frontend

**File:** `app/page.tsx`

**What to add:**
1. Fetch current ticket counts from `/api/settings`
2. Check if `menTicketsSold >= maxTickets` or `womenTicketsSold >= maxTickets`
3. Show "SOLD OUT" badge when limit reached
4. Disable "Buy Now" button

**Code snippet to add:**
```typescript
// In the component
const [soldOut, setSoldOut] = useState({ men: false, women: false });

// In useEffect where you fetch prices
useEffect(() => {
  fetch('/api/settings')
    .then(res => res.json())
    .then(data => {
      setMenPrice(data.menTicketPrice);
      setWomenPrice(data.womenTicketPrice);
      // Check sold out status
      setSoldOut({
        men: data.menTicketsSold >= data.maxTickets,
        women: data.womenTicketsSold >= data.maxTickets
      });
    });
}, []);

// In the ticket cards, replace Buy Now button with:
{soldOut.men ? (
  <div className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg text-center">
    SOLD OUT
  </div>
) : (
  <button onClick={() => openEmailModal(menPrice, 'Men')} ...>
    Buy Now
  </button>
)}
```

---

### Task 2: Add Camera Scanning to Admin

**Step 1: Install QR Scanner Library**
```bash
npm install html5-qrcode
```

**Step 2: Add Camera Component to Admin**

In `app/admin/page.tsx`, add camera scanning UI in the Scan tab:

```typescript
import { Html5QrcodeScanner } from 'html5-qrcode';

// Add state
const [scanning, setScanning] = useState(false);

// Add scanner function
const startScanner = () => {
  setScanning(true);
  const scanner = new Html5QrcodeScanner(
    "qr-reader",
    { fps: 10, qrbox: 250 },
    false
  );
  
  scanner.render((decodedText) => {
    scanner.clear();
    setScanning(false);
    setScanInput(decodedText);
    scanTicket();
  }, (error) => {
    console.log(error);
  });
};

// In the Scan tab JSX:
<div>
  <button onClick={startScanner} className="...">
    📷 Scan with Camera
  </button>
  <div id="qr-reader" style={{ width: '100%' }}></div>
</div>
```

---

### Task 3: Add Delete Button to Admin Tickets Table

**File:** `app/admin/page.tsx`

**In the tickets table, add a delete column:**

```typescript
// Add delete function
const deleteTicket = async (ticketId: string) => {
  if (!confirm('Are you sure you want to delete this ticket?')) return;
  
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

// In the table header, add:
<th className="text-left py-3 px-4 text-gray-600 text-sm font-semibold">Actions</th>

// In the table body, add:
<td className="py-3 px-4">
  <button
    onClick={() => deleteTicket(ticket.id)}
    className="text-red-600 hover:text-red-800 font-semibold text-sm"
  >
    Delete
  </button>
</td>
```

---

## 🚀 Quick Implementation Guide

### Option A: Do It Yourself
1. Make the changes above
2. Test locally
3. Commit and push
4. Vercel will auto-deploy

### Option B: I Can Help
Let me know and I'll implement all three tasks for you right now!

---

## 📋 Testing Checklist

After implementing:

- [ ] Test payment with test card
- [ ] Check email has QR code with name/email/type
- [ ] Scan QR code with phone - should work
- [ ] Test sold-out display (set max tickets to current count)
- [ ] Test camera scanning in admin
- [ ] Test manual ID scanning in admin
- [ ] Test deleting a ticket
- [ ] Verify ticket count decreases after delete
- [ ] Test price changes reflect on frontend

---

## 💡 Notes

- Camera scanning requires HTTPS (works on Vercel, not on localhost without setup)
- QR codes in emails are base64 data URLs - they work in all email clients
- Delete is permanent - no undo (consider adding soft delete later)
- Sold-out check happens on page load - users need to refresh to see updates

---

## ✅ When Complete

All 8 original issues will be fully resolved:
1. ✅ Payment error - FIXED
2. ✅ QR code in emails - FIXED
3. ✅ Camera scanning - PENDING (Task 2)
4. ✅ Delete tickets - PENDING (Task 3)
5. ✅ Dynamic pricing - FIXED
6. ✅ Ticket limits - PENDING (Task 1)
7. ✅ Email copywriting - FIXED
8. ✅ Venue location - FIXED

**Would you like me to implement the remaining 3 tasks now?**
