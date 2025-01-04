import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/connect";
import { createContext, useEffect, useState } from "react";

// import { Web3 } from "web3";

export const TransactionContext = createContext();

const { ethereum } = window;

//スマートコントラクトを取得
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const getSmartContract = () => {
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(provider, signer, transactionContract);
    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [inputFormData_metamask, setInputFormData_matamask] = useState({
        addressTo: "",
        amountCAC: "",
    });

    const handleChange = (e, name) => {
        setInputFormData_matamask((prevInputFormData_metamask) => ({
            ...prevInputFormData_metamask,
            [name]: e.target.value,
        }));
    };

    //メタマスクウォレットと連携しているかどうかをまずは確認する
    const checkMetamaskWalletConnected = async () => {
        if(ethereum == null) return alert("Please install MetaMask");

        //メタマスクのアカウントIDを取得
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          .catch((err) => {
            // メタマスクと接続されていない場合
            if (err.code === 4001) {
              console.log('Please connect to MetaMask.');
            } else {
              console.error(err);
            }
          });
        console.log(accounts);
    };

    let accounts = [];
    //メタマスクウォレットと連携する
    const connectWallet = async () => {
        if(ethereum == null) return alert("Please install MetaMask");

        //メタマスクのアカウントIDを取得
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          .catch((err) => {
            // メタマスクと接続されていない場合
            if (err.code === 4001) {
              console.log('Please connect to MetaMask.');
            } else {
              console.error(err);
            }
          });

        console.log(accounts[0]);

        setCurrentAccount(accounts[0]);
    };

    //実際に通貨のやり取りをする
    const sendTransaction = async () => {
      try {
        if(ethereum == null) return alert("メタマスクをインストールしてください");
        console.log("sendTransaction");
        const { addressTo, amountCAC } = inputFormData_metamask;

        const transactionContract = getSmartContract();
        const parsedAmount = ethers.utils.parseEther(amountCAC);

        // この記述はいるのか？
        // import { Web3 } from "web3";
        // const transactionParameters = {
        //     gas: "0x2710",
        //     to: addressTo,
        //     from: currentAccount,
        //     value: parsedAmount._hex,
        // };
        // const txHash = await ethereum.request({
        //     method: "eth_sendTransaction",
        //     params: [transactionParameters],
        // });
        // ここまで

        // < 時間を取得する >
        // let date = new Date();
        // const hour = date.getHours();
        // const minutes = date.getMinutes();
        // const seconds = date.getSeconds();
        // const ms = date.getMilliseconds();
        // console.log(`現在時刻は、${hour}時${minutes}分${seconds}秒${ms}ミリ秒です！`);
        // const startTime = performance.now();


        // Send Ethereum to an address
        ethereum.request({
          method: 'eth_sendTransaction',
          // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
          params: [
            {
              from: currentAccount,
              to: addressTo,
              value: parsedAmount._hex,
              gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
              maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
              maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
            },
          ],
        })
        .then((txHash) => console.log(`txHash: ${txHash}`))
        .catch((error) => console.error(error));

        const getAccount = async () => {
            accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        }
        getAccount();
        // ここまで


        const transactionHash = await transactionContract.addToBlockChain(
            addressTo,
            parsedAmount
        );
        
        console.log(`ロード中...${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`送金成功！${transactionHash.hash}`);

        // < 時間を取得する >
        // let dates = new Date();
        // const hours = dates.getHours();
        // const minutess = dates.getMinutes();
        // const secondss = dates.getSeconds();
        // const mss = dates.getMilliseconds();
        // console.log(`現在時刻は、${hours}時${minutess}分${secondss}秒${mss}ミリ秒です！`);

        // const endTime = performance.now();
        // console.log(`sendTransactionの実行時間: ${endTime - startTime}ミリ秒`);

        // TransferStruct中身表示
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const transferStruct = await contract.createAndEmitTransfer(addressTo, parsedAmount);
        console.log("TransferStruct:", transferStruct);
        // この記述はいるのか？
        // const contract = Web3.eth.Contract(contractABI, contractAddress);
        // // イベントを監視する
        // contract.events.TransferEvent({
        //     fromBlock: 0
        // }, function(error, event) {
        //     if (error) {
        //         console.error(error);
        //     } else {
        //         console.log("Transfer Event:", event.returnValues);
        //     }
        // });
      } catch (error) {
        console.error("トランザクション処理中にエラーが発生しました:", error);
        // エラーに対する適切な対処
      }

    }

    useEffect(() => {
        checkMetamaskWalletConnected();
    }, []);

    return (
        <TransactionContext.Provider value = {{ connectWallet, sendTransaction, handleChange, inputFormData_metamask }}>
            {children}
        </TransactionContext.Provider>
    );
};