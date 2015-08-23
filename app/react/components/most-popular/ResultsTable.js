var React = require('react')
var Table = require('react-bootstrap/lib/Table')
var moment = require('moment');

var ResultsTable = React.createClass({
  getInitialState: function() {
    return {
      results: this.props.results || [],
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      results: props.results,
    })
  },

  getBingoURL: function(title, id) {

    var slug;
    if(title){
      slug = title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
    } else {
      slug = 'slug'
    }
    
    var uri = window.location.origin + '/' + id + '/' + slug;
    return uri;
  },

  render: function(){
    var self = this;
    if (this.state.results.length == 0 ){
      return (<span />)
    }
    else {
      var results = this.state.results.map(function(result, i){
        return (
          <tr>
            <td>{i + 1}</td>
            <td><a href={self.getBingoURL(result.title || result.name, result._id)}>{result.title || result.name}</a></td>
            <td>{moment(result.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
          </tr>
        )
      })
      return (
        <Table striped bordered condensed hover>
          <thead>
            <th>#</th><th>Title</th><th>Created</th>
          </thead>
          <tbody>
            {results}
          </tbody>
        </Table>
      )
    }
  }
});

module.exports = ResultsTable