# AuxHive — Backend

> A full-stack live auction platform supporting real-time competitive bidding with deadline-driven listing management. This repository contains the backend service.

The companion frontend is a private Vue.js application in the same GitHub organization (`Auctioneer-SEP/auction-site`).

## Highlights

- **Auth:** JWT-based authentication with bcrypt password hashing — account creation, login, and session lifecycle management.
- **Auctions:** Product listings with deadline-driven status, per-product bid tracking, favourites, and end-of-auction settlement.
- **Realtime:** Backend exposes endpoints for live bid updates used by the Vue frontend.
- **Deployment:** Deployed and operated on DigitalOcean.

## Tech stack

Node.js · Express · MongoDB / Mongoose · JWT · bcrypt · DigitalOcean

## Architecture (high level)

```
  Client (Vue)  ──HTTPS──▶  Express API  ──▶  MongoDB
                                │
                                └──▶ Auth (JWT + bcrypt)
```

## API reference

Full endpoint documentation lives in [`docs/API.md`](./docs/API.md).

## Running locally

```bash
git clone https://github.com/Auctioneer-SEP/auction-backend.git
cd auction-backend
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, PORT
npm start
```
