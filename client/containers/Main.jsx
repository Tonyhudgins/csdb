import React from 'react';
import Facecards from './facecards/Facecards.jsx';
import Profile from './Profile.jsx';
import NewCohort from './addEdit/AddEditTabs.jsx';
import { Switch, Route } from 'react-router-dom';

const Main = (props) => {

  // create render functions so we can pass props down to routed components
  const renderFacecards = facecards => facecardsProps => <Facecards {...props} {...facecardsProps} />;
  const renderProfile   = profile   => profileProps   => <Profile {...props} {...profileProps} />;
  const renderNewCohort = cohort    => cohortProps    => <NewCohort {...props} {...cohortProps} />;

  return (
    <main id="mainPanel">
      {/* Switch will find the first matching route and render that component to mainPanel */}
      <Switch>
        <Route exact path='/facecards' render={renderFacecards(Facecards)} />
        <Route path='/profile' render={renderProfile(Profile)} />
        <Route exact path='/newCohort' render={renderNewCohort(NewCohort)} />
      </Switch>
    </main>
  );

};

export default Main;
