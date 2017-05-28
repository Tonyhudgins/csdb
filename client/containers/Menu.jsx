import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => (
  <nav>
    <form>
      <input id="search" name="search" placeholder="search"></input>
    </form>
    <div id="menu">
      <section id="menuStudentProfiles">
        <h1>Student Profiles</h1>
        <ul>
          <li>Contact</li>
          <li><Link to="/profile">Progress</Link></li>
          <li>Projects</li>
          <li>Attendance</li>
          <li>Pre Course</li>
          <li>Post Course</li>
        </ul>
      </section>
      <section id="menuCohortDashboards">
        <h1>Cohort Dashboards</h1>
        <ul>
          <li><Link to="/facecards">Facecards</Link></li>
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
      <section id="menuAdmin">
        <h1>Admin</h1>
        <ul>
          <li><Link to="/newCohort">Cohort Creation</Link></li>
          <li>Financials</li>
          <li>Hiring Partners</li>
        </ul>
      </section>
    </div>
  </nav>
);

export default Menu;
