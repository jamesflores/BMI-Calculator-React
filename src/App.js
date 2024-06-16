import React, { Component } from 'react';
import './App.css';

class BMIApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bmi: 0,
      weight: '',
      height: ''
    };
  }

  calculateBMI = () => {
    let { weight, height } = this.state;
    let bmi = weight / (height / 100 * height / 100);
    bmi = bmi.toFixed(1);

    this.setState({ bmi });
  }

  clearBMI = () => {
    this.setState({
      bmi: 0,
      weight: '',
      height: ''
    });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const { weight, height } = this.state;

      if (weight === "" || height === "") {
        return;
      }

      this.calculateBMI();
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 my-3">
            <h1>BMI Calculator</h1>
            <div className="form-group my-3">
              <label>Weight</label>
              <input onKeyPress={this.handleKeyPress} onChange={this.handleChange} type="text" name="weight" value={this.state.weight} className="form-control" placeholder="" aria-describedby="helpId" autoFocus />
              <small id="helpId" className="text-muted">kilograms</small>
            </div>
            <div className="form-group my-3">
              <label>Height</label>
              <input onKeyPress={this.handleKeyPress} onChange={this.handleChange} type="text" name="height" value={this.state.height} className="form-control" placeholder="" aria-describedby="helpId" />
              <small id="helpId" className="text-muted">centimetres</small>
            </div>
            <button onClick={this.calculateBMI} name="btnCalculate" className="btn btn-primary" role="button">Calculate</button>&nbsp;
            <button onClick={this.clearBMI} name="btnClear" className="btn btn-secondary" role="button">Reset</button>
          </div>
        </div>

        <BMIResult bmi={this.state.bmi} />
      </div>
    );
  }
}

class BMIResult extends Component {
  getBMICategory(bmi) {
    let category = '';
    let colourClass = '';
    let textClass = '';

    if (bmi < 16) {
      category = 'Underweight (Severe thinness)';
      colourClass = 'bg-danger';
      textClass = 'text-white';
    } else if (bmi >= 16 && bmi <= 16.9) {
      category = 'Underweight (Moderate thinness)';
      colourClass = 'bg-warning';
      textClass = 'text-dark';
    } else if (bmi >= 17 && bmi <= 18.4) {
      category = 'Underweight (Mild thinness)';
      colourClass = 'bg-warning';
      textClass = 'text-dark';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = 'Normal range';
      colourClass = 'bg-success';
      textClass = 'text-white';
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = 'Overweight (Pre-obese)';
      colourClass = 'bg-warning';
      textClass = 'text-dark';
    } else if (bmi >= 30 && bmi <= 34.9) {
      category = 'Obese (Class I)';
      colourClass = 'bg-warning';
      textClass = 'text-dark';
    } else if (bmi >= 35 && bmi <= 39.9) {
      category = 'Obese (Class II)';
      colourClass = 'bg-danger';
      textClass = 'text-white';
    } else if (bmi >= 40) {
      category = 'Obese (Class III)';
      colourClass = 'bg-danger';
      textClass = 'text-white';
    }

    return { category, colourClass, textClass };
  }

  render() {
    const bmi = this.props.bmi > 0 ? this.props.bmi : "";
    const { category, colourClass, textClass } = this.getBMICategory(bmi);

    return (
      <div className="row">
        <div className="col-md-6 my-3">
          {bmi && (
            <div className={`card ${textClass} ${colourClass} mb-3`}>
              <h5 className={`card-header ${textClass}`}>BMI Result</h5>
              <div className="card-body">
                <h5 className={`card-title ${textClass}`}>{bmi}</h5>
                <p className={`card-text ${textClass}`}>{category}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BMIApp;