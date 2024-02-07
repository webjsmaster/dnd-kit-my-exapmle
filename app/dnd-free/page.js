'use client'
import {forwardRef, useState} from 'react';
import {SimpleTreeItemWrapper, SortableTree} from "dnd-kit-sortable-tree";

const MinimalViable = () => {
    const [items, setItems] = useState(initialViableMinimalData);
    return (
        <div className='font-Montserrat'>
            <SortableTree
                items={items}
                onItemsChanged={setItems}
                TreeItemComponent={MinimalTreeItemComponent}
            />
        </div>
    );
};

/*
 * Here's the component that will render a single row of your tree
 */
// eslint-disable-next-line react/display-name
const MinimalTreeItemComponent = forwardRef((props, ref) => (
    /* you could also use FolderTreeItemWrapper if you want to show vertical lines.  */
    <SimpleTreeItemWrapper {...props} ref={ref} className='m-2'>
        <div className='text-amber-500'>{props.item.value}</div>
    </SimpleTreeItemWrapper>
));

/*
 * Configure the tree data.
 */
const initialViableMinimalData = [
    {
        id: '1',
        value: 'Jane',
        children: [
            {id: '4', value: 'John'},
            {id: '5', value: 'Sally'},
        ],
    },
    {id: '2', value: 'Fred', children: [{id: '6', value: 'Eugene'}]},
    {id: '3', value: 'Helen', canHaveChildren: false},
];

export default MinimalViable;
