var React = require('react')
var BingoActions = require('./../../actions/BingoActions');
var Input = require('react-bootstrap/lib/Input');
var moment = require('moment');
var SetIntervalMixin = require('./SetIntervalMixin');

var Time = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return {
      time: this.props.date.fromNow()
    }
  },

  componentDidMount: function() {
    var that = this;
    this.setInterval(function(){
      console.log('updating time!!!', that.props.date.fromNow());
      that.setState({
        time: that.props.date.fromNow()
      })
    }, 1000);
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      time: props.date.fromNow()
    })
  },

  render: function(){
    return (
      <span>{this.state.time}</span>
    )
  }
});

module.exports = Time