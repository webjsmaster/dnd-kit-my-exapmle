'use client'
import React, {useState} from 'react';
import {closestCorners, DndContext, DragOverlay} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {uuidv4} from "@/utils/uuid";
import Container from "@/app/dnd-my-free/container/Container";
import SortableContextItems from "@/app/dnd-my-free/sortable-context/SortableContextItems";
import NewItem from "@/app/dnd-my-free/item/NewItem";

const DndMyFree = () => {
    const [activeId, setActiveId] = useState(null);
    const [containers, setContainers] = useState([
        {
            id: `container-${uuidv4()}`,
            title: 'Container - 1',
            items: [
                {
                    id: `items-${uuidv4()}`,
                    title: 'Item - 1-1'
                },
                {
                    id: `items-${uuidv4()}`,
                    title: 'Item - 1-2'
                },
            ]
        },
        {
            id: `container-${uuidv4()}`,
            title: 'Container - 2',
            items: [
                {
                    id: `items-${uuidv4()}`,
                    title: 'Item - 2-1',
                    items: [
                        {
                            id: `items-${uuidv4()}`,
                            title: 'Item - 2-1-1',
                            items: [
                                {
                                    id: `items-${uuidv4()}`,
                                    title: 'Item - 2-1-1-1',
                                }
                            ]
                        },
                        {
                            id: `items-${uuidv4()}`,
                            title: 'Item - 2-1-2',
                        },
                    ]
                },
                {
                    id: `items-${uuidv4()}`,
                    title: 'Item - 2-2'
                },
            ]
        },
    ]);

    const findItem = (items, id) => {
        return items.find(item => {
            if (item.items && item.items.length && item.id !== id) {
                console.log('[63] 🌻: ITEM ', item.id, id)
                findItem(item.items, id)
            } else {
                return item.id === id
            }
        })
    }

    const findValueOfItems = (id, type) => {
        if (type === 'container') {
            return containers.find((item) => item.id === id);
        }
        if (type === 'item') {
            console.log('********')
            return containers.find((container) =>
                container.items.find((item) => item.id === id),
            );
        }

        // if (type === 'item') {
        //     return containers.find((container) =>
        //         console.log('[78] 🎯: ', findItem(container.items, id))
        //     )
        // }
    }

    const handleDragStart = (event) => {
        const {active} = event;
        const {id} = active;
        setActiveId(id);
    }


    const handleDragEnd = (event) => {
        const {active, over} = event;
        console.log('[75] 🚧: ', active, over)
        if (active.id.toString().includes('item') && over?.id.toString().includes('item') && active && over && active.id !== over.id) {
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

            console.log('[129] 🥕: ITEM', activeContainer, overContainer)

            if (!activeContainer || !overContainer) return;

            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );

            // Find the index of the active and over item
            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );
            const overItemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id,
            );
            // In the same container
            if (activeContainerIndex === overContainerIndex) {
                let newItems = [...containers];
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeItemIndex,
                    overItemIndex,
                );

                setContainers(newItems);
            } else {
                // In different containers
                let newItems = [...containers];
                const [removedItem] = newItems[activeContainerIndex].items.splice(
                    activeItemIndex,
                    1,
                );
                newItems[overContainerIndex].items.splice(
                    overItemIndex,
                    0,
                    removedItem,
                );
                setContainers(newItems);
            }
        }

        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            console.log('[180] 🚧: CONTAINER ')
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'container');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;

            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );

            // Find the index of the active and over item
            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );

            // Remove the active item from the active container and add it to the over container
            let newItems = [...containers];
            const [removedItem] = newItems[activeContainerIndex].items.splice(
                activeItemIndex,
                1,
            );
            newItems[overContainerIndex].items.push(removedItem);
            setContainers(newItems);
        }
    }

    const findItemTitle = (id) => {
        const container = findValueOfItems(id, 'item');
        if (!container) return '';
        const item = container.items.find((item) => item.id === id);
        if (!item) return '';
        return item.title;
    };

    const findContainerItems = (id) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return [];
        return container.items;
    };

    const findContainerTitle = (id) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return '';
        return container.title;
    };


    return (
        <div className='max-w-2xl mx-auto mt-4 font-Montserrat'>
            <div className="mt-10">
                <div className="flex flex-col gap-y-2">
                    <DndContext
                        id={'cont-1'}
                        // sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}

                    >
                        <SortableContext items={containers.map((i) => i.id)}>
                            {containers.map((container) => (
                                <Container
                                    id={container.id}
                                    title={container.title}
                                    key={container.id}
                                >
                                    {/*<SortableContext items={container.items.map((i) => i.id)}>*/}
                                    {/*    <div className="flex items-start flex-col gap-y-2">*/}
                                    {/*        {container.items.map((i) => (*/}
                                    {/*            <Item title={i.title} id={i.id} key={i.id}/>*/}
                                    {/*        ))}*/}
                                    {/*    </div>*/}
                                    {/*</SortableContext>*/}
                                    <SortableContextItems items={container.items}/>
                                </Container>
                            ))}
                        </SortableContext>
                        <DragOverlay adjustScale={false}>
                            {/* Drag Overlay For item Item */}
                            {activeId && activeId.toString().includes('item') && (
                                <NewItem id={activeId} title={findItemTitle(activeId)}/>
                            )}
                            {/* Drag Overlay For Container */}
                            {activeId && activeId.toString().includes('container') && (
                                <Container id={activeId} title={findContainerTitle(activeId)}>
                                    {findContainerItems(activeId).map((i) => (
                                        <NewItem key={i.id} title={i.title} id={i.id}/>
                                    ))}
                                </Container>
                            )}
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>
        </div>
    );
};

export default DndMyFree;
