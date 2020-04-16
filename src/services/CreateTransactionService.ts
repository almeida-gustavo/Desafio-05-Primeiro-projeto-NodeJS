import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (!(type === 'income' || type === 'outcome')) {
      throw Error('Type must be "income" or "outcome" ');
    }

    if (!title || !value) {
      throw Error('Missing fields. Title and Value are needed');
    }

    const { outcome, income } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value + outcome > income) {
      throw Error('You do not have enough cash ');
    }

    const result = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return result;
  }
}

export default CreateTransactionService;
