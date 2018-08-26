import React from 'react';

const Todos = ({list}) => (
  <ul className="todos">
    <li>
      <h5>
        Do something <span className="complete" />
      </h5>
    </li>
    <li>
      <h5>
        Eat
        <span className="incomplete" />
      </h5>
    </li>
    <li>
      <h5>
        Sleep
        <span className="incomplete" />
      </h5>
    </li>
    <li>
      <h5>
        Repeat
        <span className="incomplete" />
      </h5>
    </li>
  </ul>
);

export default Todos;
