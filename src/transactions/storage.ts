import { Transaction } from "./parser";

const persistTransactions = (transactions: Transaction[]) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

const getPersistedTransactions = ():Transaction[] => {
    const transactionsString = localStorage.getItem('transactions');
    if (transactionsString) {
        try {
            return JSON.parse(transactionsString);
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    return [];
};

export {persistTransactions, getPersistedTransactions};