import { Controller, Post, Get, Body } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry') // این یعنی آدرس این بخش http://localhost:3000/telemetry هست
export class TelemetryController {
  // تزریق وابستگی (Dependency Injection) سرویس به کنترلر
  constructor(private readonly telemetryService: TelemetryService) {}

  // ۱. ساخت یک End-point برای دریافت داده‌ها (POST)
  @Post('data')
  receiveData(
    @Body() data: { temperature: number; ph: number; pressure: number },
  ) {
    return this.telemetryService.processData(data);
  }

  // ۲. ساخت یک End-point برای گرفتن تاریخچه جهت نمایش در نمودار فرانت‌اند (GET)
  @Get('history')
  getHistory() {
    return this.telemetryService.getHistory();
  }
}
