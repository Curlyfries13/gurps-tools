import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './common/Header';
import AboutPage from './about/About';
import CalcForm from './calc/CalcForm';
import HomePage from './home/Home';

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/calc' component={CalcForm} />
          <Route path='/about' component={AboutPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
