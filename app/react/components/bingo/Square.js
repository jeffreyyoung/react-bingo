var React = require('react')
var BingoActions = require('./../../actions/BingoActions');

var Square = React.createClass({
  getInitialState: function() {
    return {
      active: this.props.squareData.active,
      label: this.props.squareData.label
    }
  },

  componentWillReceiveProps: function(props){
    this.setState({
      active: props.squareData.active,
      label: props.squareData.label
    });
  },

  toggleActive: function(){
    var active = !this.state.active;
    BingoActions.setSquareActive(this.props.index, active);
  },

  render: function(){
    var classes = 'square'
    if (this.state.active)
      classes += ' active'

    return (
      <div className={classes} onClick={this.toggleActive}>
        <span>{this.state.label}</span>
      </div>
    )
  }
});

module.exports = Square