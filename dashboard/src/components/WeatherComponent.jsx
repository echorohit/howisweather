import React from 'react';
import NavComponent from './includes/NavComponent';

const ConfRow = function(i, row) {
  return(
      <tr key={'conf'+i}>
          <td>{i}</td>
          <td>{row.country}</td>
          <td>{row.city}</td>
          <td>{row.temp_c}</td>
          <td>{row.temp_f}</td>
          <td>{row.humidity}</td>
      </tr>
  );
}

export default class WeatherComponent extends React.Component {
    constructor(props) {
      super(props);
    }
    renderList(rows) {
      let list = [];
      for(let i = 0; i < rows.length; i++) {
        list.push(ConfRow(i, rows[i]));
      }
      return list;
    }

    render(){
        return(
          <div className="container-fluid">
            <div className="row">
                <NavComponent/>
                <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
                  <h2>Weather </h2>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead> 
                        <tr>
                          <th>#</th>
                          <th>Country</th>
                          <th>City</th>
                          <th>Temperature(C)</th>
                          <th>Temperature(F)</th>
                          <th>Humidity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderList(this.props.weather)}
                      </tbody>
                    </table>
                  </div>
                </main>
            </div>
          </div>
        );
    }
} 
