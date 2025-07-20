import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";

const fallbackImg = '/placeholder.png';

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const { firmId, firmName } = useParams();

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  return (
    <>
      <TopBar />
      <section className="productSection">
        <h3>{firmName}</h3>
        {products.map((item) => (
          <div className="productBox" key={item._id}>
            <div>
              <div><strong>{item.productName}</strong></div>
              <div>₹{item.price}</div>
              <div>{item.description}</div>
            </div>
            <div className="productGroup">
              <img
                src={`${API_URL}/uploads/${item.image}`}
                alt={item.productName}
                onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
              />
              <div className="addButton">ADD</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductMenu;
