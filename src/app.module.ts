import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule, 
    DatabaseModule, QuestionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
