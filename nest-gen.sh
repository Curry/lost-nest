#!/bin/bash

if [[ $# -ne 2 ]]; then
    echo "Illegal number of parameters"
    exit 2
fi

nest g mo $1/$2
nest g s $1/$2
nest g r $1/$2
nest g interface $1/$2/$2
nest g class $1/$2/$2.schema
nest g class $1/$2/$2.model
rm src/$1/$2/*.spec.ts
cat << EOF > src/$1/$2/$2.schema.ts
import * as mongoose from 'mongoose';

export const ${2^}Schema = new mongoose.Schema({
});
EOF

cat << EOF > src/$1/$2/$2.model.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ${2^} {
}
EOF

cat << EOF > src/$1/$2/$2.interface.ts
import { Document } from 'mongoose';

export interface ${2^} extends Document {
}
EOF

cat << EOF > src/$1/$2/$2.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ${2^}Service } from './$2.service';
import { ${2^}Resolver } from './$2.resolver';
import { ${2^}Schema } from './$2.schema';

@Module({
  imports: [
  MongooseModule.forFeature([
    {
    name: '${2^}',
    schema: ${2^}Schema,
    collection: '$2s'
    },
  ]),
  ],
  exports: [${2^}Service],
  providers: [${2^}Service, ${2^}Resolver]
})
export class ${2^}Module {}
EOF

cat << EOF > src/$1/$2/$2.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ${2^} } from './$2.interface';

@Injectable()
export class ${2^}Service {
  constructor(
  @InjectModel('${2^}')
  private $2Model: Model<${2^}>,
  ) {}
}
EOF

cat << EOF > src/$1/$2/$2.resolver.ts
import { Resolver } from '@nestjs/graphql';
import { ${2^}Service } from './$2.service';
import { ${2^} } from './$2.model';

@Resolver(() => ${2^})
export class ${2^}Resolver {
  constructor(private service: ${2^}Service) {}
}
EOF
