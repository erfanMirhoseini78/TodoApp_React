import React, { Component } from 'react';
import Header from './Header';
import Todo from './Todo';

export default class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            todoTitle: '',
            status: 'all',
        }
    }

    addTodo(event) {
        // console.log(event);

        event.preventDefault();

        if (this.state.todoTitle.trim()) {
            let newTodo = {
                id: this.state.todos.length + 1,
                title: this.state.todoTitle,
                complted: false,
            }

            // Way 1
            this.setState({ todos: [...this.state.todos, newTodo] });

            // Way 2
            // this.setState(prevState => {
            //     return { todos: [...prevState.todos, newTodo] }
            // });

            this.setState({ todoTitle: '' });
        }
    }


    todoTitleHandler(event) {
        // console.log(event);

        this.setState({ todoTitle: event.target.value })
    }

    keyDownInput(event) {
        // console.log(event);

        event.code === 'Escape' && this.setState({ todoTitle: '' });
    }

    editTodo(todoID) {
        // console.log(todoID);

        let completedTodo = [...this.state.todos]


        // Way 1
        // let mainTodo = completedTodo.find(todo => {
        //     return todo.id === todoID
        // })

        // console.log(mainTodo);

        // mainTodo.complted = !mainTodo.complted;

        // console.log(mainTodo);


        // Way 2
        completedTodo.forEach(todo => {
            // Way 1
            // if (todo.id === todoID) {
            //     todo.complted = !todo.complted;
            // }

            // Way 2
            (todo.id === todoID) && (todo.complted = !todo.complted)
        })

        // console.log(completedTodo);

        // Way 1
        // this.setState({ todos: [...this.state.todos] });

        // Way 2
        this.setState(prevState => {
            return { todos: [...prevState.todos] }
        });
    }


    // Way 1 => Method findIndex + Splice
    // removeTodo(todoID) {
    //     // console.log(todoID);

    //     let todosCopy = [...this.state.todos];

    //     let mainTodo = todosCopy.findIndex(todo => {
    //         return todo.id === todoID
    //     })

    //     // console.log(mainTodo);

    //     todosCopy.splice(mainTodo, 1);

    //     this.setState({ todos: todosCopy })
    // }


    // Way 2 => Method filter
    removeTodo(todoID) {

        let mainRemoveTodo = this.state.todos.filter(todo => {
            return todo.id !== todoID
        })

        // console.log(mainRemoveTodo);

        this.setState({ todos: mainRemoveTodo })
    }


    statusHandler(event) {
        // console.log('Change All Todos');
        // console.log(event.target.value);


        // Way 1
        // let valueSelectBox = event.target.value;

        // // console.log(valueSelectBox);

        // if (valueSelectBox === 'completed') {
        //     // console.log('Completed');

        //     this.setState({ status: 'completed' });
        // }
        // else if (valueSelectBox === 'uncompleted') {
        //     // console.log('Uncompleted');

        //     this.setState({ status: 'uncompleted' });
        // }
        // else if (valueSelectBox === 'all') {
        //     // console.log('all');

        //     this.setState({ status: 'all' });
        // }


        //  Way 2
        this.setState({ status: event.target.value })
    }

    render() {
        return (
            <>

                <Header />

                <form onSubmit={event => this.addTodo(event)}>

                    <input type="text" placeholder='Enter Title Todo' className="todo-input" maxLength="40" value={this.state.todoTitle} onChange={event => this.todoTitleHandler(event)} onKeyDown={event => this.keyDownInput(event)} />

                    <button className="todo-button" type="submit">
                        <i className="fas fa-plus-square"></i>
                    </button>

                    <div className="select">

                        <select name="todos" className="filter-todo" onChange={event => this.statusHandler(event)}>

                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>

                        </select>

                    </div>

                </form>

                <div className="todo-container">
                    <ul className="todo-list">

                        {
                            this.state.status === 'completed' && this.state.todos.filter(todo => todo.complted).map(todo =>
                                <Todo key={todo.id} {...todo} onCheck={this.editTodo.bind(this)} onRemove={this.removeTodo.bind(this)} />)
                        }

                        {
                            this.state.status === 'uncompleted' && this.state.todos.filter(todo => !todo.complted).map(todo => (
                                <Todo key={todo.id} {...todo} onCheck={this.editTodo.bind(this)} onRemove={this.removeTodo.bind(this)} />
                            ))
                        }

                        {
                            this.state.status === 'all' && this.state.todos.map(todo => (
                                <Todo key={todo.id} {...todo} onEdit={this.editTodo.bind(this)} onRemove={this.removeTodo.bind(this)} />
                            ))
                        }

                    </ul>
                </div>

            </>
        )
    }
}