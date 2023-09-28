import { TypeOrmModule } from '@nestjs/typeorm'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { AppModule } from '../../../backend/src/app/app.module'

export const createProjectTestingModule = (entities: EntityClassOrSchema[]): TestingModuleBuilder => {
  return Test.createTestingModule({
    imports: [createTypeORMTestingModule(entities), AppModule],
  })
}
const createTypeORMTestingModule = (entities: EntityClassOrSchema[]) => {
  return TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities,
  })
}
