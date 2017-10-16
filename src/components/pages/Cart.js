import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Well, Panel, Col, Row, Button, ButtonGroup, Label } from 'react-bootstrap';

import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends Component {
    constructor() {
        super();
        this.onDelete = this.onDelete.bind(this);
        this.onIncr = this.onIncr.bind(this);
        this.onDecr = this.onDecr.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.state = {
            showModal: false
        };
    }
    onDelete(_id) {
        this.props.deleteCartItem(_id);
    }
    onIncr(_id, quantity) {
        this.props.updateCart(_id, 1);
    }
    onDecr(_id, quantity) {
        if (quantity > 0) {
            this.props.updateCart(_id, -1);
        }
    }
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
    }
    render() {
        return (
            <Panel header="Cart" bsStyle="primary">
                {this.props.cart.cart.map(el => (
                    <Panel key={el._id}>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h6>{el.title}</h6>
                                <span> </span>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>usd. {el.price}</h6>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>
                                    qty. <Label bsStyle="success">{el.quantity}</Label>
                                </h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup style={{ minWidth: '300px' }}>
                                    <Button
                                        onClick={() => this.onDecr(el._id, el.quantity)}
                                        bsStyle="default"
                                        bsSize="small">
                                        -
                                    </Button>
                                    <Button
                                        onClick={() => this.onIncr(el._id, el.quantity)}
                                        bsStyle="default"
                                        bsSize="small">
                                        +
                                    </Button>
                                    <span> </span>
                                    <Button onClick={() => this.onDelete(el._id)} bsStyle="danger" bsSize="small">
                                        DELETE
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel>
                ))}

                <Row>
                    <Col xs={12}>
                        <h6>Total amount: {this.props.cart.total.totalQuantity}</h6>
                        <Button onClick={this.open} bsStyle="success" bsSize="small">
                            PROCEED TO CHECKOUT
                        </Button>
                    </Col>
                </Row>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will recive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col>
                            <h6>total $: {this.props.cart.total.totalCash}</h6>
                        </Col>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart
});

const mapDispatchToProps = dispatch => bindActionCreators({ deleteCartItem, updateCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
