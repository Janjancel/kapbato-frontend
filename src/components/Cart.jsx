import React, { useEffect, useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {    
        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in.");
                return;
            }
        
            try {
                const response = await fetch("http://127.0.0.1:8000/api/cart/", {
                    headers: {
                        Authorization: `Token ${token}`, 
                        "Content-Type": "application/json",
                    },
                });
        
                const data = await response.json();
                console.log("🛒 Cart API Response:", data);  // ✅ Log the response
        
                if (response.ok) {
                    setCartItems(data.items);
                } else {
                    setError("Failed to fetch cart items.");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setError("Error fetching cart items.");
            }
        };
        
        // const fetchCartItems = async () => {
        //     const token = localStorage.getItem("token");
        //     if (!token) {
        //         setError("Please log in.");
        //         return;
        //     }
        
        //     try {
        //         const response = await fetch("http://127.0.0.1:8000/api/cart/", {
        //             headers: {
        //                 Authorization: `Token ${token}`, 
        //                 "Content-Type": "application/json",
        //             },
        //         });
        
        //         if (response.ok) {
        //             const data = await response.json();
        //             setCartItems(data.items);
        //         } else {
        //             setError("Failed to fetch cart items.");
        //         }
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //         setError("Error fetching cart items.");
        //     }
        // };

        fetchCartItems();
    }, []);

    const handleSelectItem = (item) => {
        const isSelected = selectedItems.find((i) => i.id === item.id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems([...cartItems]);
        }
        setSelectAll(!selectAll);
    };

    const handleDeleteSelected = async () => {
        if (selectedItems.length === 0) return;

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete them!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Please log in.");
                    return;
                }

                try {
                    await Promise.all(selectedItems.map(async (item) => {
                        await fetch(`http://127.0.0.1:8000/api/cart/item/${item.id}/`, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json",
                            },
                        });
                    }));
                    setCartItems(cartItems.filter((item) => !selectedItems.includes(item)));
                    setSelectedItems([]);
                    setSelectAll(false);

                    Swal.fire("Deleted!", "Your selected items have been removed.", "success");
                } catch (error) {
                    console.error("Error deleting items:", error);
                }
            }
        });
    };

    const handleQuantityChange = async (item, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedCart);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in.");
            return;
        }
    
        try {
            await fetch(`http://127.0.0.1:8000/api/cart/item/${item.id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    useEffect(() => {
        const total = selectedItems.reduce(
            (sum, item) => sum + item.quantity * parseFloat(item.antique.price),
            0
        );
        setTotalPrice(total.toFixed(2));
    }, [selectedItems]);

    const filteredCartItems = cartItems.filter(item =>
        item.antique.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="bg-white p-4 rounded shadow" style={{ width: "80vw", maxHeight: "90vh", marginLeft: "auto", marginRight: "auto" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Your Cart</h2>
                    <div className="w-25">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search items..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {filteredCartItems.length > 0 ? (
                <div className="table-responsive" style={{ maxHeight: "60vh", overflow: "auto" }}>
                    <table className="table table-bordered table-striped text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>
                                    <input 
                                        type="checkbox" 
                                        onChange={handleSelectAll} 
                                        checked={selectAll} 
                                    />
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelectItem(item)}
                                            checked={selectedItems.some((i) => i.id === item.id)}
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src={`http://127.0.0.1:8000${item.antique.image}`}
                                            alt={item.antique.name}
                                            className="img-thumbnail"
                                            style={{ width: "70px", height: "50px", objectFit: "cover" }}
                                            onError={(e) => (e.target.src = "placeholder.jpg")}
                                        />
                                    </td>
                                    <td className="fw-bold">{item.antique.name}</td>
                                    <td className="text-truncate" style={{ maxWidth: "150px" }}>
                                        {item.antique.description}
                                    </td>
                                    <td className="fw-bold text-primary">${item.antique.price}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleQuantityChange(item, item.quantity - 1)}>
                                            -
                                        </button>
                                        <span className="fw-bold">{item.quantity}</span>
                                        <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                                            +
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-muted text-center">No items found.</p>
            )}

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button className="btn btn-danger" onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>Delete Selected</button>
                    <h4 className="me-3">Total: <span className="text-success">${totalPrice}</span></h4>
                    <button className="btn btn-success" disabled={selectedItems.length === 0}>Place Order</button>
                </div>
            </div>
        </div>
    );
}