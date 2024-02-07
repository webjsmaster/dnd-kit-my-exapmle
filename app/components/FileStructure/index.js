'use client'

import {useEffect, useRef, useState} from 'react'


import {moveNode, renameNodeInTreeByUniqueId, sortTree, transformRawJSONToAddUniqueIds,} from './helpers'
import {
    Arrow,
    ArrowFiller,
    ArrowFillerRealtime,
    CheckboxWrapper,
    Inner,
    Node,
    NodeName,
    NodeRow,
    TreeWrapper,
    Wrapper,
} from './styled'
import Checkbox from "@/app/components/checkbox/Checkbox";
import {data} from "@/utils/variable";
// import data from '@/utils/variable'


const FileStructure = ({showAlert}) => {
    const [tree, setTree] = useState([])
    const [expandedNodes, setExpandedNodes] = useState([])

    const handleExpandCollapse = (e) => {
        !expandedNodes.includes(+e.currentTarget.dataset.uniqueId)
            ? setExpandedNodes([...expandedNodes, +e.currentTarget.dataset.uniqueId])
            : setExpandedNodes(expandedNodes.filter((x) => x !== +e.currentTarget.dataset.uniqueId))
    }

    useEffect(() => {
        // get('/tree').then((res) => {
        //     if (!res) return
        //     const {results: tree} = res
        //     setTree(transformRawJSONToAddUniqueIds(tree))
        // })


        setTree(transformRawJSONToAddUniqueIds(JSON.parse(data)))
    }, [])

    const [renamingNowUniqueId, setRenamingNowUniqueId] = useState()
    const [renamingNowValue, setRenamingNowValue] = useState('')
    const treeWrapperRef = useRef(null)

    const handleStartRenameNode = (e) => {
        setRenamingNowUniqueId(+e.currentTarget.dataset.uniqueId)
        setRenamingNowValue(e.currentTarget.dataset.value)

        if (treeWrapperRef.current) {
            const input = treeWrapperRef.current.querySelector(`input[data-unique-id="${e.currentTarget.dataset.uniqueId}"]`)
            if (input) setTimeout(() => input.focus(), 100)
        }
    }

    const handleChangeNodeName = (e) => setRenamingNowValue(e.target.value)

    const catchControlKeysWhenEditNodeName = (e) => {
        if (e.key === 'Enter') {
            let newTree
            newTree = renameNodeInTreeByUniqueId(tree, +e.currentTarget.dataset.uniqueId, renamingNowValue)
            newTree = sortTree(newTree)

            setTree(newTree)
            // post('/tree/update', { newTree: JSON.stringify(newTree) })
            showAlert('Переименован элемент с uniqueId === ' + e.currentTarget.dataset.uniqueId)
        }

        if (e.key === 'Enter' || e.key === 'Escape') undoRenaming()
    }

    const undoRenaming = () => {
        setRenamingNowUniqueId(undefined)
        setRenamingNowValue('')
    }

    const [nowDraggingUniqueId, setNowDraggingUniqueId] = useState()
    const [nowDragOverUniqueId, setNowDragOverUniqueId] = useState()
    const [nowDragOverType, setNowDragOverType] = useState()

    const handleDragStartNodeRow = (e) => {
        setNowDraggingUniqueId(+e.currentTarget.dataset.uniqueId)
        setNowDragOverUniqueId(+e.currentTarget.dataset.uniqueId)
    }

    const handleDragEnterNodeRow = (e) => {
        if (nowDraggingUniqueId !== +e.currentTarget.dataset.uniqueId) {
            setNowDragOverUniqueId(+e.currentTarget.dataset.uniqueId)
            setNowDragOverType(e.currentTarget.dataset.type)
        } else {
            setNowDragOverUniqueId(nowDraggingUniqueId)
        }
    }

    const handleDragEndNodeRow = () => {
        if (nowDraggingUniqueId !== nowDragOverUniqueId && nowDragOverType === 'folder') {
            let newTree
            newTree = moveNode(tree, nowDraggingUniqueId, nowDragOverUniqueId)
            newTree = sortTree(newTree)
            setTree(newTree)

        }

        setNowDraggingUniqueId(undefined)
        setNowDragOverUniqueId(undefined)
        setNowDragOverType(undefined)
    }

    const buildTree = (tree, isRealtime) => {

        console.log('⭐: ', tree)

        const mappedNodes = tree.map((node) => {
            const isExpanded = expandedNodes.includes(node.uniqueId)
            const isFolderOrCamera = node.type === 'folder' || node.type === 'camera'
            const isEvent = node.type === 'events_group'
            const isInputDisabled = renamingNowUniqueId !== node.uniqueId


            return (
                <Node
                    key={node.uniqueId}
                    isExpanded={isExpanded}
                    hasVerticalLine={isFolderOrCamera}
                >
                    <NodeRow
                        data-unique-id={node.uniqueId}
                        data-type={node.type}
                        draggable={isFolderOrCamera}
                        isReadyToDrop={nowDragOverUniqueId === node.uniqueId && node.type === 'folder' && nowDragOverUniqueId !== node.parentUniqueId}
                        onDragStart={handleDragStartNodeRow}
                        onDragEnter={handleDragEnterNodeRow}
                        onDragEnd={handleDragEndNodeRow}
                    >
                        {isFolderOrCamera ? (
                            <Arrow
                                onClick={handleExpandCollapse}
                                data-unique-id={node.uniqueId}
                            >
                                {/*<IconWrapper>*/}
                                {/*    {getIcon(isExpanded ? 'arrow_opened' : 'arrow_closed')}*/}
                                {/*</IconWrapper>*/}
                            </Arrow>
                        ) : isEvent ? (
                            <CheckboxWrapper>
                                <Checkbox/>
                            </CheckboxWrapper>
                        ) : <ArrowFiller/>}

                        {/*<IconWrapper>*/}
                        {/*    {!isExpanded && node.type === 'folder' && getIcon('folder')}*/}
                        {/*    {isExpanded && node.type === 'folder' && getIcon('folder_opened')}*/}

                        {/*    {!isExpanded && node.type === 'camera' && getIcon('camera')}*/}
                        {/*    {isExpanded && node.type === 'camera' && getIcon('camera_enabled')}*/}

                        {/*    {node.type !== 'folder' && node.type !== 'camera' && getIcon(node.type)}*/}
                        {/*</IconWrapper>*/}

                        <NodeName
                            onDoubleClick={handleStartRenameNode}
                            data-unique-id={node.uniqueId}
                            data-value={node.name}
                            disabled={isInputDisabled}
                        >
                            <input
                                data-unique-id={node.uniqueId}
                                value={(renamingNowUniqueId === node.uniqueId ? renamingNowValue : node.name)}
                                onChange={handleChangeNodeName}
                                onKeyDown={catchControlKeysWhenEditNodeName}
                                onBlur={undoRenaming}
                                disabled={isInputDisabled}
                            />
                        </NodeName>
                    </NodeRow>

                    {node.contains ? buildTree(node.contains, !!node.realtime) : null}
                </Node>
            )
        })

        if (isRealtime) {
            mappedNodes.unshift(
                <Node key={Math.random()}>
                    <NodeRow hasHorizontalLine>
                        <ArrowFiller/>
                        {/*<IconWrapper>{getIcon('realtime')}</IconWrapper>*/}
                        <ArrowFillerRealtime/>
                        <span>Прямой эфир</span>
                    </NodeRow>
                </Node>
            )
        }

        return mappedNodes
    }


    return (
        <Wrapper>
            <Inner>
                <TreeWrapper ref={treeWrapperRef}>
                    {/*{tree.length*/}
                    {/*    ? buildTree(tree)*/}
                    {/*    : <NoData>Нет данных</NoData>*/}
                    {/*}*/}

                    {buildTree(tree)}
                </TreeWrapper>
            </Inner>
        </Wrapper>
    )
}

export default FileStructure
