/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("order_products", (table) => {
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable(); // Timestamp with default value
    table.string("status").notNullable().defaultTo("pending"); // Default status set to "pending"
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("order_products", (table) => {
    table.dropColumn("created_at");
    table.dropColumn("status");
  });
};
