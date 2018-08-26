import React, {Component} from 'react';
import SkyLight from 'react-skylight';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import 'normalize.css';

import RedoList from './components/redoList';
import Todos from './components/Todos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedRedo: [],
      active: -1,
    };
    this.getSingleRedo = this.getSingleRedo.bind(this);
  }

  componentWillMount() {
    fetch('http://192.168.31.185:15000/checklists/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          savedRedo: data.value,
        }),
      )
      .catch(err => console.log('Error requests', err));
  }

  getSingleRedo(redoObj) {
    fetch('http://192.168.31.185:15000/checklists/' + redoObj.id)
      .then(res => res.json())
      .then(data => {
        const redoArr = [];
        let targeted = -1;
        for (let idx = 0; idx < this.state.savedRedo.length; idx++) {
          const element = this.state.savedRedo[idx];
          if (element.id === redoObj.id) {
            redoArr.push({
              ...element,
              tasks: data.value,
            });
            targeted = idx;
            console.log('Active change ', targeted);
          } else {
            redoArr.push({...element});
          }
        }
        this.setState({
          active: targeted,
          savedRedo: redoArr,
        });
        console.log('State: ', this.state);

        this.redoModal.show();
      });
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">Header</h1>

        <div className="sidebar">
          <ul>
            <RedoList
              redoArray={this.state.savedRedo}
              getRedo={this.getSingleRedo}
            />
          </ul>
          {this.state.active !== -1 ? (
            <SkyLight
              ref={ref => (this.redoModal = ref)}
              title={this.state.savedRedo[this.state.active].name}>
              <ListGroup>
                {this.state.savedRedo[this.state.active].tasks.map(x => (
                  <ListGroupItem
                    key={x.id}
                    header={x.name}
                    className="task-wrapper">
                    {x.description}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </SkyLight>
          ) : (
            ''
          )}
        </div>
        <Todos />
      </div>
    );
  }
}

export default App;
