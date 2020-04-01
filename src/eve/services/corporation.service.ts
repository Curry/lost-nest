import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { from } from 'rxjs';

@Injectable()
export class CorporationService {
  constructor(private prisma: PrismaService) {}

  getCorporationById = (id: number) =>
    from(this.prisma.corporation.findOne({ where: { id: id } }));
}
