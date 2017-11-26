import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 126,
      weight: 45,
      bmi: 0,
      width: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
    this.setWidth = this.setWidth.bind(this);
  }
  handleChange(e) {
    let newState = {}
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }
  calculateBMI(e) {
    e.preventDefault();
    this.setState({
      bmi: Math.round(this.state.weight/(this.state.height * this.state.height/10000))
    })
  }
  setWidth(e) {
    this.setState({ width: e.clientWidth });
  }
  render() {
    let x = (Math.min(40, Math.max(15, this.state.bmi)) - 27.5) * (this.state.width/25);
    let indicatorStyle = {
      transform: "translate3d(" + x + "px, 0, 0)"
    }
    let result = this.state.bmi ? (
      <div className="result" ref={this.setWidth}>
        <div className="bmi-indicator" style={indicatorStyle}>{this.state.bmi}</div>
        <div className="bmi-category">
          <div className="underweight">Underweight</div>
          <div className="healthy">Healthy</div>
          <div className="overweight">Overweight</div>
          <div className="obese">Obese</div>
        </div>
        <p>
          BMI remains controversial and this calculator does not factor your gender, build, age or ethnicity. So, speak to a health professional for a personalised assessment.
        </p>
      </div>
    ) : ''
    return (
      <div className="App">
      <h1>Body Mass Index (BMI)</h1>
        <form onSubmit={this.calculateBMI}>
          <label>
            <p>Weight:</p>
            <input name="weight" onChange={this.handleChange} placeholder="45" autoFocus={true}/>
            <span>kg</span>
          </label>
          <label>
            <p>Height:</p>
            <input name="height" onChange={this.handleChange} placeholder="126"/>
            <span>cm</span>
          </label>
          <input type="submit" value="Calculate your BMI" />
        </form>
          {result}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
