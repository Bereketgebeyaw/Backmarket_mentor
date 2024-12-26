/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return (
    knex.schema
      // Users Table
      .createTable("users", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("name").notNullable(); // User name
        table.string("email").unique().notNullable(); // Unique email
        table.string("password").notNullable(); // Hashed password
        table.timestamps(true, true); // Adds created_at and updated_at
      })

      // Address Table
      .createTable("addresses", (table) => {
        table.increments("id").primary(); // Auto-increment primary key
        table.string("street").notNullable(); // Street address
        table.string("city").notNullable(); // City
        table.string("state").notNullable(); // State/Region
        table.string("zip_code").notNullable(); // ZIP/Postal code
        table.string("country").notNullable(); // Country
        table.timestamps(true, true); // Adds created_at and updated_at
      })

      // Cart Table
      .createTable("cart", (table) => {
        table.increments("id").primary(); // Auto-increment primary key
        table.integer("user_id").unsigned().notNullable().unique(); // Reference to Users table
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE"); // Foreign key constraint
        table.timestamps(true, true); // Adds created_at and updated_at
      })

      // Junction Table for Cart and Products (Many-to-Many)
      .createTable("cart_products", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.integer("cart_id").unsigned().notNullable(); // Foreign key to cart
        table.integer("product_id").unsigned().notNullable(); // Foreign key to products
        table.integer("quantity").notNullable().defaultTo(1); // Quantity of the product

        // Foreign key constraints
        table
          .foreign("cart_id")
          .references("id")
          .inTable("cart")
          .onDelete("CASCADE");
        table
          .foreign("product_id")
          .references("id")
          .inTable("products")
          .onDelete("CASCADE");

        // Ensures unique pair of cart_id and product_id
        table.unique(["cart_id", "product_id"]);
      })

      // Orders Table
      .createTable("orders", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.integer("user_id").unsigned().notNullable(); // Reference to the user
        table.integer("address_id").unsigned().notNullable(); // Reference to the address
        table.string("status").notNullable().defaultTo("pending"); // Order status
        table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp for when the order is created

        // Foreign key references
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table
          .foreign("address_id")
          .references("id")
          .inTable("addresses")
          .onDelete("CASCADE");
      })

      // Junction Table for Orders and Products (Many-to-Many)
      .createTable("order_products", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.integer("order_id").unsigned().notNullable(); // Foreign key to orders
        table.integer("product_id").unsigned().notNullable(); // Foreign key to products
        table.integer("quantity").notNullable().defaultTo(1); // Quantity of the product

        // Foreign key constraints
        table
          .foreign("order_id")
          .references("id")
          .inTable("orders")
          .onDelete("CASCADE");
        table
          .foreign("product_id")
          .references("id")
          .inTable("products")
          .onDelete("CASCADE");

        // Ensures unique pair of order_id and product_id
        table.unique(["order_id", "product_id"]);
      })

      // Wishlists Table
      .createTable("wishlists", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.integer("user_id").unsigned().notNullable(); // Reference to the user who owns the wishlist
        table.string("name").notNullable(); // Wishlist name
        table.timestamps(true, true); // Adds created_at and updated_at

        // Foreign key references
        table
          .foreign("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
      })

      // Junction Table for Wishlists and Products (Many-to-Many)
      .createTable("wishlist_products", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.integer("wishlist_id").unsigned().notNullable(); // Foreign key to wishlists
        table.integer("product_id").unsigned().notNullable(); // Foreign key to products

        // Foreign key constraints
        table
          .foreign("wishlist_id")
          .references("id")
          .inTable("wishlists")
          .onDelete("CASCADE");
        table
          .foreign("product_id")
          .references("id")
          .inTable("products")
          .onDelete("CASCADE");

        // Ensures unique pair of wishlist_id and product_id
        table.unique(["wishlist_id", "product_id"]);
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema
    .dropTableIfExists("wishlist_products") // Drop the wishlist-products junction table first
    .dropTableIfExists("wishlists") // Drop the wishlists table
    .dropTableIfExists("order_products") // Drop the orders-products junction table
    .dropTableIfExists("orders") // Drop the orders table
    .dropTableIfExists("cart_products") // Drop the cart-products junction table
    .dropTableIfExists("cart") // Drop the cart table
    .dropTableIfExists("addresses") // Drop the addresses table
    .dropTableIfExists("users"); // Drop the users table
};
