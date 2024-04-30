import React, { Component } from 'react'
import Header from './Header'
import Todo from './Todo'

export default class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todoTitle: '',
            status: 'all'
        }

        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.statusHandler = this.statusHandler.bind(this)
        this.handlerTodoInput = this.handlerTodoInput.bind(this)
    }


    handlerTodoInput(e) {
        this.setState({
            todoTitle: e.target.value
        })
    }


    addTodo(e) {
        e.preventDefault()

        let { todoTitle } = this.state


        if (!todoTitle) {
            return false
        }

        let newTodoObject = {
            id: this.state.todos.length + 1,
            todoTitle: this.state.todoTitle,
            completed: false
        }

        this.setState({
            todos: [...this.state.todos, newTodoObject],
            todoTitle: ''
        })


    }



    removeTodo(todoId) {

        let mainTodo = this.state.todos.filter(todo => {
            return todo.id !== todoId
        })


        this.setState({
            todos: mainTodo
        })


    }


    editTodo(todoId) {

        let newTodo = [... this.state.todos]

        newTodo.forEach(todo => {

            if (todo.id === todoId) {
                todo.completed = !todo.completed
            }
        })

        this.setState({
            todos: newTodo
        })

    }



    statusHandler(e) {
        let statusData = e.target.value

        this.setState({
            status: statusData
        })
    }


    render() {
        return (
            <>
                <Header />
                <form onSubmit={this.addTodo}>
                    <input type="text" className="todo-input" maxLength="40" value={this.state.todoTitle} onChange={this.handlerTodoInput} />
                    <button className="todo-button" type="submit">
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className="select">
                        <select onChange={this.statusHandler} name="todos" className="filter-todo">
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                </form>

                <div className="todo-container">
                    <ul className="todo-list">

                        {
                            this.state.status === 'completed' && this.state.todos.filter(todo => todo.completed === true).map(todo => {
                                return <Todo {...todo} key={todo.id} onRemove={this.removeTodo} onEdit={this.editTodo} />
                            })
                        }

                        {
                            this.state.status === 'uncompleted' && this.state.todos.filter(todo => todo.completed === false).map(todo => {
                                return <Todo {...todo} key={todo.id} onRemove={this.removeTodo} onEdit={this.editTodo} />
                            })
                        }

                        {
                            this.state.status === 'all' && this.state.todos.map(todo => {
                                return <Todo {...todo} key={todo.id} onRemove={this.removeTodo} onEdit={this.editTodo} />
                            })
                        }


                    </ul>
                </div>
            </>
        )
    }
}
