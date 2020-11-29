import moment from 'moment';

type Transaction = {
    // Beguenstigter/Zahlungspflichtiger or Buchungstext
    name: string;
    // Buchungstag
    date: Date;
    // Betrag
    amount: number;
    // Verwendungszweck
    reference: string;
};

const parseTransactions = (transactions: d3.DSVRowArray<string>): Transaction[] => {
    return transactions
        .filter((transaction) => transaction['Betrag'])
        .map((transaction) => {
            const name = `${transaction['Beguenstigter/Zahlungspflichtiger']}` || `${transaction['Buchungstext']}`;
            const date = moment.utc(transaction['Buchungstag'], 'DD.MM.YY').toDate();
            const amount = transaction['Betrag']!.replace(/,/g, '.');
            const reference = `${transaction['Verwendungszweck']}`;
            return { name, date, reference, amount: parseFloat(amount) };
        });
};

export { parseTransactions };