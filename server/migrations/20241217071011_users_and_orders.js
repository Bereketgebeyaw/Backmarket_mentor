/* @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return (
      knex.schema
        .createTable("users", (table) => {
          table.increments("id").primary(); // Auto-incrementing primary key
          table.string("name").notNullable(); // User name
          table.string("email").unique().notNullable(); // Unique email
          table.string("password").notNullable(); // Hashed password
          table.timestamps(true, true); // Adds created_at and updated_at
        })
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
        .createTable("orders", (table) => {
          table.increments("id").primary(); // Auto-incrementing primary key
          table.integer("user_id").unsigned().notNullable(); // Reference to the user
          table.integer("product_id").unsigned().notNullable(); // Reference to the product
          table.integer("quantity").notNullable().defaultTo(1); // Quantity of the product
          table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp for when the order is created

          // Foreign key references
          table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
          table
            .foreign("product_id")
            .references("id")
            .inTable("products")
            .onDelete("CASCADE");

          // Foreign key constraints
        })
    );
  };
  
  
  export const down = function (knex) {
    return knex.schema
      
      .dropTableIfExists('orders')
      .dropTableIfExists('users')
      .dropTableIfExists("cart_products") // Drop the junction table first
      .dropTableIfExists("cart");// Drop the cart table

  };