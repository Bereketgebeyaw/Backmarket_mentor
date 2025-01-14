import db from "../db.js";
export const getCatalogsBySubCategory = async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    const query = `
        SELECT * FROM catalogs WHERE subcategory_id = $1;
      `;
    const result = await db.query(query, [subcategoryId]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No catalog found for this sub category." });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching catalogs:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
