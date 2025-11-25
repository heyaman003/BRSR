import { Global, Module } from '@nestjs/common';
import { DbService } from './db.connections';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
