import Knex from 'knex'
import path from 'path'
import { nanoid } from 'nanoid'



describe('sql query to test', () => {
  let knex: Knex

  beforeEach(async () => {
    knex = Knex({
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, `../../tmp/${nanoid(5)}.db`),
      },
    })
    await knex.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('name')
    })
  })

  afterAll(async () => {
    await knex.destroy()
  })

  it('just works', async () => {
    await knex('users').insert({
      id: 5, 
      name: 'Pablo'
    })

    const users = await knex('users')
        
    expect(users.length).toBe(1)
    expect(users[0].name).toBe('Pablo')
  })
})
