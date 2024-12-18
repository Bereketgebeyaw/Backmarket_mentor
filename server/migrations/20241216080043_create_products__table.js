/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return (
    knex.schema
     
     
      // Products Table
      .createTable("products", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("name").notNullable(); // Product name
        table.text("description"); // Product description
        table.decimal("price", 10, 2).notNullable(); // Price (10 digits, 2 decimal places)
        table.binary("image"); // Binary image data (bytea in PostgreSQL)
        table.string("category"); // Product category
        table.string("image_type"); // Type of image (e.g., PNG, JPG)
        table.integer("quantity_in_stock").notNullable().defaultTo(0); // Quantity in stock (default is 0)
        table.timestamps(true, true); // Adds created_at and updated_at
      })
      // Cart Table (One-to-One Relationship with Users)
     
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema
    
    .dropTableIfExists("products") // Drop the products table
    
};
