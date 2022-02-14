# Vortex

Vortex is created by Blockzero.

The dapp has two sections:
One section for depositors to deposit and withdraw yield tokens
One section for users to stake and claim/withdraw their portal tokens and associated yield tokens

[UI Designs](​​https://xd.adobe.com/view/c612108e-6d83-4a24-bc79-3ebace124681-9341/screen/ac3ebb16-5d0c-43a4-a2ed-eaab07f3a284/)

## Project Setup
Copy the env template and set required env variables

`cp .env.template .env`

In the project directory, you can run:

```yarn start```

The project will be started at https://localhost:3000 (default port).


### Supported Chains
This project currently supports only Rinkeby.
Please confirm you are on rinkeby testnet before running the app.

**How to change my ethereum network?**

Please open your metamask and select network in the top dropdown.

### Pages
**Admin**

Create
Deposit

**General User**

Stake
Claim

### Libraries
Material-UI (front-end material)

Ethers.js (contract integration)
