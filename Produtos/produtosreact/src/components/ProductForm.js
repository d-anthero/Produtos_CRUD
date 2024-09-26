import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function ModalInclude({handleChange, modalInclude, askPost, openModalInclude}){
    return (
        <Modal isOpen={modalInclude}>
<ModalHeader>Incluir produto</ModalHeader>
<ModalBody>
  <div className="form-group">
    <label>Nome: </label>
    <br />
    <input
      type="text"
      className="form-control"
      name="name"
      onChange={handleChange}
    />
    <label>Preço: </label>
    <br />
    <input
      type="text"
      className="form-control"
      name="price"
      onChange={handleChange}
    />
    <label>Descrição: </label>
    <br />
    <input
      type="text"
      className="form-control"
      name="description"
      onChange={handleChange}
    />
  </div>
</ModalBody>
<ModalFooter>
  <button className="" onClick={() => askPost()}>
    Incluir
  </button>
  {"   "} &nbsp;
  <button className="btn btn btn-primarybtn-danger" onClick={() => openModalInclude()}>
    Cancelar
  </button>
</ModalFooter>
</Modal>
    )
}
export function ModalEdit({handleChange, selectedProduct, modalEdit, openModalEdit, askPut}){
    return(
        <Modal isOpen={modalEdit}>
        <ModalHeader>Editar produto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br /> <input               type="text"
              className="form-control" readOnly value={selectedProduct && selectedProduct.id} />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={selectedProduct && selectedProduct.name}
            />
            <label>Preço: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="price"
              onChange={handleChange}
              value={selectedProduct && selectedProduct.price}
            />
            <label>Descrição: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={handleChange}
              value={selectedProduct && selectedProduct.description}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => askPut()}>
            Editar
          </button>
          &nbsp;
          <button className="btn btn-danger" onClick={() => openModalEdit()}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    )
}
export function ModalDelete({selectedProduct, askDelete, modalDelete, openModalDelete}){
    return (
        <Modal isOpen={modalDelete}>
        <ModalBody>
          Deseja excluir o produto: {selectedProduct && selectedProduct.name} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => askDelete()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => openModalDelete()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    )
}
