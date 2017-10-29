import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';

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
                    <Carousel>
                        <Carousel.Item>
                            <img
                                style={{ margin: '0 auto' }}
                                width={900}
                                height={500}
                                alt="900x500"
                                src="/images/book.jpg"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                style={{ margin: '0 auto' }}
                                width={900}
                                height={500}
                                alt="900x500"
                                src="/images/book.jpg"
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>

                <Row>
                    <Cart />
                </Row>

                <Row>
                    {this.props.books.map(book => (
                        <Col xs={12} sm={4} key={book._id}>
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
