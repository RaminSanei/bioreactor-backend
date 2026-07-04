import { Injectable } from '@nestjs/common';

// تعریف ساختار داده‌های دریافتی از سنسورها
export interface SensorData {
  temperature: number;
  ph: number;
  pressure: number;
  timestamp: Date;
}

@Injectable()
export class TelemetryService {
  // آرایه‌ای برای ذخیره موقت داده‌ها در RAM
  private dataHistory: SensorData[] = [];

  // متد پردازش و ذخیره داده جدید
  processData(data: {
    temperature: number;
    ph: number;
    pressure: number;
  }): SensorData {
    const newData: SensorData = {
      ...data,
      timestamp: new Date(), // ثبت زمان دقیق رسیدن دیتا
    };

    this.dataHistory.push(newData);

    // پیاده‌سازی یک منطق مهندسی بیومدیکال/شیمی ساده:
    // اگر pH بیوراکتور از بازه استریل (مثلاً 6.8 تا 7.4) خارج شد، هشدار بده
    if (newData.ph < 6.8 || newData.ph > 7.4) {
      console.warn(`[⚠️ CRITICAL ALERT]: pH level is abnormal: ${newData.ph}`);
    }

    return newData;
  }

  // متدی برای بازگرداندن کل تاریخچه داده‌ها به فرانت‌اند
  getHistory(): SensorData[] {
    return this.dataHistory;
  }
}
