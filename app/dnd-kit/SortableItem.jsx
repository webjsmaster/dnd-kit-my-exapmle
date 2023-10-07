'use client'
import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {

    const {attributes, listeners, setNodeRef, transform, transition} =
        useSortable({id: props.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className='m-3 p-4 w-full border-2 rounded-xl'>
                {props.id}
            </div>
        </div>
    );
}
