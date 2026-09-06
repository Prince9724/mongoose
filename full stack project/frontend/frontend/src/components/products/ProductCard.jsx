import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartThunk } from '../../features/cart/cartThunks';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const result = await dispatch(addToCartThunk({
      productId: product._id,
      quantity: 1
    }));
    if (result.payload?.success) {
      toast.success('Added to cart!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300x300?text=Product'}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition duration-300"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">
          {product.category?.name || 'Uncategorized'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ₹{product.price}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.comparePrice}
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;