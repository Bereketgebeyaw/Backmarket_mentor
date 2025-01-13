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
      // Catalogs Table
      .createTable("catalogs", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("product_name").notNullable(); // Product name
        table.text("product_description"); // Product description
        table
          .integer("category_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("categories")
          .onDelete("CASCADE"); // Foreign key referencing categories
        table
          .integer("subcategory_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("subcategories")
          .onDelete("CASCADE"); // Foreign key referencing subcategories
        table.string("brand").notNullable(); // Brand name
        table.string("model").notNullable(); // Model
        table.decimal("size", 10, 2).notNullable(); // Size in grams
        table.timestamps(true, true); // Adds created_at and updated_at
      })
      // Products Table
      .createTable("products", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table
          .integer("catalog_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("catalogs")
          .onDelete("CASCADE"); // Foreign key referencing catalogs table
        table.decimal("price", 10, 2).notNullable(); // Price
        table.binary("image"); // Binary image data
        table.string("image_type"); // Type of image (e.g., PNG, JPG)
        table.integer("quantity_in_stock").notNullable().defaultTo(0); // Quantity
        table
          .enum("shelf_life", ["Perishables", "Non-Perishables"])
          .notNullable(); // Shelf life
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
    .dropTableIfExists("catalogs") // Drop catalogs table
    .dropTableIfExists("subcategories") // Drop subcategories
    .dropTableIfExists("categories"); // Drop categories
};
