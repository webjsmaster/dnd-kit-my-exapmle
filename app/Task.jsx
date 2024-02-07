import React from 'react';
import Draggable from 'react-draggable';
const Task = ({task}) => {

    console.log('[5] 🐬: ', task)
    return (
        <Draggable            axis="y"            scale={1}        >
            <div className='h-fill border-2 p-2 my-2 max-w-2xl w-full cursor-pointer'>
                {task.task}
            </div>
        </Draggable>
    );
};

export default Task;
