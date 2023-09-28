import 'reflect-metadata'
import process from 'process'
import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const globalPrefix = 'api'
const port = process.env.PORT || '3000'

export const setupSwagger = (nestApplication: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('TMNL Front-End Assignment')
    .setDescription('Full-Stack project for Front-End Assignment')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/${globalPrefix}`)
    .build()
  const document = SwaggerModule.createDocument(nestApplication, config)
  SwaggerModule.setup(globalPrefix, nestApplication, document)
  return document
}

export const app = async () => {
  const nestApplication = await NestFactory.create(AppModule)
  setupSwagger(nestApplication)
  nestApplication.setGlobalPrefix(globalPrefix)
  nestApplication.enableCors()
  return nestApplication
}
const bootstrap = async () => {
  const nestApplication = await app()
  nestApplication.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

if (!process.env['OPENAPI_GENERATION']) {
  bootstrap()
}
