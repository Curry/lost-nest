import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { System } from './models/system';

@Injectable()
export class EveService {
  constructor(private prisma: PrismaService) {}

  getSystemById = (id: number): Observable<System> =>
    from(this.prisma.system.findOne({ where: { id: id } }));

  getSystemsFuzzyByName = (name: string) =>
    from(
      this.prisma.system.findMany({
        where: { systemName: { contains: name } },
      }),
    );

  getStaticsForSystem = (id: number) =>
    from(
      this.prisma.systemStatic.findMany({
        where: { systemId: id },
      }),
    ).pipe(
      map(systemStatics => systemStatics.map(val => val.staticId)),
      mergeMap(systemStatics =>
        this.prisma.static.findMany({
          where: { id: { in: systemStatics } },
        }),
      ),
    );
}
