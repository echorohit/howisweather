import React from 'react';
import NavComponent from './includes/NavComponent';

const ConfRow = function(i, row) {
  return(
      <tr key={'conf'+i}>
          <td>{i}</td>
          <td>{row.country}</td>
          <td>{row.polling_frequency}</td>
          <td>EDIT</td>
          <td>DELETE</td>
      </tr>
  );
}

export default class ConfigurationComponent extends React.Component {
    
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
                  <h2>Configuration </h2>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead> 
                        <tr>
                          <th>#</th>
                          <th>Country</th>
                          <th>Polling frequency</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderList(this.props.configuration)}
                      </tbody>
                    </table>
                  </div>
              </main>
            </div>
          </div>
        );
    }
} 
