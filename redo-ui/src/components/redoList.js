import React from "react";

const RedoList = ({redoArray, getRedo})=>{
	return redoArray.map(x=>(
		<div
		className="sidebar-element"
		key={x.id}
		onClick={()=>getRedo(x)}
		>
		{x.name}
		</div>
	));
};

export default RedoList;