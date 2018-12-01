import React, {Component} from 'react';

class errorPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      done: true,
      input: [],
      code: [38,38,40,40,37,39,37,39,66,65,13],
      // above is the konami code (up,up,down,down,left,right,left,right,b,a,enter)
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
    this.setState({ input: [] });
  }

  onKeyUp = e => {
    // If key entered is within the code, add it to input array
    if (this.state.code.indexOf(e.keyCode) !== -1) {
      const newInput = [...this.state.input];
      newInput.push(e.keyCode);
      this.setState({ input: newInput });
    }
    
    // Translate them to strings to check if input contains the code
    if (this.state.input.toString().indexOf(this.state.code.toString()) !== -1) {
      this.setState({ done: false })
      document.body.className = 'gif-background'
    }
  }

  render = () => {
    return (
      <div>
        <div style= {{display: (this.state.done) ? 'block': 'none'}}>
          <div className="container rounded bg-purple">
            <div className="p-4">
              <h1 className="display-2">404 Error</h1>
              <hr className="my-4"/>
              <h3 className="">This page does not exist</h3>
            </div>
          </div>
        </div>


        <div className="EasterEgg" style= {{display: (this.state.done) ? 'none' : 'block'}}>
          <div className="container rounded bg-purple">
            <div className="p-4">
              <h3 className="">This page does exist</h3>
            </div>
          </div>
        </div>

      </div>
      )
    }
  }

export default errorPage;


// Wow its actually good
// Tony use bootstrap
// vw and vh trigger me
// Element React has so many more functions
// Increasing ?????