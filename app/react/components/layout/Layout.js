var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;

var BingoNav = require('./NavBar');

var Layout = React.createClass({
  render: function() {
      var stylesheets = this.props.styles.map(function(url){
        return (
          <link href={url} rel="stylesheet"/>
        )
      });

      var scripts = this.props.scripts.map(function(url){
        return (
          <script src={url}></script>
        )
      });
    
    return (
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title}</title>
          {stylesheets} 
          <script id='data' type='application/json' dangerouslySetInnerHTML={{__html: this.props.data}}></script>
        </head>
        <body>
          <BingoNav />
          <div className="container">
            <Row>
              <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                {this.props.children}
              </Col>
            </Row>
          </div>
         {scripts}
        </body>
      </html>
    );
  }
});

module.exports = Layout;