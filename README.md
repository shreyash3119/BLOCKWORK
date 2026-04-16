# BlockWork

BlockWork is an AI and blockchain-based freelancing platform that combines a React frontend, a Node/Express backend, MongoDB for application data, and a Hardhat-based smart contract for escrow payments.

The project is organized as a multi-part application:

- `Frontend/` contains the React + TypeScript user interface.
- `blockchain/` contains the Express APIs, MongoDB models, Hardhat config, deployment scripts, and Solidity contracts.
- `projectImages/` contains project screenshots.

## Highlights

- Client and freelancer flows with separate dashboards
- Job posting and job acceptance APIs
- MongoDB-backed user and job storage
- Escrow smart contract for freelancer payments
- AI-powered requirement analysis for uploaded images using Gemini
- Extra frontend tools such as image comparison and requirement analysis

## Tech Stack

- Frontend: React, TypeScript, React Router, Tailwind CSS, Axios, Ethers
- Backend: Node.js, Express, Mongoose, bcryptjs, Multer
- AI: Google Gemini via `@google/generative-ai`
- Blockchain: Solidity, Hardhat, Ethers
- Database: MongoDB

## Project Structure

```text
BlockWork/
|-- Frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- features/tools/
|   |   |-- pages/
|   |   |-- utils/
|   |   `-- web3/
|   `-- package.json
|-- blockchain/
|   |-- contracts/
|   |-- models/
|   |-- routes/
|   |-- scripts/
|   |-- test/
|   |-- hardhat.config.js
|   |-- index.js
|   |-- server.js
|   `-- package.json
|-- projectImages/
`-- README.md
```

## Main Services

### 1. Frontend

The frontend lives in `Frontend/` and includes:

- landing page and about page
- client dashboard routes
- freelancer dashboard routes
- contract interaction pages
- AI utility pages such as requirement analysis and image comparison

The React app is configured with a proxy to `http://localhost:5001` in `Frontend/package.json`.

### 2. Main Backend API

The main backend lives in `blockchain/index.js` and provides:

- `POST /api/signup`
- `POST /api/login`
- `POST /api/jobs/post`
- `GET /api/jobs/available`
- `POST /api/jobs/accept/:jobId`
- `GET /api/jobs/freelancer-projects/:freelancerId`
- `GET /api/jobs/client-projects/:clientId`
- `GET /api/jobs/my-projects/:clientId`

By default it runs on port `5000` unless `PORT` is set.

### 3. AI Analysis Service

The Gemini-powered image analysis service lives in `blockchain/server.js`.

It exposes:

- `POST /analyze`

This service:

- accepts an uploaded image
- accepts a JSON array of requirements
- asks Gemini to determine whether each requirement is present in the image
- returns structured analysis results and a percentage score

By default it runs on port `5002`.

### 4. Smart Contract

The Solidity escrow contract is in `blockchain/contracts/FreelanceEscrow.sol`.

It supports:

- client-funded escrow
- releasing payment to the freelancer
- refunding the client before final release

Hardhat is configured in `blockchain/hardhat.config.js` with Sepolia support.

## Prerequisites

Before running the project, install:

- Node.js 18+ recommended
- npm
- MongoDB connection string
- A Gemini API key
- A Sepolia RPC URL and wallet private key if you want to deploy contracts
- MetaMask if you want to test contract interaction from the frontend

## Installation

### Frontend

```bash
cd Frontend
npm install
```

### Backend and blockchain workspace

```bash
cd blockchain
npm install
```

## Environment Variables

Create a `.env` file inside `blockchain/`.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
SEPOLIA_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
```

Notes:

- `MONGO_URI` is required for the main Express API in `blockchain/index.js`.
- `GEMINI_API_KEY` is required for the AI analysis service in `blockchain/server.js`.
- `SEPOLIA_URL` and `PRIVATE_KEY` are required only for smart contract deployment.

## Running the Project

Open separate terminals for each service.

### Start the main backend API

```bash
cd blockchain
npm run dev
```

This starts the main backend from `index.js`.

### Start the AI analysis service

```bash
cd blockchain
node server.js
```

This starts the Gemini-powered image analysis server on port `5002`.

### Start the frontend

```bash
cd Frontend
npm start
```

The frontend typically runs on `http://localhost:3000`.

## Smart Contract Workflow

Compile and deploy from the `blockchain/` directory.

```bash
cd blockchain
npx hardhat compile
npm run deploy
```

The deployment script:

- deploys `FreelanceEscrow`
- writes the deployed address to `blockchain/deployedAddress.txt`

If you want the frontend to use the deployed contract, make sure the ABI and contract address are copied into `Frontend/src/web3/` and referenced by the frontend contract utilities.

## Available Scripts

### Frontend

```bash
npm start
npm test
npm run build
```

### Blockchain workspace

```bash
npm start
npm run dev
npm run deploy
```

## Screenshots

Project screenshots are available in `projectImages/`.

- `projectImages/Screenshot (354).png`
- `projectImages/Screenshot (355).png`
- `projectImages/Screenshot (356).png`

## Current Notes

- The frontend and backend ports are not fully unified yet, so check API targets and proxy settings when wiring everything together locally.
- The app currently uses in-app role state for dashboard routing, so authentication persistence may need improvement for production use.
- Smart contract frontend integration may require updating the deployed contract address and ABI after each deployment.

## Future Improvements

- persist authenticated sessions with JWTs or secure cookies
- add role-based authorization middleware
- improve contract event tracking in the frontend
- add stronger validation and error handling
- add deployment docs for a production environment
- expand automated testing across frontend, backend, and contracts

## License

No license file is currently included in this repository.
