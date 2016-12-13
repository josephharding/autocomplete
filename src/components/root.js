
import React from 'react';
import mw from 'missionwizard';
import './root.css';

export default class Root extends React.Component {

  constructor() {
    super();
    this.state = {
      options: [],
      highlight: 0
    };
  } 

  onKeyDown(event) {
    if(event.key == "ArrowDown") { 
      this.setState({ highlight: Math.min(this.state.highlight + 1, this.state.options.length - 1) });
    } else if(event.key == "ArrowUp") {
      this.setState({ highlight: Math.max(this.state.highlight - 1, -1) });
    }
  }

  onChange(event) {
    if (event.target.value == "" || event.target.value.length < 4) {
      this.setState({ options: [] });
    } else {
      mw.suggest({ es : 'http://104.198.189.179:9200', index: 'games' },
          event.target.value, (options) => {
            console.log("options", options);
            this.setState({ options: options });
      });
    } 
  }

	render() {

    let list_element = [];
    for(let i = 0; i < this.state.options.length; i++) { 
      list_element.push(
          <div key={i} className={this.state.highlight == i ? "highlight option-row" : "option-row"}>
          { this.state.options[i]['text'] }
          </div> 
          );
    }
		
    return (
			<div className="root">
				<input type="text" onKeyDown={this.onKeyDown.bind(this)} onChange={this.onChange.bind(this)}></input>
        <div className="abs"> 
          { list_element }
        </div>
        <p>
          This is a paragraph under the text input field.
        </p>
      </div>
		);
	}
}
