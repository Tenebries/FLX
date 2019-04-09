import React from 'react';
import {render} from 'react-dom';
import {Player} from './components/playerComponent';
import './scss/index.scss';

const rootNode = document.querySelector('#root');

function App() {
  return (
    <Player/>
  );
}

render(
  <App/>,
  rootNode,
);
