import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      price: 0,
      quantity: 0,
      productModal: false
    };
  }
  componentDidMount() {
    this.setState({ name: this.props.name });
    this.setState({ newName: this.props.name });
    this.setState({ id: this.props.id });
    this.setState({ price: this.props.price });
    this.setState({ newPrice: this.props.price });
    this.setState({ quantity: this.props.quantity });
    this.setState({ newQuantity: this.props.quantity });
  }
  handleName = e => {
    this.setState({ newName: e.target.value });
  };
  handlePrice = e => {
    this.setState({ newPrice: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ newQuantity: e.target.value });
  };

  deleteProduct = e => {
    e.preventDefault();
    this.props.onDeleteProduct(this.state.id);

  }
  handleProduct = e => {
    e.preventDefault();
    this.setState({ productModal: false });
    var editProduct = {
      name: this.state.newName,
      quantity: this.state.newQuantity,
      price: this.state.newPrice
    };
    this.props.onEditProduct(this.state.id, editProduct);
    this.setState({ name: this.state.newName });
    this.setState({ quantity: this.state.newQuantity });
    this.setState({ price: this.state.newPrice });
  };
  render() {
    const {
      newName,
      newPrice,
      newQuantity,
      name,
      price,
      quantity
    } = this.state;
    return (
      <tr>
        <td>
          <a href=""> {name} </a>
        </td>
        <td> {price} </td> <td> {quantity} </td>
        <td>
          <a
            className="btn btn-info"
            onClick={() => this.setState({ productModal: true })}
          >
            <i className="glyphicon glyphicon-pencil" />
          </a>
          <a 
            style={{marginLeft: 2 + 'em'}}
            className="btn btn-info"
            onClick={this.deleteProduct}
          >
            <i className="glyphicon glyphicon-remove" />
          </a>
        </td>
        <Modal show={this.state.productModal}>
          <Modal.Header>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" for="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    onChange={this.handleName}
                    className="form-control"
                    value={newName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="price">
                  Price
                </label>
                <div className="col-md-4">
                  <input
                    name="price"
                    placeholder="Price"
                    className="form-control"
                    onChange={this.handlePrice}
                    value={newPrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  for="quantity_on_hand"
                >
                  Quantity
                </label>
                <div className="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity at Hand"
                    onChange={this.handleQuantity}
                    value={newQuantity}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="image">
                  Upload Image
                </label>
                <div className="col-md-4">
                  <input type="file" name="image" />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleProduct}>Update</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
  }
}

export default Product;
