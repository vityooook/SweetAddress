import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export enum OrderStatus {
  Pending = "pending",
  Delivered = "delivered",
  Canceled = "canceled",
  Returned = "returned",
  Processing = "processing",
}

export enum PaymentStatus {
  Paid = "paid",
  Pending = "pending",
  Failed = "failed",
}

@Schema({
  timestamps: true,
})
export class Order extends Document {
  _id: string;

  @Prop({ required: false })
  totalAmount: number;

  @Prop({ default: OrderStatus.Pending })
  status: OrderStatus;

  @Prop({ required: true })
  suffix: string;

  @Prop({ default: "TON" })
  paymentMethod: string;

  @Prop()
  paymentTxId: string;

  @Prop({ required: true, default: PaymentStatus.Pending })
  paymentStatus: PaymentStatus;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
  ownerId: any;

  @Prop()
  queryId: string;

  @Prop()
  nanoAmount: string;

  @Prop()
  walletAddress: string;

  @Prop()
  masterAddress: string;

  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
