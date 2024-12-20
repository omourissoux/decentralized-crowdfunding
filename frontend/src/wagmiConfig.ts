import { http, createConfig } from 'wagmi'
import { base, mainnet, sepolia, hardhat } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = process.env.REACT_APP_REOWN_PROJETC_ID as string;

export const config = createConfig({
  chains: [mainnet, base, sepolia, hardhat],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
})
