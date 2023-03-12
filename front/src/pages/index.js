import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../components/App/App';

import { Gatsby, Link } from 'gatsby';

const IndexPage = () => (
  <Gatsby>
  <header>
    <Link to="/">Home</Link>
  </header>
  <main>
    <App />
  </main>
  </Gatsby>
)

export default IndexPage