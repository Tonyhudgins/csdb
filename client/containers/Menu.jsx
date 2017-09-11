import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => (
  <nav>
    <form>
      <input id="search" name="search" placeholder="search" />
    </form>
    <div id="menu">
      <section id="menuAdmin">
        <h1>Admin</h1>
        <ul>
          <li><strong><Link to="/adminPortal">CS Admin Portal</Link></strong></li>
          <li>Financials</li>
          <li>Hiring Partners</li>
        </ul>
      </section>
      <section id="menuStudentProfiles">
        <h1>Student Profiles</h1>
        <ul>
          <li>Contact</li>
          <li><strong><Link to="/profile">Progress</Link></strong></li>
          <li>Projects</li>
          <li>Attendance</li>
          <li>Pre Course</li>
          <li>Post Course</li>
        </ul>
      </section>
      <section id="menuCohortDashboards">
        <h1>Cohort Dashboards</h1>
        <ul>
          <li><strong><Link to="/facecards">Facecards</Link></strong></li>
          <li>Schedule</li>
          <li>Hack Hours</li>
          <li>Resources</li>
        </ul>
      </section>
      <section id="menuReports">
        <h1>Reports</h1>
        <ul>
          <li>Campus Reports</li>
          <li>Program Reports</li>
          <li>Cohort Reports</li>
          <li>Student Reports</li>
        </ul>
      </section>
      <section id="menuAlumni">
        <h1>Alumni</h1>
        <ul>
          <li>Alumni Contacts</li>
          <li>Interview Questions</li>
        </ul>
      </section>
    </div>
  </nav>
);

export default Menu;
