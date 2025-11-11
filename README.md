# FoodWagen Site (Web)  
---

## Overview

- Search meals by name
- Add, edit, and delete meals
- View restaurant details and status
- Fully responsive on mobile, tablet, and desktop
- Real-time CRUD with mock API
- Beautiful animations and hover effects


## Tech Stack

| Technology       | Purpose |
|------------------|--------|
| **Next.js 16**   | App Router, Server Components, Turbopack |
| **TypeScript**   | Type safety & developer experience |
| **Tailwind CSS** | Utility-first styling |
| **Lucide Icons** | Modern, lightweight icons |
| **Axios**        | API requests |
| **React Hot Toast** | Beautiful notifications |


## Features

- **Pixel-perfect Figma implementation**
- **Real-time search** with debounce
- **Full CRUD operations** (Create, Read, Update, Delete)
- **Safe image handling** (`---` → fallback)
- **Safe data rendering** (null/undefined checks)
- **Responsive grid layout** (1–4 columns)
- **Modal system** with blur backdrop
- **3-dot menu** with edit/delete
- **Toast notifications** on all actions
- **Loading skeletons** & error states
- **Production-optimized** with `next/image`


## Project Structure


src/
├── app/                # Next.js pages
├── components/         # Reusable UI components
│   ├── FoodCard.tsx
│   ├── SearchBar.tsx
│   ├── AddEditModal.tsx
│   ├── DeleteModal.tsx
│   └── Footer.tsx
├── hooks/              # Custom React hooks
│   └── useFoods.ts
├── lib/
│   ├── api.ts          # API client with normalization
│   └── types.ts        # TypeScript interfaces
└── public/             # Static assets




## How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/cedrick-cc/Foodwagen-frontend.git
cd Foodwagen-frontend```


### 2. Install dependencies
```bash
npm install```


### 3. Run the development server
```bash
npm run dev```


### 4. Open in browser
```
[http://localhost:3000](http://localhost:3000)
```

---





