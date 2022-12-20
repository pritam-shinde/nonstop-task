import {Fragment} from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import './index.css';

render(<Fragment><BrowserRouter><App/></BrowserRouter></Fragment>, document.getElementById('root'), ()=>console.log("😀"))
