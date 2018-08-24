import React from "react";
import { Panel } from "react-bootstrap";

const RedoList = ({redoArray, getRedo, active})=>{
    return redoArray.map(x=>(
        <Panel
            key={x.id}
            className="redo-wrapper"
            onClick={()=>getRedo(x.id)}
            defaultExpanded={active}>
            <Panel.Title>{x.name}</Panel.Title>
            <Panel.Body className="tasks">
                {
                    x.tasks?x.tasks.map(x=><div key={x.id}><p>{x.name}</p></div>): []
                }
            </Panel.Body>
        </Panel>
    ));
};

export default RedoList;