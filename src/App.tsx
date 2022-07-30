import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import { Header } from './components';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <React.Suspense fallback={<div>loading...</div>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <React.Suspense fallback={<div>loading...</div>}>
                <FullPizza />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
