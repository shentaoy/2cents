import moment from 'moment';

export type Transaction = {
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

const parseTransactions = (transactions: d3.DSVRowArray<string>): Transaction[] => {
    return transactions
        .filter((transaction) => transaction['Betrag'] && transaction['Buchungstag'])
        .map((transaction) => {
            const name = `${transaction['Beguenstigter/Zahlungspflichtiger']}` || `${transaction['Buchungstext']}`;
            const date = transaction['Buchungstag']!;
            const amount = transaction['Betrag']!.replace(/,/g, '.');
            const reference = `${transaction['Verwendungszweck']}`;
            return { name, date, reference, amount: parseFloat(amount) };
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
    return monthlyReport;
};

export { parseTransactions, getMonthlyReport };