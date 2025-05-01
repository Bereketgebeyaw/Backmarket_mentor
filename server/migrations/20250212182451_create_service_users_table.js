/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable("service_users", (table) => {
      table.increments("id").primary(); // Auto-incrementing primary key
      table.integer("user_id").unsigned().notNullable(); // Reference to Users table
      table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  
      table.string("cover_type").notNullable(); // Type of insurance cover (Comprehensive, Own Damage Only)
      table.decimal("coverage_value", 15, 2).notNullable(); // Insurance coverage value
      table.enum("driving_experience", ["less_than_one_year", "above_one_year"]).notNullable(); // Driving experience
      table.boolean("sole_owner").notNullable(); // Whether the vehicle is their sole and absolute property
      table.string("owner_name").nullable(); // Name of the vehicle owner (if different)
      table.string("owner_address").nullable(); // Address of the vehicle owner (if different)
  
      // Insurance history questions
      table.boolean("proposal_declined").notNullable();
      table.boolean("policy_not_renewed").notNullable();
      table.boolean("policy_canceled").notNullable();
      table.boolean("premium_increased").notNullable();
      table.boolean("first_loss_required").notNullable();
      table.boolean("special_conditions_imposed").notNullable();
  
      // Document Uploads (file paths or URLs)
      table.string("driving_license").nullable();
      table.string("vehicle_registration").nullable();
      table.string("additional_documents").nullable();
  
      // Pre-risk assessment
      table.string("video_inspection").nullable(); // Link to live video recording (if available)
      table.boolean("physical_inspection").notNullable().defaultTo(false); // Whether a physical inspection is required
      table.string("inspection_branch").nullable(); // Branch used for inspection (if needed)
  
      // Payment details
      table.enum("payment_method", ["bunna_account", "new_account", "loan_facility"]).notNullable();
      table.decimal("premium_amount", 15, 2).notNullable();
      table.enum("loan_tenure", ["3_months", "6_months", "1_year"]).nullable(); // Loan tenure (if applicable)
  
      table.timestamps(true, true); // Adds created_at and updated_at
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function (knex) {
    return knex.schema.dropTableIfExists("service_users");
  };
  