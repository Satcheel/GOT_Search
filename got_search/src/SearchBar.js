import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            searchValue : "",
            searchType : "1"
        };
    }

    handleRadioChange(event)
    {
        this.setState({
            searchType : event.target.value,
        });
    }

    handleInputChange(event)
    {
        this.setState({
            searchValue : event.target.value
        });
    }

    handleSubmit()
    {
        this.props.parentCallback(this.state.searchType, this.state.searchValue);
    }
    
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <nav className="nav navbar-nav" id="navigation">
                        <form id="radio-options">
                            <label className="radio-inline">
                                <input type="radio" name="optradio" value="1" id="1" onClick={this.handleRadioChange.bind(this)} defaultChecked  /> Characters
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="optradio" value="2" id="2" onClick={this.handleRadioChange.bind(this)} /> Houses
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="optradio" value="3" id="3" onClick={this.handleRadioChange.bind(this)} /> Random Character
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="optradio" value="4" id="4" onClick={this.handleRadioChange.bind(this)} /> Random House
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="optradio" value="5" id="5" onClick={this.handleRadioChange.bind(this)} /> Random Character in a House
                            </label>
                            <span>
                                <input type="text" placeholder="Type Here..." name="search" id="search" onChange={this.handleInputChange.bind(this)} />
                                <button type="button" className="btn btn-md" onClick={this.handleSubmit.bind(this)} > Get Info </button>  
                            </span>
                            
                        </form>
                    </nav>
                </div>
		    </nav>
        );
    }
}

export default SearchBar;