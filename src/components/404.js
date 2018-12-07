import React, {Component} from 'react';

class errorPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      done: true,
      input: [],
      code: [38,38,40,40,37,39,37,39,66,65,13],
      // this is the konami code (up,up,down,down,left,right,left,right,b,a,enter)
      specialThanks: [
        {name: 'Marc Lefebvre', description: 'Agile Coach'},
        {name: 'Micheal McCarthy', description: 'Technology Leadership Initiative Leader'},
        {name: 'Paul Gries', description: 'Professor'},
        {name: 'Robert Wood', description: 'Microsoft Tech Guy'},
        {name: 'Water Guy', description: 'Sprayed water on us'}
      ],
      credits: [
        {name: 'Aslesha Pokhrel', description: 'Frontend/Backend'},
        {name: 'Ben Pry', description: 'Udemy courses dealer - Frontend/Backend'},
        {name: 'Clara Silwal', description: '"I like pretty colors" - Frontend'},
        {name: 'Chenhao Gong', description: '"?????" - Backend'},
        {name: 'Ece Yucer', description: 'Backend'},
        {name: 'Elias Williams', description: 'Backend'},
        {name: 'Felicia Liang', description: 'Frontend'},
        {name: 'Ibrahim Hasan', description: '"Wow its actually good" - Frontend/Backend'},
        {name: 'Ignas Armoska', description: 'Bad at mario kart - Frontend/Backend'},
        {name: 'Jason Tang', description: '"Tony use bootstrap" - Frontend'},
        {name: 'Julie Quintero', description: 'Backend'},
        {name: 'Kshitij Shah', description: 'Honorary True Blue Teen - Backend'},
        {name: 'Lauren Mason', description: 'Frontend'},
        {name: 'Luke Kwong', description: 'Frontend/Backend'},
        {name: 'Matthieu Chan Chee', description: 'Frontend/Backend'},
        {name: 'Muhammad Khattak', description: 'Backend'},
        {name: 'Nancy Zhang', description: 'Frontend'},
        {name: 'Peiyu Yu', description: 'Frontend/Backend'},
        {name: 'Ruth Castro', description: 'Backend'},
        {name: 'Sami Fassnacht', description: 'Frontend'},
        {name: 'Tony Nguyen', description: '"Element React has so many more THINGS" - Frontend/Backend'},
        {name: 'Utkarsh Agarwal', description: 'Backend'},
        {name: 'Viresh Umbre', description: '"Youre not getting away this time" - Frontend/Backend'},
        {name: 'William Nono', description: '"So theres this guy..." - Frontend/Backend'}
      ]
    }
  }
        
  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
    this.setState({ input: [] });
    console.log(this.props.history);
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
      this.setState({ done: false });
      // document.body.className = 'gif-background'
    }
  }

  onKonamiCode() {
    const specialContent = this.state.specialThanks.map((thank) => {
      return <div class="row justify-content-between align-items-center py-1 mx-0">
        <div class="float-left">
          <h2>{thank.name}</h2>
        </div>
        <div class="justify-content-end">
          <h4>{thank.description}</h4>
        </div>
      </div>
    })

    const content = this.state.credits.map((credit) => {
      return <div class="row justify-content-between align-items-center py-1 mx-0">
        <div class="float-left">
          <h2>{credit.name}</h2>
        </div>
        <div class="justify-content-end">
          <h4>{credit.description}</h4>
        </div>
      </div>
    })  
  }


  render = () => {
    let specialContent;
    let content;
    if (!this.state.done) {
      specialContent = this.state.specialThanks.map((thank) => {
        return <div class="row justify-content-between align-items-center py-1 mx-0">
          <div class="float-left">
            <h2>{thank.name}</h2>
          </div>
          <div class="justify-content-end">
            <h4>{thank.description}</h4>
          </div>
        </div>
      });
      content = this.state.credits.map((credit) => {
        return <div class="row justify-content-between align-items-center py-1 mx-0">
          <div class="float-left">
            <h2>{credit.name}</h2>
          </div>
          <div class="justify-content-end">
            <h4>{credit.description}</h4>
          </div>
        </div>
      });
    }


    return (
      <div className="scroll-y-overflow">
        <div style= {{display: (this.state.done) ? 'block': 'none'}}>
          <div className="container">
            <div className="p-4">
              <h1 className="display-2">404 Error</h1>
              <hr className="my-4"/>
              <h3 className="ml-2">
                  This page does not exist. <a href="#" onClick={this.props.history.goBack}>Here's a way back to safety.</a>
              </h3>
            </div>
          </div>
        </div>


        <div style= {{display: (this.state.done) ? 'none': 'block'}}>
          <div className="container jumbotron rounded bg-black">
            <div className="container px-4">
              <div className="row mx-0"><h1 className="display-4">Welcome to the credits</h1></div>
              <hr className="white-hr"/>
              <div className="row mx-0"><h1>Special thanks to: </h1></div>
              <hr className="white-hr"/>
              {specialContent}
              <hr className="white-hr"/>
              <div className="row mx-0"><h1>Meet the Developers: </h1></div>
              <hr className="white-hr"/>
              {content}
            </div>
          </div>

          {/*This just adds an animation of ocean waves
          <div className="ocean">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>*/}
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