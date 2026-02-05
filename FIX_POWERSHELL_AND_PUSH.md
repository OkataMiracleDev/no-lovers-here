# Fix PowerShell & Push Database Schema

## Issue 1: PowerShell Scripts Disabled

### Fix:
Run this command in PowerShell (as Administrator or current user):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` when prompted.

**What this does:** Allows you to run npm and other scripts in PowerShell.

---

## Issue 2: MongoDB Connection String Missing Database Name

### Your Current String:
```
mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/?appName=no-lovers-here
```

### Correct String:
```
mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/nolovershere?retryWrites=true&w=majority&appName=no-lovers-here
```

**Changes:**
- Added `/nolovershere` (database name)
- Added `?retryWrites=true&w=majority` (required for MongoDB)

---

## Complete Steps to Push Schema

### Step 1: Fix PowerShell (One-time)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 2: Set Database URL
```powershell
$env:DATABASE_URL="mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/nolovershere?retryWrites=true&w=majority&appName=no-lovers-here"
```

### Step 3: Push Schema
```powershell
npm run db:push
```

You should see:
```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": MongoDB database "nolovershere"

🚀  Your database is now in sync with your Prisma schema.

✔ Generated Prisma Client
```

---

## Alternative: Use CMD Instead

If you prefer not to change PowerShell policy, use CMD:

### Step 1: Open CMD (not PowerShell)
Press `Win + R`, type `cmd`, press Enter

### Step 2: Navigate to Project
```cmd
cd "C:\Users\mrmir\Documents\Projects\next Projects\no-lovers-here"
```

### Step 3: Set Database URL
```cmd
set DATABASE_URL=mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/nolovershere?retryWrites=true^&w=majority^&appName=no-lovers-here
```

**Note:** In CMD, use `^&` instead of `&`

### Step 4: Push Schema
```cmd
npm run db:push
```

---

## Update Your .env File

Add this to your `.env` file so you don't need to set it every time:

```bash
DATABASE_URL="mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/nolovershere?retryWrites=true&w=majority&appName=no-lovers-here"
```

Then you can just run:
```powershell
npm run db:push
```

---

## Verify It Works

After pushing schema:

### Test 1: Run Prisma Studio
```powershell
npm run db:studio
```

Should open http://localhost:5555 showing your database.

### Test 2: Run Dev Server
```powershell
npm run dev
```

Visit http://localhost:3000 and test the app.

---

## Troubleshooting

### Still getting execution policy error?
Try running PowerShell as Administrator:
1. Right-click PowerShell
2. "Run as Administrator"
3. Run the Set-ExecutionPolicy command again

### Connection string error?
Make sure:
- Password is correct (`mimi`)
- No spaces in the connection string
- Database name is included (`/nolovershere`)
- Parameters are included (`?retryWrites=true&w=majority`)

### Can't connect to MongoDB?
1. Check MongoDB Atlas dashboard
2. Verify cluster is running
3. Ensure network access allows 0.0.0.0/0
4. Verify database user exists

---

## Quick Reference

### PowerShell (Recommended):
```powershell
# Fix execution policy (one-time)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Set database URL
$env:DATABASE_URL="mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/nolovershere?retryWrites=true&w=majority&appName=no-lovers-here"

# Push schema
npm run db:push
```

### CMD (Alternative):
```cmd
# Set database URL
set DATABASE_URL=mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/nolovershere?retryWrites=true^&w=majority^&appName=no-lovers-here

# Push schema
npm run db:push
```

### .env File (Best):
Add to `.env`:
```
DATABASE_URL="mongodb+srv://admin:mimi@no-lovers-here.9ls50u6.mongodb.net/nolovershere?retryWrites=true&w=majority&appName=no-lovers-here"
```

Then just run:
```
npm run db:push
```

---

## Next Steps

After successful schema push:
1. ✅ Test locally: `npm run dev`
2. ✅ Test database: `npm run db:studio`
3. ✅ Deploy to Vercel/Render
4. ✅ Add same DATABASE_URL to deployment platform
5. ✅ Test in production

**You're almost there!** 🚀
