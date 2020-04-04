import { Module } from '@nestjs/common';
import { ShipModule } from './ship/ship.module';
import { SystemModule } from './system/system.module';
import { WormholeModule } from './wormhole/wormhole.module';
import { AllianceModule } from './alliance/alliance.module';
import { CorporationModule } from './corporation/corporation.module';

@Module({
  imports: [
    ShipModule,
    SystemModule,
    WormholeModule,
    AllianceModule,
    CorporationModule,
  ],
})
export class EveModule {}
