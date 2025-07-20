import React, { useState } from 'react'
import { itemData } from '../data'

const fallbackImg = '/placeholder.png';

const ItemsDisplay = () => {
  const [displayItem, setDisplayItem] = useState(itemData)

  return (
    <div className="itemSection">
      {displayItem.map((item) => (
        <div className="gallery" key={item.item_img}>
          <img
            src={item.item_img}
            alt={item.item_img}
            onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
          />
        </div>
      ))}
    </div>
  )
}

export default ItemsDisplay
