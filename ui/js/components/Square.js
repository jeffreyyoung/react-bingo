var React = require('react')

var Square = React.createClass({
  getInitialState: function() {
    return {
      active: false,
      label: this.props.label
    }
  },

  toggleActive: function(){
    console.log(this.state);
    this.setState({
      label: this.state.label,
      active: !this.state.active
    })
  },

  render: function(){
    var classes = ''
    if (this.state.active)
      classes= 'active'

    return (
      <div className={classes} onClick={this.toggleActive}>
        <span>{this.state.label}</span>
        <span>{this.state.active}</span>
      </div>
    )
  }
});

module.exports = Square