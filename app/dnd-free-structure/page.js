'use client'

import React from 'react';
import {Container, FileStructureOuter, FileStructureWrapper, Label} from "@/app/dnd-free-structure/styled";
import FileStructure from "@/app/components/FileStructure";
import {toast, ToastContainer} from "react-toastify";


const DndFreeStructure = () => {
    const showAlert = (message) => toast.info(message)

    const resetTree = () => {

    }

    return (
        <Container>
            <br/><br/><br/>

            <button onClick={resetTree}>
                Reset tree to initial
            </button>

            <br/><br/><br/>

            <FileStructureOuter>
                <Label>Камеры</Label>

                <FileStructureWrapper>
                    <FileStructure showAlert={showAlert}/>
                </FileStructureWrapper>
            </FileStructureOuter>
            <ToastContainer/>
        </Container>
    );
};

export default DndFreeStructure;
