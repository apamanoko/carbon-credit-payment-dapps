// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Transactions {
    //仮想通貨の受け渡しのためのデータ構造
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
    }

    TransferStruct[] transactions;

    event Transfer(address from, address receiver, uint amount);

    function addToBlockChain(address payable receiver, uint amount) public returns (bytes32) {
        bytes32 transactionHash = keccak256(abi.encodePacked(msg.sender, receiver, amount, block.timestamp));
        transactions.push(TransferStruct(msg.sender, receiver, amount));

        emit Transfer(msg.sender, receiver, amount);
        return transactionHash;
    }

    event TransferEvent(
        address indexed sender,
        address indexed receiver,
        uint amount
        // その他のフィールド
    );
 
    // TransferStructのインスタンスを作成し、イベントを発行する関数
    function createAndEmitTransfer(address receiver, uint amount) public {
        TransferStruct memory transfer = TransferStruct(msg.sender, receiver, amount);
        emit TransferEvent(transfer.sender, transfer.receiver, transfer.amount);
    }
}