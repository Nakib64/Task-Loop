import 'dotenv/config'

export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  // You can't really do datasource.url here like this;
  // Datasource URL belongs in schema.prisma or .env file
}
