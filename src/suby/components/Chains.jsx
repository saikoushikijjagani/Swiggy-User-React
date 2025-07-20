import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const fallbackImg = '/placeholder.png'; // place a placeholder image in public

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`);
      const newData = await response.json();
      setVendorData(newData);
      setLoading(false);
    } catch (error) {
      alert("Failed to fetch data");
      setLoading(true);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;
    if (gallery) {
      if (direction === "left") {
        gallery.scrollTo({ left: gallery.scrollLeft - scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        gallery.scrollTo({ left: gallery.scrollLeft + scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className='mediaChainSection'>
      <div className="loaderSection">
        {loading && (
          <>
            <div className="loader">Your 🥣 is Loading...</div>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </>
        )}
      </div>
      <div className="btnSection">
        <button onClick={() => handleScroll("left")}>
          <FaRegArrowAltCircleLeft className='btnIcons' />
        </button>
        <button onClick={() => handleScroll("right")}>
          <FaRegArrowAltCircleRight className='btnIcons' />
        </button>
      </div>
      <h3 className='chainTitle'>Top restaurant chains in Hyderabad</h3>
      <section className="chainSection" id="chainGallery">
        {vendorData.vendors && vendorData.vendors.map((vendor) => (
          <div className="vendorBox" key={vendor._id || vendor.firm?.[0]?._id}>
            {vendor.firm.map((item) => (
              <div key={item._id}>
                <Link to={`/products/${item._id}/${item.firmName}`} className="link">
                  <div className="firmImage">
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.firmName}
                      onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Chains;
