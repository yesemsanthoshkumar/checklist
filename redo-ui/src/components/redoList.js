import React from "react";
import { Panel } from "react-bootstrap";

const RedoList = ({redoArray, getRedo})=>{
	return redoArray.map(x=>(
		<li
		key={x.id}
		className="redo-wrapper"
		onClick={()=>getRedo(x)}
		>
		<Panel.Title>{x.name}</Panel.Title>
		</li>
	));
};

export default RedoList;