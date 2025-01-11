import db from "../db.js";

export const getOrderProductsOfaSeller = async (req, res) => {
  try {
    const sellerId = req.userId; // Assuming req.userId contains the seller's ID

    const orderProducts = await db("order_products")
      .join("products", "order_products.product_id", "products.id")
      .join("orders", "order_products.order_id", "orders.id")
      .join("addresses", "orders.address_id", "addresses.id")
      .select(
        "order_products.id as orderProductId",
        "order_products.quantity",
        "order_products.status",
        "order_products.created_at",
        "products.name as productName",
        "products.price",
        "products.description",
        "orders.id as orderId",
        "orders.status as orderStatus",
        "orders.created_at as orderCreatedAt",
        "addresses.street",
        "addresses.city",
        "addresses.state",
        "addresses.zip_code",
        "addresses.country"
      )
      .where("products.owner_id", sellerId)
      .andWhere("order_products.status", "pending")
      .orderBy("order_products.created_at", "asc");

    if (!orderProducts.length) {
      return res.status(404).json({ message: "No pending orders found." });
    }

    res.status(200).json(orderProducts);
  } catch (error) {
    console.error("Error fetching order products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching order products." });
  }
};
