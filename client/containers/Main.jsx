import React from 'react';
import Facecards from './facecards/Facecards.jsx';
import Profile from './Profile.jsx';
import AdminPortal from './adminPortal/AdminPortal.jsx';
import Logo from './Logo.jsx';
import { Switch, Route } from 'react-router-dom';

const Main = (props) => {

  // create render functions so we can pass props down to routed components
  const renderLogo        = logo      => logoProps      => <Logo {...props} {...logoProps} />;
  const renderFacecards   = facecards => facecardsProps => <Facecards {...props} {...facecardsProps} />;
  const renderProfile     = profile   => profileProps   => <Profile {...props} {...profileProps} />;
  const renderAdminPortal = admin     => adminProps     => <AdminPortal {...props} {...adminProps} />;

  return (
    <main id="mainPanel">
      {/* Switch will find the first matching route and render that component to mainPanel */}
      <Switch>
        <Route exact path='/facecards' render={renderFacecards(Facecards)} />
        <Route path='/profile' render={renderProfile(Profile)} />
        <Route exact path='/adminPortal' render={renderAdminPortal(AdminPortal)} />
        <Route path='/' render={renderLogo(Logo)} />
      </Switch>
    </main>
  );

};

export default Main;
