import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { StocksModule } from './stocks/stocks.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceReturnModule } from './invoice-return/invoice-return.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    CompanyModule,
    CustomersModule,
    SuppliersModule,
    ProductsModule,
    StocksModule,
    InvoiceModule,
    InvoiceReturnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
