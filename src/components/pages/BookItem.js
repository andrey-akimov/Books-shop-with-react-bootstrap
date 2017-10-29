import React, { Component } from 'react';
import { Row, Col, Well, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends Component {
    constructor() {
        super();
        this.onReadMore = this.onReadMore.bind(this);
        this.handleCart = this.handleCart.bind(this);
        this.state = {
            isClicked: false
        };
    }
    onReadMore() {
        this.setState({ isClicked: true });
    }
    handleCart() {
        let { _id, title, description, images, price, quantity } = this.props;
        const book = [
            ...this.props.cart,
            {
                _id,
                title,
                description,
                images,
                price,
                quantity: 1
            }
        ];
        if (this.props.cart.length > 0) {
            const isInArr = this.props.cart.findIndex(el => el._id === _id);
            if (isInArr === -1) {
                this.props.addToCart(book);
            } else {
                this.props.updateCart(_id, 1, this.props.cart);
            }
        } else {
            this.props.addToCart(book);
        }
    }
    render() {
        let { title, description, price } = this.props;
        let { isClicked } = this.state;
        return (
            <Well>
                <Row style={{ height: '400px' }}>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.image} responsive />
                    </Col>
                    <Col xs={12} sm={8}>
                        <h3>{title}</h3>
                        <p>
                            {description.length > 50 && isClicked === false ? description.slice(0, 50) : description}
                            <Button className="link" onClick={this.onReadMore}>
                                {isClicked === false && description !== null && description.length > 50
                                    ? '...read more'
                                    : ''}
                            </Button>
                        </p>
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

const mapDispatchToProps = dispatch => bindActionCreators({ addToCart, updateCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
