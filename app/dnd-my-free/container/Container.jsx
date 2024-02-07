import React, {useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import style from './Container.module.scss';
import clsx from "clsx";
import Image from "next/image";
import iconWeb from '@/public/website.svg';
import iconMap from '@/public/map.svg';
import iconArrow from '@/public/Arrow.svg';

const Container = ({id, children, title, description, onAddItem}) => {
    const [show, setShow] = useState(false)
    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id,
        data: {
            type: 'container',
        },
    });

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Translate.toString(transform),
            }}
            className={clsx(
                'w-full h-full p-4 bg-gray-50 rounded-xl flex flex-col',
                isDragging && 'opacity-50',
            )}
        >
            <div className="flex items-center justify-start text-gray-800 mb-2">
                <div onClick={handleShow}>
                    <Image className={clsx(style.image, show ? style.imageActive : '')} src={iconArrow} alt='icon'/>
                </div>
                <button className='ml-2' {...listeners}>
                    <div className={style.iconContainer}>
                        <Image src={show ? iconMap : iconWeb} alt='icon'/>
                    </div>
                </button>
                <div className='ml-2'>
                    <h1 className="text-gray-800 text-xs">{title}</h1>
                </div>
            </div>
            {show && children}
        </div>
    );
};

export default Container;
