/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.alterTable("catalogs", (table) => {
      // Add the 'dimension' column with a default value of "gram"
      table.string("dimension").defaultTo("gram").nullable(); // Default value set to "gram"
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function (knex) {
    return knex.schema.alterTable("catalogs", (table) => {
      // Drop the 'dimension' column in case of rollback
      table.dropColumn("dimension");
    });
  };
  