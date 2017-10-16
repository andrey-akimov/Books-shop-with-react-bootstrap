import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

import { postBooks, deleteBooks } from '../../actions/booksActions';

class BooksForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    handleSubmit() {
        const book = {
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        };
        this.props.postBooks(book);
    }
    onDelete() {
        const _id = findDOMNode(this.refs.delete).value;
        console.log(typeof _id);
        this.props.deleteBooks(_id);
    }
    render() {
        return (
            <Well>
                <Panel>
                    <FormGroup controlId="title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl type="text" placeholder="Enter Title" ref="title" />
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl type="text" placeholder="Enter Description" ref="description" />
                    </FormGroup>
                    <FormGroup controlId="price">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl type="text" placeholder="Enter Price" ref="price" />
                    </FormGroup>
                </Panel>
                <Panel style={{ marginTop: '25px' }}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select a label to delete</ControlLabel>
                        <FormControl ref="delete" componentClass="select" placeholder="select">
                            {this.props.books.map(book => (
                                <option key={book._id} value={book._id}>
                                    {book.title}
                                </option>
                            ))}
                        </FormControl>
                    </FormGroup>
                    <Button onClick={this.onDelete} bsStyle="danger">
                        Delete book
                    </Button>
                </Panel>
                <Button onClick={this.handleSubmit}>Save book</Button>
            </Well>
        );
    }
}

const mapStateToProps = state => ({
    books: state.books.books
});

const mapDispatchToProps = dispatch => bindActionCreators({ postBooks, deleteBooks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
