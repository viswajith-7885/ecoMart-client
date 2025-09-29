import { useContext } from "react";
import { CartContext } from "../context/CartProvider";




export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="p-6  max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl mt-6 w-full">
      {/* Heading */}
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b pb-3 flex items-center justify-between">
        🛒 Your Cart
        <span className="text-sm font-medium text-gray-500">
          {cartItems.length} items
        </span>
      </h2>

      {/* Empty State */}
      {cartItems.length === 0 && (
        <p className="text-gray-500 text-center py-10 text-lg">
          Your cart is empty.
        </p>
      )}

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <span className="block text-gray-800 font-semibold">
                {item.name}
              </span>
              <span className="text-sm text-gray-500">
                Quantity: <b>{item.quantity}</b>
              </span>
            </div>
            <button
              className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded-lg hover:bg-red-100 transition"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Clear Cart Button */}
      {cartItems.length > 0 && (
        <div className="mt-8 text-right">
          <button
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition"
            onClick={clearCart}
          >
            🗑️ Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
