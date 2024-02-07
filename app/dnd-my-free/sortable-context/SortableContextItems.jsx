import React, {useState} from 'react';
import {SortableContext} from "@dnd-kit/sortable";
import NewItem from "@/app/dnd-my-free/item/NewItem";

const SortableContextItems = ({items, ...rest}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }
    return (
        <SortableContext items={items.map((i) => i.id)}>
            <div className="flex items-start flex-col" {...rest}>
                {items.map((i) => {
                    if (i.items && i.items.length) {
                        return (
                            <div key={i.id}>
                                <NewItem title={i.title} id={i.id} key={i.id}>
                                    <SortableContextItems items={i.items} className='ml-5'/>
                                </NewItem>
                            </div>
                        )
                    } else {
                        return <NewItem title={i.title} id={i.id} key={i.id}/>
                    }
                })}
            </div>
        </SortableContext>
    );
};

export default SortableContextItems;
