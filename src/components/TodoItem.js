import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleComplete, deleteTodo } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {

	const dispatch = useDispatch()
	const handleOnChange = () => {
		dispatch(toggleComplete({ id }))
	}
	const handleDelete = () => {
		dispatch(deleteTodo({ id }))
	}

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input onChange={handleOnChange} readOnly type='checkbox' className='mr-3' checked={completed}></input>
					{title}
				</span>
				<button onClick={handleDelete} className='btn btn-danger'>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
