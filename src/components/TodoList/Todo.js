import React, { Component } from 'react'

export default class Todo extends Component {
    editHandler(id) {
        this.props.onEdit(id)
    }


    removeBtn(id) {
        this.props.onRemove(id)
    }


    render() {
        return (
            // 'completed' class for completed todos
            <div className={`todo ${this.props.completed ? 'completed' : ''}`} style={{ display: 'flex' }}>
                <li className="todo-item">{this.props.todoTitle}</li>

                <button onClick={this.editHandler.bind(this, this.props.id)} className="check-btn">
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button onClick={this.removeBtn.bind(this, this.props.id)} className="trash-btn">
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
    }
}