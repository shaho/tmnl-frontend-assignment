import { app, setupSwagger } from './main'
import * as fs from 'fs'
import * as yaml from 'yaml'
import process from 'process'
import * as path from 'path'

const createOpenApiFile = async (fileDir: string) => {
  const directory = path.dirname(fileDir)
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  const nestApplication = await app()
  nestApplication.setGlobalPrefix('/')

  const openApiObject = setupSwagger(nestApplication)
  const yamlString: string = yaml.stringify(openApiObject, {})
  fs.writeFileSync(fileDir, yamlString, { flag: 'w' })
}
createOpenApiFile(process.argv[2])
