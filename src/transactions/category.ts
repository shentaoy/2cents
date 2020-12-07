import { Transaction } from "./parser";

export type CategoryConfig = {
    name: string;
    keywords: string[];
};

export const sumOfCategory = (category: string, transactions: Transaction[]): number => {
    const sum = transactions
        .reduce((acc, cur) => cur.amount < 0 && cur.category === category ? acc + cur.amount : acc, 0);
    return Number(sum.toFixed(2)) * -1;
};

export const sumOfNonCategory = (category: string, transactions: Transaction[]): number => {
    const sum = transactions
        .reduce((acc, cur) => cur.amount < 0 && cur.category !== category ? acc + cur.amount : acc, 0);
    return Number(sum.toFixed(2)) * -1;
};

// export const PREDEFINED_CATEGORIES = require('../data/predefined_categories.json') as CategoryConfig[];
export const PREDEFINED_CATEGORIES = [] as CategoryConfig[];
export const EXCLUDE_CATEGORIES = ['Exclude', 'House'];