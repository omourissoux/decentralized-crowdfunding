import React from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';

// Utility function to format the address
const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ConnectWallet: React.FC = () => {
  const { connect, connectors, error } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="wallet-auth">
        <p>Connected: <strong>{formatAddress(address || '')}</strong></p>
        <button className="button is-danger" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-auth">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          className="button is-primary"
          onClick={() => connect({ connector })}
          disabled={!connector.ready}
        >
          Connect with {connector.name}
        </button>
      ))}
      {error && <p className="has-text-danger">{error.message}</p>}
    </div>
  );
};

export default ConnectWallet;
