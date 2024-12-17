/* @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id').primary(); // Auto-incrementing primary key
      table.string('name', 100).notNullable(); // Name of the user
      table.string('email', 100).notNullable(); // User's email
      table.string('password', 100).notNullable(); // User's password
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for creation
      })
      .createTable('orders', (table) => {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.integer('user_id').unsigned().notNullable(); // Reference to the user
        table.integer('product_id').unsigned().notNullable(); // Reference to the product
        table.integer('quantity').notNullable().defaultTo(1); // Quantity of the product
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now()); // Timestamp for when the order is created
  
        // Foreign key references
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
  
        // Foreign key constraints
       
      });
  };
  
  
  export const down = function (knex) {
    return knex.schema
      
      .dropTableIfExists('orders')
      .dropTableIfExists('users');

  };