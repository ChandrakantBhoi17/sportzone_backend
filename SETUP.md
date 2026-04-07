# Backend Setup & Database Seeding Guide

## Prerequisites

1. MongoDB instance running (local or Atlas)
2. Node.js and npm installed
3. Backend environment variables configured

## Setup Steps

### 1. Configure Environment Variables

Create `.env` file in `/backend` directory:

```bash
cd /Users/chandrakantabhoi/sportzone/backend

# Create .env file
cat > .env << 'EOF'
MONGO_URI=mongodb://localhost:27017/sportzone
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sportzone

PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
EOF
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build TypeScript

```bash
npm run build
```

### 4. Seed Database with Products

```bash
npm run seed
```

Expected output:
```
Connected to MongoDB
Cleared existing products
Seeded 26 products
```

### 5. Start Backend Server

```bash
npm start
# Server runs at: http://localhost:5000
```

## Seed Script Details

**Location**: `backend/scripts/seed.ts`

**What it does**:
1. Connects to MongoDB using `MONGO_URI`
2. Clears existing products
3. Inserts 26 sport products across 7 categories
4. Closes database connection

**Products Seeded**:
- ✅ Running (4 shoes)
- ✅ Basketball (4 shoes)
- ✅ Football (4 boots)
- ✅ Tennis (4 shoes)
- ✅ Swimming (3 items)
- ✅ Gym (3 shoes)
- ✅ Cycling (4 items)

## Available NPM Scripts

```bash
npm start           # Start backend server
npm run dev         # Start with nodemon (auto-reload)
npm run build       # Compile TypeScript
npm run seed        # Seed database with products
npm run lint        # Run ESLint
```

## MongoDB Collections

After seeding, you'll have:

### Products Collection
```
{
  _id: ObjectId,
  id: Number,
  name: String,
  price: Number,
  originalPrice: Number,
  description: String,
  material: String (Nike|Adidas|Puma|Under Armour),
  category: String (Running|Basketball|Football|Tennis|Swimming|Gym|Cycling),
  weight: String,
  image: String (URL),
  rating: Number (0-5),
  reviews: Number,
  dailyWear: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Products API

Get all products:
```
GET /api/products
```

Get by category:
```
GET /api/products?category=Running
```

Get by price range:
```
GET /api/products?minPrice=5000&maxPrice=15000
```

Get single product:
```
GET /api/products/1
```

Combined query:
```
GET /api/products?category=Running&minPrice=10000&maxPrice=20000
```

## Troubleshooting

### Issue: "MONGO_URI not defined"
**Solution**: Check `.env` file exists and `MONGO_URI` is set

### Issue: "Connection refused"
**Solution**: Ensure MongoDB is running:
```bash
# macOS
brew services start mongodb-community

# Or start MongoDB locally
mongod
```

### Issue: "Collection already exists"
**Solution**: The seed script clears products before inserting. If issues persist:
```bash
# Connect to MongoDB
mongosh

# Select database
use sportzone

# Drop collection
db.products.drop()

# Re-run seed
npm run seed
```

### Issue: Products not appearing in frontend
**Solution**: 
1. Check backend is running on port 5000
2. Verify proxy in `frontend/package.json`
3. Check CORS configuration
4. Ensure products were seeded: `db.products.countDocuments()`

## Next Steps

1. ✅ Backend running on port 5000
2. ✅ Products seeded to MongoDB
3. ✅ Frontend running on port 8081
4. Test API endpoints from browser/Postman
5. Test frontend product loading

## Testing the Setup

### Using curl:
```bash
# Get all products
curl http://localhost:5000/api/products

# Get Running category
curl http://localhost:5000/api/products?category=Running

# Get single product
curl http://localhost:5000/api/products/1
```

### Using Postman:
1. Create new GET request
2. URL: `http://localhost:5000/api/products`
3. Send
4. Should receive array of 26 products

### Using Frontend:
1. Navigate to http://localhost:8081
2. Go to Products page
3. Should display all 26 products
4. Filter by category should work
5. Click product for details

---

**Backend Status**: ✅ Ready
**Database**: ✅ Seeded with 26 products
**API**: ✅ Running on port 5000
