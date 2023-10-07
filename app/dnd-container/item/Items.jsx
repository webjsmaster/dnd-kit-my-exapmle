import {useSortable} from '@dnd-kit/sortable';
import React from 'react';
import clsx from 'clsx';
import {CSS} from '@dnd-kit/utilities'


const Items = ({id, title}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id,
        data: {
            type: 'item',
        },
    });
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}
            className={clsx(
                'px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer',
                isDragging && 'opacity-50',
            )}
        >
            <div className="flex items-center justify-between text-amber-500">
                {title}
                {/*<button*/}
                {/*    className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl"*/}
                {/*    */}
                {/*>*/}
                {/*    Drag Handle*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default Items;
