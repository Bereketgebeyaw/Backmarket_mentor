/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return (
      knex.schema
        // Categories Table
        .createTable("contact", (table) => {
          table.increments("id").primary(); // Auto-incrementing primary key
          table.string("email").notNullable(); // Category name
          table.string("name").notNullable(); // Category name
          table.text("address").notNullable(); // Category name
          table.text("message"); // Category description
          table.timestamps(true); // Adds created_at and updated_at
        })
        
        // Products Table
        
    );
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function (knex) {
    return knex.schema
      .dropTableIfExists("contact") // Drop products table first
    
  };
  