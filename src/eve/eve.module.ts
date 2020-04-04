import { Module } from '@nestjs/common';
import { ShipModule } from './ship/ship.module';
import { SystemModule } from './system/system.module';
import { WormholeModule } from './wormhole/wormhole.module';

@Module({
    imports: [
        ShipModule,
        SystemModule,
        WormholeModule,
    ],
})
export class EveModule {}
