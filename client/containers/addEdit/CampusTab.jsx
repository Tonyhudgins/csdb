import React from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  tabs1: store.addEditState.tabs1,
  tabs2: store.addEditState.tabs2,
});

const mapDispatchToProps = dispatch => ({
  /*changeSelectedTab: (selectedTab, tabNamespace) => { dispatch(changeSelectedTab(selectedTab, tabNamespace)); },*/
});

const campusTab = (props) => (
  <form className="form-horizontal">
    <fieldset>
      <legend>Add/Edit Campus</legend>
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="selectbasic">Select Campus</label>
        <div className="col-md-4">
          <select id="selectbasic" name="selectbasic" className="form-control">
            <option value="LA">Los Angeles</option>
            <option value="NY">New York</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="col-md-12">
          <div className="input-group">
            <span className="input-group-addon">Name</span>
            <input id="campusName" name="campusName" className="form-control" placeholder="Codesmith LA" type="text"/>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col-md-12">
          <div className="input-group">
            <span className="input-group-addon">Address 1</span>
            <input id="address1" name="address1" className="form-control" placeholder="123 Tech Ave" type="text"/>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col-md-12">
          <div className="input-group">
            <span className="input-group-addon">Address 2</span>
            <input id="address2" name="address2" className="form-control" placeholder="Suite 1A" type="text"/>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-addon">City</span>
            <input id="city" name="city" className="form-control" placeholder="Los Angeles" type="text"/>
          </div>
        </div>
        <div className="col-md-2">
          <select id="state" name="state" className="form-control">
            <option value="AK">AK</option>
            <option value="AL">AL</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA" className="selected">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-addon">Zip Code</span>
            <input id="zipCode" name="zipCode" className="form-control" placeholder="90066" type="text"/>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </fieldset>
  </form>
);

export default connect(mapStateToProps, mapDispatchToProps)(campusTab);
