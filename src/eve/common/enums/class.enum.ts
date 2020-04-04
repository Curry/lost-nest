import { registerEnumType } from '@nestjs/graphql';

export enum Class {
  C1 = 1,
  C2,
  C3,
  C4,
  C5,
  C6,
  HIGH,
  LOW,
  NULL,
  THERA = 12,
  SHATTERED,
  SENTINEL,
  BARBICAN,
  VIDETTE,
  CONFLUX,
  REDOUBT,
}

registerEnumType(Class, {
  name: 'Class',
});
