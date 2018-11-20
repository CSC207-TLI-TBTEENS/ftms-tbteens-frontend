import React, {Component} from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
        this.searching = this.searching.bind(this);
    }

    searching(e){
        this.setState({[e.target.name]:e.target.value});
        if (e.target.value !== ""){
            let newData = [];

            const values = Object.values(this.props.data)
            for (let i = 0; i < values.length; i++) {
                let data = Object.values(values[i])
                for (let j = 1; j < data.length; j++){
                    if (typeof data[j] === typeof "a"){
                        let tableString = data[j].toLowerCase()
                        if (tableString.indexOf(e.target.value.toLowerCase()) != -1 && !newData.includes(values[i])){   
                            newData.push(values[i]);
                        }
                    }
                    
                }
                
            }
            this.props.onchange(newData);

        }
        else{
            this.props.onchange(this.props.data);
        }
    }


    render (){
        return(
        <div>
            <input 
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            type="text"
            className="search mb-1"
            name="query"
            id="query"
            value = {this.state.query}
            placeholder="search"
            autoComplete="off"
            onChange={this.searching}
            />
            
        </div>
        
        )
    }
}

export default SearchBar;