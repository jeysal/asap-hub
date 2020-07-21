import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './login/Login';

const App: React.FC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route render={() => 'This route does not exist'} />
    </Switch>
  </BrowserRouter>
);

export default App;