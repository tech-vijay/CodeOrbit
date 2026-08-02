# Code Orbit

A full-stack web project built with React, Vite, Tailwind CSS, and Node.js/Express.

## Features
- Modern landing page and portfolio sections
- Contact and inquiry forms
- Chatbot integration
- Payment-related backend routes
- Responsive frontend design

## Tech Stack
### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB

## Project Structure
- `frontend/` – React/Vite frontend
- `backend/` – Express backend API

## Installation

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Running the Project

### Start backend
```bash
cd backend
npm start
```

### Start frontend
```bash
cd frontend
npm run dev
```

## Deployment

Current deployed URLs:
- Frontend (Vercel): `https://code-orbit-gamma.vercel.app`
- Backend (Render): `https://codeorbit-backend-jo5j.onrender.com`
- API health check: `https://codeorbit-backend-jo5j.onrender.com/api/health`

### Vercel frontend environment variables

Set this in your **Vercel project settings**:

```bash
VITE_API_URL=https://codeorbit-backend-jo5j.onrender.com/api
```

The frontend automatically falls back to `https://codeorbit-backend-jo5j.onrender.com/api` in production if `VITE_API_URL` is omitted.

### Render backend environment variables

Set these in your **Render service settings**:

```bash
CLIENT_URL=https://code-orbit-gamma.vercel.app
PORT=5002
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
CONTACT_NOTIFICATION_EMAIL=your-email@example.com
```

### Contact-form email notifications

Every website contact or service inquiry is stored in MongoDB and also sent to `CONTACT_NOTIFICATION_EMAIL` using [Resend](https://resend.com). Verify the domain used in `EMAIL_FROM` in your Resend account before deploying.

`CLIENT_URL` can contain multiple comma-separated origins if needed, for example:

```bash
CLIENT_URL=https://digital-prism.vercel.app,http://localhost:5173
```

## Notes
Make sure your environment variables and database configuration are set correctly before running or deploying the backend.

## License
This project is for personal and educational use.
