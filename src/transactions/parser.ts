import moment from 'moment';
import { v4 as uuid } from 'uuid';

export type Transaction = {
    id: string;
    // Beguenstigter/Zahlungspflichtiger or Buchungstext
    name: string;
    // Buchungstag
    date: string;
    // Betrag
    amount: number;
    // Verwendungszweck
    reference: string;
};

export type MonthlyReport = {
    income: number;
    expense: number;
    saving: number;
    transactions: Transaction[];
};

export type SalesData = {
    expenseArr: number[];
    savingArr: number[];
    labelArr: string[];
};

const parseTransactions = (transactions: d3.DSVRowArray<string>): Transaction[] => {
    return transactions
        .filter((transaction) => transaction['Betrag'] && transaction['Buchungstag'])
        .map((transaction) => {
            const name = `${transaction['Beguenstigter/Zahlungspflichtiger']}` || `${transaction['Buchungstext']}`;
            const date = transaction['Buchungstag']!;
            const amount = transaction['Betrag']!.replace(/,/g, '.');
            const reference = `${transaction['Verwendungszweck']}`;
            return { id: uuid(), name, date, reference, amount: parseFloat(amount) };
        });
};

const getMonthlyReport = (transactions: Transaction[]): Record<string, MonthlyReport> => {
    const monthlyReport: Record<string, MonthlyReport> = {};
    transactions.forEach((transaction) => {
        const date = moment.utc(transaction.date, 'DD.MM.YY').toDate();
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`
        if (!monthlyReport[month]) {
            monthlyReport[month] = {income: 0, expense: 0, saving: 0, transactions: []};
        }
        monthlyReport[month].transactions.push(transaction);
        monthlyReport[month].saving += transaction.amount;
        transaction.amount > 0 
            ? monthlyReport[month].income += transaction.amount
            : monthlyReport[month].expense += transaction.amount;
    });
    Object.values(monthlyReport).forEach((monthlyReport) => {
        monthlyReport.expense = Number(monthlyReport.expense.toFixed(2));
        monthlyReport.income = Number(monthlyReport.income.toFixed(2));
        monthlyReport.saving = Number(monthlyReport.saving.toFixed(2));
    });
    return monthlyReport;
};

const getSalesData = (transactions: Transaction[]): SalesData => {
    const monthlyReport = getMonthlyReport(transactions);
    const labelArr = Object.keys(monthlyReport).reverse();
    const savingArr = Object.values(monthlyReport).map((report) => report.saving).reverse();
    const expenseArr = Object.values(monthlyReport).map((report) => report.expense * -1).reverse();
    return {labelArr, savingArr, expenseArr};
};

export { parseTransactions, getMonthlyReport, getSalesData };