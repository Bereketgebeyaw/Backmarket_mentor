/* @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema
    .createTable('products', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('name').notNullable(); // Product name
      table.text('description'); // Product description
      table.decimal('price', 10, 2).notNullable(); // Product price (e.g., 10 digits, 2 decimal places)
      table.bytea('image'); // Product image URL or path
      table.string('category'); // Product category
      table.string('image_type'); // Type of image (e.g., PNG, JPG)
    })
    .createTable('cart', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.integer('user_id').unsigned().notNullable(); // Reference to the user
      table.integer('product_id').unsigned().notNullable(); // Reference to the product
      table.integer('quantity').notNullable().defaultTo(1); // Quantity of the product

      // Foreign key constraints
     
    });
};


export const down = function (knex) {
  return knex.schema
    .dropTableIfExists('cart') // Drops the 'cart' table first due to foreign key dependencies
    .dropTableIfExists('products'); // Drops the 'products' table
};