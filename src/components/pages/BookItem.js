import React, { Component } from 'react';
import { Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../actions/cartActions';

class BookItem extends Component {
    constructor() {
        super();
        this.handleCart = this.handleCart.bind(this);
    }
    handleCart() {
        let { _id, title, description, price, quantity } = this.props;
        const book = {
            _id,
            title,
            description,
            price,
            quantity: 1
        };
        if (this.props.cart.length > 0) {
            const isInArr = this.props.cart.findIndex(el => el._id === _id);
            if (isInArr === -1) {
                this.props.addToCart(book);
            }
        } else {
            this.props.addToCart(book);
        }
    }
    render() {
        let { title, description, price } = this.props;
        return (
            <Well>
                <Row>
                    <Col xs={12}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <h6>usd. {price}</h6>
                        <Button onClick={this.handleCart} bsStyle="primary">
                            Buy now
                        </Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart.cart
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
