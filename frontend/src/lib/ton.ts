import { beginCell, Cell } from "@ton/core";

interface TransactionMessage {
  address: string;
  amount: string;
  payload: string;
}

interface Transaction {
  validUntil: number;
  messages: TransactionMessage[];
}

export class TonSDK {
  private tonConnect: any;

  constructor(tonConnect: any) {
    this.tonConnect = tonConnect;
  }

  async payOrder(
    queryId: string,
    amount: number,
    validityPeriod: number = 60,
    masterAddress: string
  ): Promise<Transaction> {
    const body: Cell = beginCell()
      .storeUint(0, 32)
      .storeStringTail(queryId)
      .endCell();

    const transaction: Transaction = {
      validUntil: Math.floor(Date.now() / 1000) + validityPeriod,
      messages: [
        {
          address: masterAddress,
          amount: amount.toString(),
          payload: body.toBoc().toString("base64"),
        },
      ],
    };

    try {
      await this.tonConnect.sendTransaction(transaction);
    } catch (e) {
      throw new Error('Transaction is cancelled')
    }

    return transaction;
  }
}
