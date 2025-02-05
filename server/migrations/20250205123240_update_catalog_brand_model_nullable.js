/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.alterTable("catalogs", (table) => {
      table.string("brand").nullable().alter(); // Make brand optional
      table.string("model").nullable().alter(); // Make model optional
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function (knex) {
    return knex.schema.alterTable("catalogs", (table) => {
      table.string("brand").notNullable().alter(); // Revert brand to required
      table.string("model").notNullable().alter(); // Revert model to required
    });
  };
  