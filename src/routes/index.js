import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Movie from '../pages/Movie/Movie';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movie/:search" exact component={Movie} />
    </Switch>
  );
}
