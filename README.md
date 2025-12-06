PROJECT STRUCTURE:
xeno-assignment/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   │   └── ingestController.js
│   │   ├── routers/
│   │   │   ├── ingest.js
│   │   │   ├── metrics.js
│   │   │   └── tenants.js
│   │   ├── shopifyService.js
│   └── prisma/
│       ├── schema.prisma
│       └── client.js
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── App.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── netlify.toml   ← (for Netlify deployment!)

SHOPIFY ANALYTICS DASHBOARD-XENO ASSIGNMENT:
This repository contains my submission for the Xeno FDE Internship 2025 Assignment, which includes:
1.A React (Vite) dashboard for analytics
2.A Node.js + Express + Prisma backend
3.Shopify API integration
4.PostgreSQL database
5.Data ingestion + metrics API

TECHSTACK:
Frontend:                                       
1.React + Vite
2.Axios
3.Chart.js
4.Netlify (deployment)
Backend:
1.Node.js
2.Express
3.Prisma ORM
4.PostgreSQL
5.Shopify REST Admin API

🧩 Features Implemented
1.Shopify data ingestion (customers, orders, products)
2.Stored in PostgreSQL using Prisma
3.Revenue, order count, customer count
4.Average order value
5.Orders-per-day line chart
6.Responsive UI dashboard
7.Error handling + clean structure

⚙️ Backend Setup (Local)-VSCode terminal
    cd backend
    npm install
    npx prisma migrate dev
    npm run dev
    Backend runs at: http://localhost:5000

📥 Ingestion API
    POST /api/ingest/:tenantId
    Example (PowerShell):
    Invoke-RestMethod "http://localhost:5000/api/ingest/21" -Method POST

📊 Metrics API
   GET /api/metrics/:tenantId

💻 Frontend Setup
    cd frontend
    npm install
    npm run dev
    Vite development server runs at: http://localhost:5173
    
🌐 Live Frontend Link: https://prismatic-fenglisu-91e91e.netlify.app/

🎯 Purpose
This project demonstrates:
1.Full-stack skills
2.API creation
3.Database modeling
4.Shopify API integration
5.Analytics + dashboards
6.Clean architecture
