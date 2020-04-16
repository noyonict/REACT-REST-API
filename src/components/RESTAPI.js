import React, { Component } from 'react'
import axios from 'axios';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input, InputGroup, FormGroup } from 'reactstrap';

export class RESTAPI extends Component {
    state = {
        todos: [],
        newTodoData: {
            title: '',
            completed: false
        },
        editTodoData: {
            id: '',
            title: '',
            completed: ''
        },
        newBookModal: false,
        editTodoModal: false,
    }

    componentDidMount() {
        this._getTodos()
    }

    toggleNewBookModal() {
        this.setState({
            newBookModal: !this.state.newBookModal
        })
    }

    toggleEditTodoModal() {
        this.setState({
            editTodoModal: !this.state.editTodoModal
        })
    }

    addTodo() {
        axios.post(`https://jsonplaceholder.typicode.com/todos`, this.state.newTodoData)
            .then(res => {
                // console.log(res.data)
                let { todos } = this.state;
                todos.push(res.data)
                this.setState({
                    todos, newBookModal: false, newTodoData: {
                        title: '',
                        completed: false
                    }
                })
            })
    }

    updateTodo() {
        let { id, title, completed } = this.state.editTodoData;
        axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            title, completed
        }).then(res => {
            this._getTodos()
            console.log(res.data)

            this.setState({
                editTodoModal: false, editTodoData: { id: '', title: '', completed: '' }
            })
        })

    }

    _getTodos() {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
            .then(res => {
                const todos = res.data;
                this.setState({ todos });
            })
    }

    editTodo(id, title, completed) {
        // console.log(id, title, completed)
        this.setState({
            editTodoData: { id, title, completed }, editTodoModal: !this.state.editTodoModal
        })

    }

    deleteTodo(id) {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => {
                console.log(res.data)
            })

        this._getTodos()
    }

    render() {
        let todos = this.state.todos.map(todo => {
            return (
                <tr key={todo.id}>
                    <td> {todo.id} </td>
                    <td> {todo.title} </td>
                    <td> {todo.completed ? "Yes" : "No"} </td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editTodo.bind(this, todo.id, todo.title, todo.completed)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteTodo.bind(this, todo.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
        return (
            <>
                <h1>Todo List</h1>
                <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Todo</Button>

                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new todo item</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" value={this.state.newTodoData.title} onChange={(e) => {
                                let { newTodoData } = this.state;

                                newTodoData.title = e.target.value

                                this.setState({ newTodoData })
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="completed">Completed</Label>
                            <Input id="completed" value={this.state.newTodoData.completed} onChange={e => {
                                let { newTodoData } = this.state;

                                newTodoData.completed = e.target.value

                                this.setState({ newTodoData })
                            }} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.addTodo.bind(this)}>Add Todo</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>

                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editTodoModal} toggle={this.toggleEditTodoModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditTodoModal.bind(this)}>Edit todo item</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" value={this.state.editTodoData.title} onChange={(e) => {
                                let { editTodoData } = this.state;

                                editTodoData.title = e.target.value

                                this.setState({ editTodoData })
                            }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="completed">Completed</Label>
                            <Input id="completed" value={this.state.editTodoData.completed} onChange={e => {
                                let { editTodoData } = this.state;

                                editTodoData.completed = e.target.value

                                this.setState({ editTodoData })
                            }} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.updateTodo.bind(this)}>Update Todo</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditTodoModal.bind(this)}>Cancel</Button>

                    </ModalFooter>
                </Modal>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            {/* <th>Rating</th> */}
                            <th>Completed</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>Book title</td>
                            <td>Completed</td>
                            <td>
                                <Button color="success" size="sm" className="mr-2">Edit</Button>
                                <Button color="danger" size="sm">Delete</Button>
                            </td>
                        </tr> */}
                        {todos}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default RESTAPI
