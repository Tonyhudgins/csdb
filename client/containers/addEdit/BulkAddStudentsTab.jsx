/**
 * ************************************
 *
 * @module  BulkAddStudentsTab
 * @author  smozingo
 * @date    6/27/17
 * @description
 *
 * ************************************
 */

import React, { Component } from 'react';
import CpcContainer from '../cpc/CpcContainer.jsx';
import CohortFileUpload from '../../components/CohortFileUpload.jsx';

const BulkAddStudentsTab = (props) => (
  <section>
    <CpcContainer/>
    <CohortFileUpload/>
  </section>
);

export default BulkAddStudentsTab;
