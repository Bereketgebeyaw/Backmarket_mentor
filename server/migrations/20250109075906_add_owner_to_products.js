/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("products", (table) => {
    table
      .integer("owner_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users") // Assuming `users` table contains both users and sellers
      .onDelete("CASCADE"); // Delete product if owner is deleted
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("products", (table) => {
    table.dropColumn("owner_id");
  });
};
