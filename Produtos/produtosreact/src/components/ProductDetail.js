import React from 'react';
import './assets/ProductDetail.css'
const ProductDetail = ({searchValue, askGetByName, openModalInclude}) =>{
    return(
        <div className="header">
        <button className="btn btn-success" onClick={() => openModalInclude()}>
          Novo produto
        </button> &nbsp; &nbsp;     
        <input
        placeholder="Procure um produto..."
              type="text"
              className="form-control"
              value={searchValue}
              onKeyUp={askGetByName}
              onInput={askGetByName}
            />
      </div>
    );
}; export default ProductDetail;

