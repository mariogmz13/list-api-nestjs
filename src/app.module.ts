import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://mariogamez1999:qgQ4jOCsodbLoVLq@cluster0.f5mtmcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    ActivitiesModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
