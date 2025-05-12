import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';  // 引入 Web3Provider
function ConnectWallet({ setAccounts }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 检查MetaMask是否已安装
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);  // 正确的方式

      // 请求账户连接
      provider.send('eth_requestAccounts', []).then(accounts => {
        setAccounts(accounts);  // 设置账户列表
        setIsConnected(true);    // 设置连接状态
      });

      // 监听账户变化
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccounts(accounts);  // 更新账户状态
      });
    } else {
      alert('MetaMask is not installed!');
    }
  }, [setAccounts]);

  const handleConnect = async () => {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);  // 正确的方式
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccounts(accounts); // 更新账户
      setIsConnected(true);
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>
        {isConnected ? 'Connected' : 'Connect MetaMask'}
      </button>
    </div>
  );
}

export default ConnectWallet;
