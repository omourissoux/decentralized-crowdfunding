import React from 'react';
import { useConnect, useAccount } from 'wagmi';

const ConnectWallet: React.FC = () => {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();

  return (
    <div className="connect-wallet">
      <h1 className="title">Welcome to Crowdfunding</h1>
      <p className="subtitle">Connect your wallet to start managing campaigns.</p>
      {isConnected ? (
        <p className="notification is-success">Connected: {address}</p>
      ) : (
        connectors.map((connector) => (
          <button
            key={connector.id}
            className="button is-primary is-large"
            onClick={() => connect({ connector })}
          >
            Connect with {connector.name}
          </button>
        ))
      )}
    </div>
  );
};

export default ConnectWallet;
