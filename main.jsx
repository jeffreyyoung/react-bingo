var bingoData = ['Apples', 'Oranges', 'Cactus', 'Green'];

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

var BingoBoard = React.createClass({
  getInitialState: function() {
    return {
      squares: this.props.squares
    }
  },

  render: function(){
    var squareNodes = this.state.squares.map(function(square){
      return (
        <Square label={square}/>
      )
    });
    return (
      <div>
        {squareNodes}
      </div>
    )
  }
});   




var Counter = React.createClass({
  getInitialState: function(){
    return {
      count: 5
    }
  },

  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },

  render: function(){
    return (
      <h1 onClick={this.incrementCount}>{this.state.count}</h1>
    )
  }
})

var HelloWorld = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <Counter/>
      </div>
    );
  }
})

/** @jsx React.DOM */
React.render(
    <HelloWorld name="Meow"/>,
    document.getElementById('mount-point')
);

      /** @jsx React.DOM */
React.render(
    <BingoBoard squares={bingoData}/>,
    document.getElementById('bingo-board')
);