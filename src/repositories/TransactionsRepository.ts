import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const result = this.transactions.reduce(
      (acc, transaction) => {
        acc[transaction.type] += transaction.value;
        acc.total = acc.income - acc.outcome;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return result;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const { title, value, type } = data;
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
