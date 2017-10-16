import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCart } from '../actions/cartActions';

class Menu extends Component {
    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/about">
                            About
                        </NavItem>
                        <NavItem eventKey={2} href="/contacts">
                            Contact Us
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/admin">
                            Admin
                        </NavItem>
                        <NavItem eventKey={2} href="/cart">
                            Your Cart
                            <Badge className="badge">
                                {this.props.totalQuantity > 0 ? this.props.totalQuantity : ''}
                            </Badge>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    totalQuantity: state.cart.total.totalQuantity
});

export default connect(mapStateToProps)(Menu);
