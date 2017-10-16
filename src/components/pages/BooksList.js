import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import { getBooks } from '../../actions/booksActions';
import BookItem from './BookItem';
import BooksForm from './BooksForm';
import Cart from './Cart';

class BooksList extends Component {
    componentDidMount() {
        this.props.getBooks();
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <BooksForm />
                    </Col>
                    {this.props.books.map(book => (
                        <Col xs={12} sm={6} md={4} key={book._id}>
                            <BookItem {...book} />
                        </Col>
                    ))}
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    books: state.books.books
});

const mapDispatchToProps = dispatch => bindActionCreators({ getBooks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
