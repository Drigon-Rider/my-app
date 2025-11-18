import { useEffect, useState } from "react";
import axios from "axios";

const fetchLimitedProducts = async (limit: number) => {
  const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
  return response.data;
};

const LimitFetch = ({ initialLimit = 3 }) => {
  const [limit, setLimit] = useState(initialLimit);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
        const products = await fetchLimitedProducts(limit);
        setData(products);
    };
    getData();
  }, [limit]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Limited Fetch Component</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <article
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col cursor-pointer"
          >
            <div className="flex items-center justify-center h-48 mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain"
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h2>
            <div className="text-indigo-600 font-bold mb-2">${product.price}</div>

            <p className="text-sm text-gray-600 mb-4 max-h-20 overflow-hidden">
              {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
              <span>
                Category:{" "}
                <span className="text-gray-700 font-medium">{product.category}</span>
              </span>
              <span>
                Rating:{" "}
                <span className="text-yellow-500 font-medium">
                  {product.rating?.rate}
                </span>
                <span className="text-gray-400"> ({product.rating?.count})</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setLimit(limit * 2)}
          className="px-4 py-2 bg-indigo-600 text-black rounded-lg hover:bg-indigo-700 transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default LimitFetch;
