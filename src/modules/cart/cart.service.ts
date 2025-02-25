import { Types } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';
import { Cart } from './cart.model';
import { Product } from '../products/product.model';

const addToCartInToDB = async (cartItems: TCart, userId: string) => {
  const productIds = cartItems.items.map(
    (item) => new Types.ObjectId(item.productId),
  );

  const products = await Product.find({ _id: { $in: productIds } });
  const totalPrice = cartItems.items.reduce((sum, item) => {
    const objectId = new Types.ObjectId(item.productId);

    const product = products.find(
      (p) => p._id.toString() === objectId.toString(),
    );

    if (!product) throw new Error('Product not found');

    if (product.stock < item.quantity) {
      throw new Error(
        `Not enough stock for ${product.name}. Available: ${product.stock}`,
      );
    }

    product.stock -= item.quantity;
    product.save();

    return sum + product.price * item.quantity;
  }, 0);

  const result = await Cart.create({
    userId,
    items: cartItems.items,
    totalPrice,
  });

  return result;
};

const getCartFromDB = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId format');
  }

  const result = await Cart.findOne({ userId })
    .populate({
      path: 'items.productId',
      model: 'Product',
      select: 'name price description imageUrl',
    })
    .lean();

  return result;
};

const removeFromCartFromDB = async (userId: string, productId: string) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid userId or productId format');
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );
  await cart.save();
  return cart;
};

const clearCartFromDB = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId format');
  }

  return await Cart.findOneAndDelete({ userId });
};

export const CartService = {
  addToCartInToDB,
  getCartFromDB,
  removeFromCartFromDB,
  clearCartFromDB,
};
