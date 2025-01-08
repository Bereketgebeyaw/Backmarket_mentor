/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return (
    knex.schema
      // Categories Table
      .createTable("categories", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("name").notNullable(); // Category name
        table.text("description"); // Category description
        table.timestamps(true, true); // Adds created_at and updated_at
      })
      // Subcategories Table
      .createTable("subcategories", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("name").notNullable(); // Subcategory name
        table.text("description"); // Subcategory description
        table
          .integer("category_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("categories")
          .onDelete("CASCADE"); // Foreign key referencing categories table
        table.timestamps(true, true); // Adds created_at and updated_at
      })
      // Products Table
      .createTable("products", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("name").notNullable(); // Product name
        table.text("description"); // Product description
        table.decimal("price", 10, 2).notNullable(); // Price (10 digits, 2 decimal places)
        table.binary("image"); // Binary image data
        table.string("image_type"); // Type of image (e.g., PNG, JPG)
        table.integer("quantity_in_stock").notNullable().defaultTo(0); // Quantity
        table
          .integer("subcategory_id")
          .unsigned()

          
          .notNullable()
          .references("id")
          .inTable("subcategories")
          .onDelete("CASCADE"); // Foreign key referencing subcategories table
        table.string("brand").notNullable(); // Brand name (e.g., Nestle)
        table.enum("price_range", ["Budget-Friendly", "Mid-Range", "Premium"]).notNullable(); // Price range
        table.enum("size", ["Small", "Medium", "Bulk"]).notNullable(); // Size/packaging
        table.enum("target_demographics", ["Adults", "Children", "Seniors"]).notNullable(); // Target demographics
        table.enum("shelf_life", ["Perishables", "Non-Perishables"]).notNullable(); // Shelf life
        table.timestamps(true, true); // Adds created_at and updated_at
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema
    .dropTableIfExists("products") // Drop products table first
    .dropTableIfExists("subcategories") // Drop subcategories
    .dropTableIfExists("categories"); // Drop categories
};
