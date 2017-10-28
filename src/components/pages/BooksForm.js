import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
    MenuItem,
    InputGroup,
    DropdownButton,
    Image,
    Col,
    Row,
    Well,
    Panel,
    FormControl,
    FormGroup,
    ControlLabel,
    Button
} from 'react-bootstrap';

import { postBooks, deleteBooks, getBooks, resetButton } from '../../actions/booksActions';

class BooksForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.state = {
            images: [{}],
            img: ''
        };
    }
    componentDidMount() {
        this.props.getBooks();
        axios
            .get('/images')
            .then(res => {
                this.setState({
                    images: res.data
                });
            })
            .catch(err => {
                this.setState({
                    images: 'error loading image files from the server',
                    img: ''
                });
            });
    }
    handleSubmit() {
        const book = {
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            image: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value
        };
        this.props.postBooks(book);
        this.resetForm();
    }
    handleSelect(img) {
        this.setState({
            img: `/images/${img}`
        });
    }
    onDelete() {
        const _id = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(_id);
    }
    resetForm() {
        this.props.resetButton();

        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({
            img: ''
        });
    }
    render() {
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary">
                                    {this.state.images.map(img => (
                                        <MenuItem
                                            onClick={() => {
                                                this.handleSelect(img.name);
                                            }}
                                            key={Date.now() * Math.random()}
                                            eventKey={img.name}>
                                            {img.name}
                                        </MenuItem>
                                    ))}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl type="text" placeholder="Enter Title" ref="title" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl type="text" placeholder="Enter Description" ref="description" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl type="text" placeholder="Enter Price" ref="price" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button
                                onClick={!this.props.msg ? this.handleSubmit : this.resetForm}
                                bsStyle={!this.props.style ? 'primary' : this.props.style}>
                                {!this.props.msg ? 'Save book' : this.props.msg}
                            </Button>
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
                    </Col>
                </Row>
            </Well>
        );
    }
}

const mapStateToProps = state => ({
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
});

const mapDispatchToProps = dispatch => bindActionCreators({ postBooks, deleteBooks, getBooks, resetButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
