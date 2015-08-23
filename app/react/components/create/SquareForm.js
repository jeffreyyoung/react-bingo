var React = require('react')
var BingoActions = require('./../../actions/BingoActions');
var Input = require('react-bootstrap/lib/Input');

var SquareForm = React.createClass({
  getInitialState: function() {
    return {
      label: this.props.squareData.label,
      index: this.props.index
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      label: this.props.squareData.label,
      index: this.props.index
    })
  },

  validationState: function() {
    var length = this.state.label.replace(/ /g, '').length;
    
    if (length > 3) {return 'success'}
    else if (length > 2) {return 'warning'}
    else {return 'error'};
  },

  handleChange: function(event){
    BingoActions.updateSquareLabel(this.state.index, event.target.value);
  },

  render: function(){
    return (
      <Input 
        type='textarea' 
        value={this.state.label}
        bsStyle={this.validationState()}
        placeholder='Enter bingo tile text here...'
        onChange={this.handleChange} />
    )
  }
});

module.exports = SquareForm