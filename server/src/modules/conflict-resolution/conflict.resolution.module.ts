import { Module } from '@nestjs/common';
import ConflictResolutionGateway from './conflict.resolution.gateway';

@Module({
  providers: [ConflictResolutionGateway],
  exports: [ConflictResolutionGateway],
})
export class ConflictResolutionModule {}
