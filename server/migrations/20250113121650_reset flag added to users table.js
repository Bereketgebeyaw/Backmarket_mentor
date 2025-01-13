/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("password_reset").notNullable().defaultTo("no"); // Add password_reset column with default value 'no'
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("password_reset"); // Drop the password_reset column if rollback is needed
  });
};
