import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import BMIApp from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<BMIApp />);