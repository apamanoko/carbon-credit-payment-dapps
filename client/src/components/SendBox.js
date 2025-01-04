import React from 'react'
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const SendBox = () => {
  const { sendTransaction, handleChange, inputFormData_metamask } = useContext(TransactionContext);

  const handleSubmit = () => {
    const { addressTo, amountCAC } = inputFormData_metamask;
    console.log(addressTo);
    if(addressTo === "" || amountCAC === "") {
      return;
    } else {
      sendTransaction();
    }
  };

  return (
    <div>
      <div className='mainContainer'>
        {/* 3つのボックス */}
        <div className='sendContainer'>
          {/* CO2toCACボックス */}
          <div className='cacCalc'>
            <p>CO2 to CAC</p>
            <div className='inputContainer'>
              <input 
                placeholder='CO2(単位：tCO2)'
                name='amountCO2'
                type="number"
                step="0.01"
              />
              <button type='button'>変換</button>
              <input 
                placeholder='CAC'
                name='resultCAC'
                type="number"
                step="0.01"
                // 変換結果の値をvalueで表示
                // value={} 
              />
            </div>
          </div>
          {/* CAC発行申請ボックス */}
          <div className='cacApply'>
            <p>CAC発行申請</p>
            <div className='inputContainer'>
              <input 
                placeholder='メールアドレス'
                name='mailaddressTo'
                type="text" 
              />
              <input 
                placeholder='通貨(CAC)'
                name='mailCAC'
                type="number"
                step="0.01" 
              />
              <button type='button'>送信</button>
            </div>
          </div>
          {/* CACtoCACボックス */}
          <div className='cacSwap'>
            <p>CAC to CAC</p>
            <div className='inputContainer'>
              <input 
                placeholder='MetaMaskアドレス'
                name='addressTo'
                type="text" 
                onChange={(e) => handleChange(e, "addressTo")}
              />
              <input 
                placeholder='通貨(CAC)'
                name='amountCAC'
                type="number"
                step="0.01"
                onChange={(e) => handleChange(e, "amountCAC")}
              />
              <button type='button' onClick={handleSubmit}>送信</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendBox