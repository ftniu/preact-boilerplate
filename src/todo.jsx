import { render, Component } from 'preact';
import { signal, computed } from "@preact/signals";

class TodoList extends Component {
	state = { todos: 
        signal([
            { text: "Write my first post", completed: true },
            { text: "Buy new groceries", completed: false },
            { text: "Walk the dog", completed: false },
          ]), text:  signal("") };


	setText = e => {
        this.state.text.value = e.target.value;
		//this.setState({ text: e.target.value });
	};
	addTodo = () => {
		let { todos, text } = this.state;
		todos.value = [...todos.value, { text: text.value, completed: false }];
        text.value = "";
		// this.setState({ todos, text: '' });
	};
	render({}, { todos, text }) {
		return (
			<form onSubmit={this.addTodo} action="javascript:">
				<input value={text.value} onInput={this.setText} style={{
                    border: '1px solid #ccc',
                }} />
				<button type="submit">Add</button>
				<ul>
					{todos.value.map(todo => (
						<li>{todo.text}</li>
					))}
				</ul>
			</form>
		);
	}
}

export default TodoList;
