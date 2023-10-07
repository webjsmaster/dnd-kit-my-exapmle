'use client'
import {closestCenter, DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {useState} from "react";
import {SortableItem} from "@/app/dnd-kit/SortableItem";


export default function DndKit() {

    const [languages, setLanguages] = useState(['JavaScript', 'Python', 'TypeScript', 'C#']);

    const handleDragEnd = ({active, over}) => {
        console.log('[11] 🍄:  ACTIVE: ', active.id);
        console.log('[14] 🌻: OVER: ', over.id);

        if (active.id !== over.id) {
            setLanguages((i) => {
                const activeIndex = i.indexOf(active.id);
                const overIndex = i.indexOf(over.id);
                return arrayMove(i, activeIndex, overIndex);
            })
        }
    }

    return (
        <DndContext id={'list'} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <div className='max-w-2xl mx-auto mt-4'>
                <h3 className='text-2xl font-bold text-center'>The best programming languages!</h3>
                <SortableContext items={languages} strategy={verticalListSortingStrategy}>
                    {languages.map(l => <SortableItem key={l} id={l}/>)}
                </SortableContext>
            </div>
        </DndContext>
    );

}
