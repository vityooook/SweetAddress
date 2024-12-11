import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateOrderDto } from "./dto/order";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TonWeb = require("tonweb");

const IS_MAINNET = false;
const TONCENTER_API_KEY = null;
const ADMIN_ADDRESS = "UQAWnvwKk1AgUDsgt-gOnoVvT6TbAxxbgZ8OIJAU_CwUj871";
const TON_SCALE = 1e9;

@UseGuards(JwtAuthGuard)
@Controller("api/orders")
export class OrdersController {
  private tonweb: any;

  constructor(private readonly ordersService: OrdersService) {
    this.tonweb = new TonWeb(
      new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC", {
        apiKey:
          "09b2be6ddc129cf3b8d247c2b450809c294ffe784105572dab9975bdd18e4c06",
      }),
    );
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(":orderId")
  async getEventById(@Param("orderId") orderId: string) {
    return this.ordersService.findOneById(orderId);
  }

  @Post("create")
  async createOrder(@CurrentUser() user: User, @Body() order: CreateOrderDto) {
    const queryId = uuidv4();
    const nanoAmount = ((order.suffix.length - 2) * 10 * TON_SCALE).toString();

    return await this.ordersService.create(
      {
        queryId,
        masterAddress: ADMIN_ADDRESS,
        nanoAmount,
        suffix: order.suffix,
        walletAddress: order.userAddress,
      },
      user._id,
    );
  }

  @Post("check/:orderId")
  async checkOrder(@CurrentUser() user: User, @Param() orderId: any) {
    const order = await this.ordersService.findOneById(
      orderId.orderId as unknown as string,
    );

    if (!(user._id as any).equals(order.ownerId)) {
      throw new Error("user is not valid");
    }

    // И теперь работаем с блокчейном
    let transactions;
    let success = false;

    try {
      // Достаем 20 последних транзакций админ адреса
      transactions = await this.tonweb.provider.getTransactions(
        order.masterAddress,
        20,
      );

      // Пробегаемся по транзакциям
      transactions.forEach((tx) => {
        // Если транзакция не external и пришла без исходящих мэсседжей, значит с ней все ок
        if (tx.in_msg.source && tx.out_msgs.length === 0) {
          // Если транзакция без текста - переходим к следующей
          if (
            tx.in_msg.msg_data &&
            tx.in_msg.msg_data["@type"] !== "msg.dataText"
          ) {
            return;
          }

          const value = tx.in_msg.value; // Количество тон в транзакции
          const customer = tx.in_msg.source; // Адрес покупателя
          const comment = tx.in_msg.message; // Коммент (с query_id)

          // Проверяем, совпадает ли query_id с комментом
          if (order.queryId === comment) {
            // Проверяем, полностью ли пользователь оплатил товар
            if (value === order.nanoAmount) {
              // В таком случае оплата прошла успешно
              // В таблице покупок можно менять статус на "оплачено" (success) и возвращать успешный статус:
              success = true;
              // Также, полезно будет сохранить в бд хэш транзакции, чтобы ее можно было легко найти в будущем:
              const tx_hash = tx.transaction_id?.hash;
              // Ну и сохранить адрес покупателя (переменная customer)
            }
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  // @Patch(":orderId")
  // async updateOrder(
  //   @CurrentUser() user: User,
  //   @Param("orderId") orderId: string,
  //   @Body() order: OrderDto,
  // ) {
  //   // Update the order (you may want to add logic to check if the user owns the order)
  //   return this.ordersService.update(orderId, order);
  // }

  @Delete("delete/:orderId")
  async deleteOrder(
    @CurrentUser() user: User,
    @Param("orderId") orderId: string,
  ) {
    const order = await this.ordersService.findOneById(
      orderId as unknown as string,
    );

    if (!(order.ownerId as any).equals(user._id)) {
      throw new HttpException("user is not owner", 400);
    }

    return this.ordersService.delete(orderId);
  }
}
