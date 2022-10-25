import React, { Component } from 'react';

export default class Todo extends Component {

    editTodoHandler(id) {
        // console.log(id);

        this.props.onEdit(id);
    }

    removeTodoHandler(id) {
        // console.log(id);

        this.props.onRemove(id);
    }

    render() {

        let { title, id, complted } = this.props;

        // console.log(this.props.complted);


        // Way 1
        return (
            // 'completed' class for completed todos

            <div className={`todo ${complted ? 'completed' : ''}`} style={{ display: 'flex' }}>

                <li className="todo-item">{title}</li>

                <button className="check-btn" onClick={this.editTodoHandler.bind(this, id)}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button className="trash-btn" onClick={this.removeTodoHandler.bind(this, id)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>

            </div>


            // Way 2
            // return (
            //     // 'completed' class for completed todos

            //     complted ?
            //         <div className='todo completed' style={{ display: 'flex' }}>

            //             <li className="todo-item">{title}</li>

            //             <button className="check-btn" onClick={this.editTodo.bind(this, id)}>
            //                 <i className="fas fa-check" aria-hidden="true"></i>
            //             </button>

            //             <button className="trash-btn" onClick={this.removeTodo.bind(this, id)}>
            //                 <i className="fas fa-trash" aria-hidden="true"></i>
            //             </button>

            //         </div>

            //         :

            //         <div className='todo ' style={{ display: 'flex' }}>

            //             <li className="todo-item">{title}</li>

            //             <button className="check-btn" onClick={this.editTodo.bind(this, id)}>
            //                 <i className="fas fa-check" aria-hidden="true"></i>
            //             </button>

            //             <button className="trash-btn" onClick={this.removeTodo.bind(this, id)}>
            //                 <i className="fas fa-trash" aria-hidden="true"></i>
            //             </button>

            //         </div>
        )
    }
} 