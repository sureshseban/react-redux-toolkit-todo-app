import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {

	const todos = useSelector((state) => state.todos)
	const completedItemsLength = todos.filter(todo => todo.completed).length;

	return <h4 className='mt-3'>Total Completed Items: {completedItemsLength}</h4>;
};

export default TotalCompleteItems;
