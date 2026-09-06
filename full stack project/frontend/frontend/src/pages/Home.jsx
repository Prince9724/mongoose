import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../features/products/productThunks';
import { getCategoriesThunk } from '../features/categories/categoryThunks';
import ProductCard from '../components/products/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk({ limit: 100 }));
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.filter(p => p.isFeatured).slice(0, 8));
      setNewArrivals(products.filter(p => p.isNewArrival).slice(0, 8));
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* ✅ HERO BANNER - Offer Banner */}
      <section className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
        <div className="p-12 md:p-20 text-center">
          <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
            🔥 LIMITED TIME OFFER
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Summer Sale! 
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Up to 50% Off on Selected Items
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold text-2xl shadow-lg">
              50% OFF
            </span>
            <span className="text-white text-lg">Use Code: <span className="font-bold">SUMMER50</span></span>
          </div>
          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Shop Now →
          </Link>
        </div>
      </section>

      {/* ✅ CATEGORIES SECTION */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📂 Shop by Category</h2>
          <Link to="/products" className="text-blue-600 hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No categories available
            </div>
          ) : (
            categories.slice(0, 6).map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-xl transition hover:scale-105"
              >
                <div className="w-full h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-3xl">
                  📦
                </div>
                <p className="font-medium text-gray-800">{category.name}</p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* ✅ FEATURED PRODUCTS */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">⭐ Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline">
            View All →
          </Link>
        </div>
        {featuredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No featured products yet.</p>
            <p className="text-sm text-gray-400 mt-2">Admin will add featured products soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ✅ NEW ARRIVALS */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🆕 New Arrivals</h2>
          <Link to="/products" className="text-blue-600 hover:underline">
            View All →
          </Link>
        </div>
        {newArrivals.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No new arrivals yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ✅ SECOND BANNER - Extra Offer */}
      <section className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-xl">
        <div className="p-12 text-center">
          <span className="inline-block bg-white text-pink-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
            🎉 EXCLUSIVE
          </span>
          <h2 className="text-3xl font-bold mb-4">Get 20% Off on Your First Order!</h2>
          <p className="text-xl mb-4">Use Code: <span className="font-bold">WELCOME20</span></p>
          <Link
            to="/products"
            className="inline-block bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Shop Now →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;