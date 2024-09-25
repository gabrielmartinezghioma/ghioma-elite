import 'pg'
import 'pg-hstore'
import { Sequelize } from 'sequelize'

const DB = process.env.POSTGRES_DATABASE || process.env.DATABASE_URL
const sequelize = new Sequelize(DB, { logging: false })

export default sequelize
