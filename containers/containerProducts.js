const options = require('../options/db')
const knex = require('knex')(options)

class ProductsDB {
    constructor(db) { 
        this.knex = knex;
        this.db = db;
        this.data = []
        
        try {
            this.write()
        } catch(e) {
            console.log(e)
            this.read()
            
        }
    }
    async read() {
        this.data = await this.knex.from(this.db).select('*')
        .then(() => console.log('read db'))
        .catch( err => console.log(err))
    }
    async write() {
        await this.knex.schema.createTable(this.db, table => {
            table.increments('id')
            table.string('name')
            table.string('category')
            table.integer('price')                
            table.string('img')
        })  
        .then(() => console.log('write db'))
        .catch( err => console.log(err))
    }  
    async insert(obj) {
        await this.knex(this.db).insert(obj)
        .catch( err => console.log(err))
    }
    async getAll() {
        const data = await knex.from(this.db).select('*')
        for(const d of data) {
            console.log(`${d['id']}: ${d['name']}, ${d['category']}.  $${d['price']}`);   
        }  
        console.log(data)  
    } 
    getLastID() {
        const n = this.data.length

        if (n < 1 ) return 0 

        return this.data[this.data.length - 1].id
    }
    async getByID(id) {
        await this.knex(this.db).select([id])
    }
    async deleteByID(id) {
        await knex.from(this.db)
        .where('id', '=', id)
        .del()
        .then( () => console.log('Data deleted'))
        .catch( err => console.log(err))  
    }
    async deleteAll() {
        await this.knex.from(this.db).del()
        .then( () => console.log('Data deleted'))
        .catch( err => console.log(err))
    }
}

module.exports = ProductsDB;
