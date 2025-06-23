import React, { useContext, useEffect, useState } from 'react';
//styles
import "./TransactionsBody.css"
//components
import TransactionBar from '../TransactionBar/TransactionBar';
import PageNavigateBar from './PageNavigateBar';
//contexts
import { TransactionsContext } from '../../Contexts/AllContexts';

const TransactionsBody = () => {
    //contexts
    const [transactionData, setTransactionData] = useContext(TransactionsContext);

    //functions
    const displayTransactions = () => {
        let key = 0;
        if (transactionData && transactionData.length) {
            return transactionData.map(({ name, date, price, category, id }) => (
                <TransactionBar
                    key={`${key++}`}
                    name={name}
                    date={date}
                    amount={price}
                    category={category}
                    id={id}
                />
            ));
        }
        return null;
    };

    return (
        <div className='TransactionBody'>
            <div className='transactionBodyUpper'>
                <div className='transactionPage'>{displayTransactions()}</div>
            </div>
            {/* Pagination removed since we're showing all transactions */}
        </div>
    );
};


export default TransactionsBody;