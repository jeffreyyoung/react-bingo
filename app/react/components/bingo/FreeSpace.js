var React = require('react')
var FreeSpace = React.createClass({

  render: function(){
    var classes = 'square free-space'
    return (
      <div className={classes}>
        <span>Free Space</span>
      </div>
    )
  }
  
});

module.exports = FreeSpace