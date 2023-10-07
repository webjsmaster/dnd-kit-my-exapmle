'use client'
import React, {useState} from 'react';
import {closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import Container from "@/app/dnd-container/container/Container";
import Items from "@/app/dnd-container/item/Items";
import {uuidv4} from "@/utils/uuid";
import Modal from "@/app/dnd-container/modal/Modal";
import Input from "@/app/dnd-container/input/Input";

const DndContainer = () => {

    const [containers, setContainers] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [currentContainerId, setCurrentContainerId] = useState();
    const [containerName, setContainerName] = useState('');
    const [itemName, setItemName] = useState('');
    const [showAddContainerModal, setShowAddContainerModal] = useState(false);
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    const onAddContainer = () => {
        if (!containerName) return;
        const id = `container-${uuidv4()}`;
        setContainers([
            ...containers,
            {
                id,
                title: containerName,
                items: [],
            },
        ]);
        setContainerName('');
        setShowAddContainerModal(false);
    };

    const onAddItem = () => {
        if (!itemName) return;
        const id = `item-${uuidv4()}`;
        const container = containers.find((item) => item.id === currentContainerId);
        if (!container) return;
        container.items.push({
            id,
            title: itemName,
        });
        setContainers([...containers]);
        setItemName('');
        setShowAddItemModal(false);
    };

    // DND Handlers
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    function findValueOfItems(id, type) {
        if (type === 'container') {
            return containers.find((item) => item.id === id);
        }
        if (type === 'item') {
            return containers.find((container) =>
                container.items.find((item) => item.id === id),
            );
        }
    }

    const findItemTitle = (id) => {
        const container = findValueOfItems(id, 'item');
        if (!container) return '';
        const item = container.items.find((item) => item.id === id);
        if (!item) return '';
        return item.title;
    };

    const findContainerTitle = (id) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return '';
        return container.title;
    };

    const findContainerItems = (id) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return [];
        return container.items;
    };

    const handleDragStart = (event) => {
        const {active} = event;
        const {id} = active;
        setActiveId(id);
    }

    // This is the function that handles the sorting of the containers and items when the user is done dragging.
    function handleDragEnd(event) {
        const {active, over} = event;

        // Handling container Sorting
        if (
            active.id.toString().includes('container') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === active.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === over.id,
            );
            // Swap the active and over container
            let newItems = [...containers];
            newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
            setContainers(newItems);
        }

        // Handling item Sorting
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

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
        // Handling item dropping into container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
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

            let newItems = [...containers];
            const [removedItem] = newItems[activeContainerIndex].items.splice(
                activeItemIndex,
                1,
            );
            newItems[overContainerIndex].items.push(removedItem);
            setContainers(newItems);
        }
        setActiveId(null);
    }

    const handleDragMove = (event) => {
        const {active, over} = event;

        // Handle Items Sorting
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active container and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

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

        // Handling Item Drop Into a Container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
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


    return (
        <div className='max-w-2xl mx-auto mt-4 font-Montserrat'>
            <Modal
                showModal={showAddContainerModal}
                setShowModal={setShowAddContainerModal}
            >
                <div className="flex flex-col w-full items-start gap-y-4">
                    <h1 className="text-gray-800 text-3xl font-bold">Add Container</h1>
                    <Input
                        type="text"
                        placeholder="Container Title"
                        name="containername"
                        value={containerName}
                        onChange={(e) => setContainerName(e.target.value)}
                    />
                    <button onClick={onAddContainer}>Add container</button>
                </div>
            </Modal>
            {/* Add Item Modal */}
            <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
                <div className="flex flex-col w-full items-start gap-y-4">
                    <h1 className="text-gray-800 text-3xl font-bold">Add Item</h1>
                    <Input
                        type="text"
                        placeholder="Item Title"
                        name="itemname"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <button onClick={onAddItem}>Add Item</button>
                </div>
            </Modal>
            <div className="flex items-center justify-between gap-y-2">
                <h1 className="text-gray-800 text-3xl font-bold">Dnd-kit Guide</h1>
                <button onClick={() => setShowAddContainerModal(true)} className='border-2 p-2 rounded-xl'>
                    Add Container
                </button>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-3 gap-6">
                    <DndContext
                        id={'cont-1'}
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragMove={handleDragMove}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={containers.map((i) => i.id)}>
                            {containers.map((container) => (
                                <Container
                                    id={container.id}
                                    title={container.title}
                                    key={container.id}
                                    onAddItem={() => {
                                        setShowAddItemModal(true);
                                        setCurrentContainerId(container.id);
                                    }}
                                >
                                    <SortableContext items={container.items.map((i) => i.id)}>
                                        <div className="flex items-start flex-col gap-y-2">
                                            {container.items.map((i) => (
                                                <Items title={i.title} id={i.id} key={i.id}/>
                                            ))}
                                        </div>
                                    </SortableContext>
                                </Container>
                            ))}
                        </SortableContext>
                        <DragOverlay adjustScale={false}>
                            {/* Drag Overlay For item Item */}
                            {activeId && activeId.toString().includes('item') && (
                                <Items id={activeId} title={findItemTitle(activeId)}/>
                            )}
                            {/* Drag Overlay For Container */}
                            {activeId && activeId.toString().includes('container') && (
                                <Container id={activeId} title={findContainerTitle(activeId)}>
                                    {findContainerItems(activeId).map((i) => (
                                        <Items key={i.id} title={i.title} id={i.id}/>
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

export default DndContainer;
