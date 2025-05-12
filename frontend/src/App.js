import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import AccountNFTs from './components/AccountNFTs';
import TransferNFT from './components/TransferNFT';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <div className="App">
      <h1>Avalanche NFT Manager</h1>
      <ConnectWallet setAccounts={setAccounts} />
      {accounts.length > 0 && (
        <AccountNFTs accounts={accounts} setSelectedAccount={setSelectedAccount} />
      )}
      {selectedAccount && (
        <TransferNFT selectedAccount={selectedAccount} />
      )}
    </div>
  );
}

export default App;
