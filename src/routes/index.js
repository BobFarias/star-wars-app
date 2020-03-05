import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Movie from '../pages/Movie/Movie';

export default function Routes() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/movie/:search" exact component={Movie} />
      <Redirect to="/home" />
    </Switch>
  );
}
