// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initial_balance = 1000;

  test('should create account with initial balance', () => {
    const bankBalance = getBankAccount(initial_balance);
    expect(bankBalance.getBalance()).toBe(initial_balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankBalance = getBankAccount(initial_balance);
    expect(() => bankBalance.withdraw(initial_balance + 1)).toThrow(
      new InsufficientFundsError(initial_balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankBalance = getBankAccount(initial_balance);
    const bankBalanceReceiver = getBankAccount(initial_balance);
    expect(() => {
      bankBalance.transfer(initial_balance + 10, bankBalanceReceiver);
    }).toThrow(new InsufficientFundsError(initial_balance));
  });

  test('should throw error when transferring to the same account', () => {
    const bankBalance = getBankAccount(initial_balance);

    expect(() => bankBalance.transfer(345, bankBalance)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankBalance = getBankAccount(initial_balance);
    bankBalance.deposit(101);
    expect(bankBalance.getBalance()).toBe(initial_balance + 101);
  });

  test('should withdraw money', () => {
    const bankBalance = getBankAccount(initial_balance);
    bankBalance.withdraw(444);
    expect(bankBalance.getBalance()).toBe(initial_balance - 444);
  });

  test('should transfer money', () => {
    const bankBalance = getBankAccount(initial_balance);
    const bankBalanceReceiver = getBankAccount(initial_balance);
    bankBalance.transfer(50, bankBalanceReceiver);
    expect(bankBalance.getBalance()).toBe(initial_balance - 50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankBalance = getBankAccount(initial_balance);
    jest.spyOn(lodash, 'random').mockReturnValueOnce(33).mockReturnValueOnce(1);
    expect(await bankBalance.fetchBalance()).toBe(33);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankBalance = getBankAccount(initial_balance);
    jest.spyOn(bankBalance, 'fetchBalance').mockResolvedValueOnce(555);
    await bankBalance.synchronizeBalance();
    expect(bankBalance.getBalance()).toBe(555);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankBalance = getBankAccount(initial_balance);
    jest.spyOn(bankBalance, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(bankBalance.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
