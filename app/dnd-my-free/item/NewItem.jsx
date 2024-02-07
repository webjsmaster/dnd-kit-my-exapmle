import {useSortable} from '@dnd-kit/sortable';
import clsx from 'clsx';
import {CSS} from '@dnd-kit/utilities'
import Image from "next/image";
import iconField from '@/public/field.png';
import style from "@/app/dnd-my-free/container/Container.module.scss";
import iconArrow from "@/public/Arrow.svg";
import React, {useState} from "react";


const NewItem = ({id, title, children}) => {
    const [show, setShow] = useState(false)

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

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={{transition, transform: CSS.Translate.toString(transform)}}
            className={clsx('px-2 py-1', isDragging && 'opacity-50')}
        >
            <div className="flex items-center justify-start text-amber-500">
                {children ?
                    <div onClick={handleShow}>
                        <Image className={clsx(style.image, show ? style.imageActive : '')} src={iconArrow} alt='icon'/>
                    </div>
                    :
                    <div className='ml-4'></div>
                }
                <button className='ml-2' {...listeners}>
                    <Image src={iconField} alt='icon'/>
                </button>
                <div className='ml-2'>
                    {title}
                </div>
            </div>
            {show && children}
        </div>
    );
};

export default NewItem;
