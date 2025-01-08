/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return (
    knex.schema
      // Alter Users Table to add role (for user types)
      .table("users", (table) => {
        table.string("role").notNullable().defaultTo("user"); // Default to 'user', can be 'seller' later
      })

      // Sellers Table (for sellers only)
      .createTable("sellers", (table) => {
        table.increments("id").primary(); // Auto-increment primary key
        table.integer("user_id").unsigned().notNullable(); // Reference to Users table
        table.string("business_name").notNullable(); // Business name
        table.text("store_description").notNullable(); // Store description
        table.timestamps(true, true); // Adds created_at and updated_at

        // Foreign key reference
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE"); // Delete seller record when user is deleted
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return (
    knex.schema
      // Drop the sellers table first
      .dropTableIfExists("sellers")

      // Then alter users table to remove role column
      .table("users", (table) => {
        table.dropColumn("role");
      })
  );
};
