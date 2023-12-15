
const Constent = require("../../constent/Constent");
const AddToCartModel = require("../../model/cart/addtocart_model");

const Product = require("../../model/productManagement/product_model")
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    let cart = await AddToCartModel.findOne({ user: userId }).populate({
      path: 'items',
      select: "product quantity",
      populate: {
        path: 'product',
        model: Product,
      }
    });
    cart.items.map((ele) =>
      ele.product.featured_image = `${Constent.IMAGE_HOST}${ele.product.featured_image}`
    )
    res.json({
      success: true,
      cartItems: cart.items
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.addToCart= async (req, res) => {
 
  try {
    const { productId,quantity } = req.body;
    // Check if the product exists in the cart
    const cart = await AddToCartModel.findOne({ user: req.user.userId });
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity; 
    } else {
      cart.items.push({ product: productId, quantity: quantity }); 
    }

    await cart.save();

    res.json({ success: true, message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await AddToCartModel.findOne({ user: req.user.userId });

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      const index = cart.items.indexOf(existingItem)
      cart.items.splice(index, 1)
    }

    await cart.save();

    res.json({ success: true, message: 'Item remove From cart successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
exports.incrementInCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await AddToCartModel.findOne({ user: req.user.userId });

    const existingItem = cart.items.find(item => item.product.toString() === productId);
      existingItem.quantity += 1;
      await cart.save();

    res.json({ success: true, message: 'Item incremented successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
exports.decrementInCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await AddToCartModel.findOne({ user: req.user.userId });

    const existingItem = cart.items.find(item => item.product.toString() === productId);
      existingItem.quantity -= 1;
      await cart.save();

    res.json({ success: true, message: 'Item decremented successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await AddToCartModel.findOne({ user: req.user.userId });
    const existingItem = cart.items.find(item => item.product.toString() === productId);
      const index = cart.items.indexOf(existingItem)
      cart.items.splice(index, 1)
      await cart.save();

    res.json({ success: true, message: 'Item remove From cart successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
exports.setCart = async (req, res) => {
  const cartItems = req.body.cartItems;

  try {

    if (cartItems.length > 0) {
      const cart = await AddToCartModel.findOne({ user: req.user.userId });
      await Promise.all(cartItems.map((item) => {
        const existingItem = cart.items.find(itm => itm.product.toString() === item.product._id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        }
        else {
          const cartItem = { product: item.product._id, quantity: item.quantity };
          cart.items.push(cartItem);
        }

      }));

      cart.save();
      const getCart = await AddToCartModel.findOne({ user: req.user.userId }).populate({
        path: 'items',
        select: "product quantity",
        populate: {
          path: 'product',
          model: Product,
        }
      });
      getCart.items.map((ele) =>
      ele.product.featured_image = `${Constent.IMAGE_HOST}${ele.product.featured_image}`
    )

      res.json({ success: true, cartItems: getCart.items });
    }
    else{
      const cart = await AddToCartModel.findOne({ user: req.user.userId });
      cart.items=[];
      cart.save();
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
