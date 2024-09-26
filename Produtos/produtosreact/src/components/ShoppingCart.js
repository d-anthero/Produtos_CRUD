import { Modal, ModalBody} from "reactstrap";
import './assets/ShoppingCart.css'

export function ShoppingCartButton({getTotalProducts, openModalCart}){
  return( 
  <div className="cartButton">
<button type="button" onClick={() => openModalCart()} class="btn btn-primary">
  Carrinho <span class="badge badge-light">{getTotalProducts()}</span>
</button>
  </div>
  );
}

export function ShoppingCart({modalCart, openModalCart, cart, removeFromCart, getTotalPrice}) {
  return (
    <Modal isOpen={modalCart}>
      <ModalBody>
        <div className="bd">
    <div class="col-xl-11">
<div class="d-flex justify-content-between align-items-center mb-4">
  <h3 class="fw-normal mb-0">Carrinho</h3> 
  <p>Total: R${getTotalPrice()}</p>
  <br></br>
  <button className="btn btn-primary btn-danger" onClick={() => openModalCart()}>Fechar</button>
</div>
<div class="card rounded-3 mb-4">
  <div class="card-body p-4">
  {cart.map((product, index) =>(
    <div key={index} class="row d-flex justify-content-between align-items-center">

      <div class="col-md-3 col-lg-3 col-xl-3">
        <p class="lead fw-normal mb-2">{product.name}</p>
        
      </div>
      
      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h5 class="mb-0">R${product.price}</h5>
      </div>
      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
        <a onClick={() => removeFromCart(product.id)} href="#!" class="text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></a>
      </div>
 
    </div>
    ))}
  </div>
</div>
  </div>
  </div>
  </ModalBody>
</Modal>
  );
}


