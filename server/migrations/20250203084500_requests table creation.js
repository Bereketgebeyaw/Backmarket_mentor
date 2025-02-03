/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return (
      knex.schema
        // Requests Table
        .createTable("requests", (table) => {
          table.increments("id").primary(); // Auto-incrementing primary key
          table
            .integer("requester")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE"); // Foreign key referencing users table
          table.text("message").notNullable(); // Request message
          table.string("product_name").notNullable(); // Product name
          table.text("product_description"); // Product description
          table.string("brand").notNullable(); // Brand name
          table.string("model").notNullable(); // Model
          table.decimal("size", 10, 2).notNullable(); // Size specification
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
          table
            .enum("status", ["pending", "approved", "rejected"])
            .notNullable()
            .defaultTo("pending"); // Request status
          table.timestamps(true, true); // Adds created_at and updated_at
        })
    );
  };
  
  
  
  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }*/
  export const down = function (knex) {
    return knex.schema.dropTableIfExists("requests");
  };
  