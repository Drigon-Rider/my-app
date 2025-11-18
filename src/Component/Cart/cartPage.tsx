import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDeleteProduct } from '../../Hooks/CartHook';

type CartItem = { productId: number; quantity: number };
type ProductWithQty = {
    id: number;
    title: string;
    price: number;
    image?: string;
    quantity: number;
};

const CartPage = () => {
    // const{mutate:UpdateProduct} = useUpdateProduct();
    const{mutate:DeleteProduct} = useDeleteProduct();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<ProductWithQty[]>([]);
    const [cartMeta, setCartMeta] = useState<{ id?: number; date?: string; userId?: number } | null>(null);
    const [id,setid] = useState(1);

    const HandelDelete = (id: number) =>{
        DeleteProduct(id, {
            onSuccess: () => {
                setItems([]);
                setCartMeta(null);
            }
        });
    }

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: cart } = await axios.get('https://fakestoreapi.com/carts/'+id);
                if (cancelled) return;
                setCartMeta({ id: cart.id, date: cart.date, userId: cart.userId });

                const products: CartItem[] = Array.isArray(cart.products) ? cart.products : [];

                // fetch product details in parallel
                const promises = products.map(async (p) => {
                    const { data: prod } = await axios.get(`https://fakestoreapi.com/products/${p.productId}`);
                    return {
                        id: prod.id,
                        title: prod.title,
                        price: prod.price,
                        image: prod.image,
                        quantity: p.quantity,
                    } as ProductWithQty;
                });

                const resolved = await Promise.all(promises);
                if (cancelled) return;
                setItems(resolved);
            } catch (err: any) {
                if (cancelled) return;
                setError(err?.message || 'Failed to load cart');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);

    if (loading) return <div className="p-4">Loading cart…</div>;
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Your Cart</h2>
                    {cartMeta && (
                        <div className="text-sm text-gray-500">Cart #{cartMeta.id} • {new Date(cartMeta.date || '').toLocaleString()}</div>
                    )}
                </div>

                <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-600">Cart ID</label>
                    <input
                        type="number"
                        value={id}
                        onChange={e=>setid(Number(e.target.value))}
                        className="w-20 border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                </div>
            </div>

            {items.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 rounded p-8 text-center text-gray-600">Your cart is empty.</div>
            ) : (
                <div className="space-y-4">
                    {items.map((it) => (
                        <div key={it.id} className="bg-white shadow-sm rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-full sm:w-20 flex-shrink-0 flex items-center justify-center">
                                {it.image ? (
                                    <img src={it.image} alt={it.title} className="w-16 h-16 object-contain" />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-100 rounded-md" />
                                )}
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium text-gray-800">{it.title}</div>
                                        <div className="text-sm text-gray-500">Quantity: {it.quantity}</div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-800">${(it.price * it.quantity).toFixed(2)}</div>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">Unit price: ${it.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}

                    <div className="bg-white p-4 rounded-md flex flex-col sm:flex-row items-center justify-between shadow-sm">
                        <div className="text-sm text-gray-600">Items: <span className="font-medium text-gray-800">{items.length}</span></div>
                        <div className="mt-3 sm:mt-0 text-right">
                            <div className="text-lg text-gray-600">Total</div>
                            <div className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
                <button
                    onClick={() => HandelDelete(id)}
                    className="bg-red-600 text-black px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Delete Cart
                </button>
            </div>
        </div>
    );
};

export default CartPage;