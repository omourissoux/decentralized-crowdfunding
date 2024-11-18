import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import HomePage from './components/HomePage';
import Loader from './components/Loader';
import 'bulma/css/bulma.min.css';
import { Providers } from './components/Providers';


const App: React.FC = () => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      if ((window as any).ethereum) {
        const browserProvider = new BrowserProvider((window as any).ethereum);
        setProvider(browserProvider);
      }
    };
    initProvider();
  }, []);

  if (!provider) {
    return <Loader />;
  }

  return (
    <Providers>
      <HomePage />
    </Providers>
  );
};

export default App;
