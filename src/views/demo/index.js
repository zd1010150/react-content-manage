import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import { observe } from './game';


observe(knightPosition =>
    ReactDOM.render(<Board knightPosition={knightPosition}/>, document.getElementById('root'))
)