var React = require('react')
var BingoActions = require('./../../actions/BingoActions');
var Input = require('react-bootstrap/lib/Input')


var TitleForm = React.createClass({
  getInitialState: function() {
    return {
      title: this.props.title
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      title: this.props.title
    })
  },

  handleChange: function(event){
    BingoActions.updateBingoTitle(event.target.value);
  },

  validationState: function() {
    var length = this.state.title.replace(/ /g, '').length;
    
    if (length > 3) {return 'success'}
    else if (length > 2) {return 'warning'}
    else {return 'error'};
  },

  render: function(){
    return (
    	<Input 
        type='text' 
        bsSize='large' 
        placeholder='Bingo title...'
        bsStyle={this.validationState()}
        defaultValue={this.state.label}
        value={this.state.label} 
        onChange={this.handleChange} />
    )
  }
});

module.exports = TitleForm