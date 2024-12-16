import db from '../db.js';
import mime from 'mime-types';


router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    
    const products = result.rows.map((product) => {
      if (product.image) {
        const imageType = product.image_type || 'jpeg';
        product.image = `data:image/png;base64,${product.image.toString('base64')}`;
        product.image = `data:image/${imageType};base64,${product.image.toString('base64')}`;
      }
      return product;
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server error');
  }
});
