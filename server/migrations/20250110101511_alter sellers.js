/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.table("sellers", (table) => {
    table.binary("kebele_id").nullable(); 
    table.binary("business_license").nullable(); // Business License (Binary Data)
    table.binary("tin_certificate").nullable(); // TIN Certificate (Binary Data)
    table.binary("vat_certificate").nullable(); // VAT Certificate (Binary Data)
    table.string("physical_address").nullable(); // Physical Address (e.g., Kebele, Wereda)
    table.string("bank_account").nullable(); // Bank Account Number (String, in the seller's or business's name)
    table.string("categories").nullable(); // Categories (can store a list or a single category, depending on the implementation)
    table.string("subcategories").nullable(); // Subcategories (can store a list or a single subcategory, depending on the implementation)
    table.boolean("terms_accepted").defaultTo(false); // Terms Accepted (Boolean to track if the seller agreed to terms)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.table("sellers", (table) => {
    table.dropColumn("kebeleId");
    table.dropColumn("businessLicense");
    table.dropColumn("tinCertificate");
    table.dropColumn("vatCertificate");
    table.dropColumn("physicalAddress");
    table.dropColumn("bankAccount");
    table.dropColumn("categories");
    table.dropColumn("subcategories");
    table.dropColumn("termsAccepted");
  });
};
