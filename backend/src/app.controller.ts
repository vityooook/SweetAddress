import { Controller, Get } from "@nestjs/common";
import { BotService } from "./bot/bot.service";

@Controller()
export class AppController {
  constructor(private readonly botService: BotService) {
    this.botService.launch();
  }

  @Get("/debug-sentry")
  getError() {
    throw new Error("My first Sentry error!");
  }
}
