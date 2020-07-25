import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import Characters from './Characters';
import Houses from './Houses.js';

function random_no(min,max)
{
     const r_no = Math.floor(Math.random() * max) + min;
    return r_no;
}

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            charac_flag : false,
            house_flag : false,
            random_flag : 0,
            query : ""
        };
    }

    callBack(type, value)
    {
        let charac_flag = false;
        let house_flag = false;
        let random_flag = 0;
        let query = "";
        if(type === "1")
        {
            charac_flag = true;
            query = value;
        }
        else if(type === "2")
        {
            house_flag = true;
            query = value
        }
        else if(type === "3")
        {
            charac_flag = true;
            random_flag = random_no(1, 2138);
        }
        else if(type === "4")
        {
            house_flag = true;
            random_flag = random_no(1, 444);
        }
        else if(type === "5")
        {
            charac_flag = true;
            random_flag = 1;
            query = value;
        }
        this.setState({
            charac_flag : charac_flag,
            house_flag : house_flag,
            random_flag : random_flag,
            query : query
        });
    }

    render() {
        let output = null;
        if(this.state.charac_flag)
        {
            output = <Characters name={this.state.query} random_flag={this.state.random_flag} />;
        }
        else if(this.state.house_flag)
        {
            // output = <Houses data={this.state.query} random_flag={this.state.random_flag} />;
            output = <Houses name={this.state.query} random_flag={this.state.random_flag} />;
        }
        return (
            <div className="App" >
                <div className="App-header" >
                    <h2 > The World of Ice and Fire </h2>
                </div>
                <div>
                    <SearchBar parentCallback={this.callBack.bind(this)}/>
                </div>
                <div className="Container">
                    {output}
                </div>
            </div>
        );
    }
}

export default App;