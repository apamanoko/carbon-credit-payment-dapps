import React from 'react'
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const { connectWallet } = useContext(TransactionContext);
  return (
    <div>
      <div className='title'>
        <h1>Carbon Exchange</h1>
      </div>
      <div className='connectWallet'>
        <button type="button">
          <p className="buttonText" onClick={connectWallet}>ウォレット連携</p>
        </button>
      </div>
    </div>
  )
}

export default Header