import { PREDEFINED_CATEGORIES, EXCLUDE_CATEGORIES } from "./category";
import { Transaction } from "./parser";

const persistTransactions = (transactions: Transaction[]) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

const getRawPersistedTransactions = ():Transaction[] => {
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

const getPersistedTransactions = (): Transaction[] => {
    return getRawPersistedTransactions()
        .map((t) => {
            const category = PREDEFINED_CATEGORIES.find((category) =>
                category.keywords.some((keyword) => t.name.includes(keyword) || t.reference.includes(keyword)));
            t.category = category?.name;
            return t;
        })
        .filter((t) => {
            if (!t.category) {
                return true;
            }
            return !EXCLUDE_CATEGORIES.includes(t.category);
        });
};

export {persistTransactions, getPersistedTransactions};