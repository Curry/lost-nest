#!/bin/bash

nest g mo eve/$1
nest g s eve/$1
nest g r eve/$1
nest g interface eve/$1/$1
nest g class eve/$1/$1.schema
nest g class eve/$1/$1.model
rm src/eve/$1/*.spec.ts
cat << EOF > src/eve/$1/$1.schema.ts
import { Schema } from 'mongoose';

export const ${1^}Schema = new Schema({
    _id: Number,
});
EOF

cat << EOF > src/eve/$1/$1.model.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ${1^} {
  @Field(() => Int)
  id: number;
}
EOF

cat << EOF > src/eve/$1/$1.interface.ts
import { Document } from 'mongoose';

export interface ${1^} extends Document {
    id: number;
}
EOF

cat << EOF > src/eve/$1/$1.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ${1^}Service } from './$1.service';
import { ${1^}Resolver } from './$1.resolver';
import { ${1^}Schema } from './$1.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: '${1^}',
        schema: ${1^}Schema,
        collection: '$1s'
      },
    ]),
  ],
  exports: [${1^}Service],
  providers: [${1^}Service, ${1^}Resolver]
})
export class ${1^}Module {}
EOF

cat << EOF > src/eve/$1/$1.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ${1^} } from './$1.interface';

@Injectable()
export class ${1^}Service {
  constructor(
    @InjectModel('${1^}')
    private $1Model: Model<${1^}>,
  ) {}
}
EOF

cat << EOF > src/eve/$1/$1.resolver.ts
import { Resolver } from '@nestjs/graphql';
import { ${1^}Service } from './$1.service';
import { ${1^} } from './$1.model';

@Resolver(() => ${1^})
export class ${1^}Resolver {
  constructor(private service: ${1^}Service) {}
}
EOF
