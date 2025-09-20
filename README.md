# Academia Validator

A multi-layered platform to detect and prevent fake academic certificates for the state of Jharkhand. Built for Smart India Hackathon.

## Features

- **Public Portal:** Verify certificates manually or via file upload (OCR).
- **Institution Admin:** Secure dashboard for bulk/manually adding certificates.
- **Super Admin:** Analytics dashboard, institution management, audit logs.
- **Blockchain:** Ethereum smart contract for immutable certificate hashes.
- **AI/OCR:** Tesseract.js for extracting certificate text.

## Tech Stack

- **Frontend:** React.js + TypeScript + MUI
- **Backend:** Node.js + Express + PostgreSQL + Redis
- **Blockchain:** Solidity (Ethereum) + Web3.js
- **AI/OCR:** Tesseract.js

## Setup

### Prerequisites

- Docker + Docker Compose

### Installation

1. **Clone Repo**

   ```bash
   git clone https://github.com/YOUR_ORG/academia-validator.git
   cd academia-validator
   ```

2. **Build and Start Services**

   ```bash
   docker-compose up --build
   ```

3. **Apply Database Migrations & Seed Data**
   - Access the DB container and run:
     ```bash
     psql -U academia -d academia -f /database/migrations/initial_schema.sql
     psql -U academia -d academia -f /database/seeders/sample_data.sql
     ```

4. **Deploy Smart Contract**
   - Enter `blockchain/` and run:
     ```bash
     node scripts/deploy-contract.js
     ```

5. **Migrate Existing Certificates to Blockchain**
   - Run:
     ```bash
     node blockchain/scripts/migrate-to-blockchain.js
     ```

## Usage

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000/api

### API Endpoints

- `POST /api/auth/login`, `POST /api/auth/register`
- `POST /api/certificates/verify`, `POST /api/certificates/upload-verify`
- `POST /api/certificates` (Institution Admin)
- `GET /api/admin/analytics` (Super Admin)

## Security

- Input validation, CORS, JWT auth, SQL injection prevention, rate limiting.

## Accessibility

- ARIA labels, semantic HTML.

## License

MIT
