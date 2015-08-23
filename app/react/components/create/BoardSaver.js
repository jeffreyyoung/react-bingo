var React = require('react')
var Alert = require('react-bootstrap/lib/Alert')
var BingoActions = require('./../../actions/BingoActions')
var _ = require('lodash')
var clone = require('clone')
var BingoClient = require('./../../utils/BingoAPI');
var rp = require('axios');
var moment = require('moment');
var Time = require('./../layout/RelativeTime');
var Panel = require('react-bootstrap/lib/Panel');

var BoardSaver = React.createClass({
  getInitialState: function() {
    //BingoActions.save({});
    this.activePromise = false;
    return {
      canSave: this.props.validation.valid,
      message: this.props.validation.message,
      title: this.props.title,
      squares: this.props.squares,
      id: "",
      lastSaved: null,
      activePromise: false,
      successfulSave: false,
      url: ""
    }
  },

  getBingoURL: function(title, id) {
    var slug = title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
    var uri = window.location.origin + '/' + id + '/' + slug;
    return uri;
  },

  setSaveStatus: function(id, lastSaved, activePromise, successSave, url) {
    this.setState({
      canSave: this.state.canSave,
      message: this.state.message,
      title: this.state.title,
      squares: this.state.squares,
      id: id,
      lastSaved: lastSaved,
      activePromise: activePromise,
      successfulSave: successSave,
      url: url
    })
  },

  save: function(props) {
    if (!this.state.activePromise)
    {
      this.setSaveStatus(this.state.id, this.state.lastSaved, true, 2, this.state.url);
      var that = this;
      if (that.state.id.length > 0) {
        rp.put('/api/bingo/'+that.state.id, {title: that.state.title, squares: that.state.squares})
          .then(function(res){
            that.setSaveStatus(res.data._id, moment(), false, 1, that.getBingoURL(res.data.title, res.data._id));
          })
          .catch(function(data){
            that.setSaveStatus(that.state.id, that.state.lastSaved, false, 0, that.state.url);
          })
      }
      else
      {
        rp.post('/api/bingo', {title: this.state.title, squares: this.state.squares})
          .then(function(res){
            that.setSaveStatus(res.data._id, moment(), false, 1, that.getBingoURL(res.data.title, res.data._id));
          })
          .catch(function(data){
            that.setSaveStatus(this.state.id, that.state.lastSaved, false, 0, that.state.url);
          })
      }
    }
  },

  componentWillMount: function() {
    this.debouncedSave = _.debounce(this.save, 500);
  },

  componentWillReceiveProps: function(props) {
    if (!this.state.activePromise 
      && this.state.canSave 
      && (this.state.title != props.title || _.isEqual(this.state.squares,props.squares)))
    {
      this.debouncedSave(clone(props));
    }

    this.setState({
      canSave: props.validation.valid,
      message: props.validation.message,
      title: props.title,
      squares: props.squares,
      saveStatus: this.state.saveStatus,
      id: this.state.id,
      lastSaved: this.state.lastSaved
    });
  },

  render: function(){
    var alertType = '';
    var message = '';
    var showLastSaved = false;

    if (!this.state.canSave){
      alertType = 'warning'
      message = this.state.message
    }
    else if (this.state.successfulSave == 0){
      alertType = 'danger'
      message = 'Unssucessful save...'
      showLastSaved = true; 
      if (this.state.lastSaved)
        message += ' Last saved '
    }
    else if (this.state.successfulSave == 1) {
      alertType = 'success'
      showLastSaved = true;
      message = 'Saved '
    }
    else if (this.state.successfulSave == 2) {
      alertType = 'info'
      message = 'Saving'
    }
    var timeComponent = '';

    if (this.state.lastSaved && showLastSaved) {
      timeComponent = (
        <Time date={this.state.lastSaved}/>
      )
    }

    var urlPanel = '';

    if (this.state.id.length > 0)
    {

      urlPanel = (
        <Panel header='Your new bingo url' bsStyle='primary'>
          <a href={this.state.url}>{this.state.url}</a>
        </Panel>
      )
    }

    return (
      <div>
        {urlPanel}
        <Alert bsStyle={alertType}>
          <p>{message} {timeComponent}</p>
        </Alert>
      </div>
    )
  }
});

module.exports = BoardSaver