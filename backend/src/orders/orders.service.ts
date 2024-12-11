import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./entities/order.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOneById(id: string) {
    return this.orderModel.findOne({ _id: id }).exec();
  }

  async create(order: Partial<Order>, userId: string): Promise<any> {
    const createdOrder = new this.orderModel({ ...order, ownerId: userId });
    const savedOrder = await createdOrder.save();

    // Update the user's orders array
    await this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { orders: savedOrder._id } },
        { new: true },
      )
      .exec();

    return savedOrder;
  }

  async deleteAll(): Promise<void> {
    await this.orderModel.deleteMany({});
  }

  async delete(id: string): Promise<any> {
    return await this.orderModel.deleteOne({ _id: id });
  }

  async update(id: string, updateData: Partial<Order>): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
