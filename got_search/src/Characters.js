import React, { Component } from 'react';
import './App.css';

function Character(props)
{
    let titles = null;
    if(props.character.titles && props.character.titles.length)
    {
        titles = props.character.titles.map((title, ind) => <p key={ind}>{title}</p>);
    }
    let aliases = null;
    if(props.character.aliases && props.character.aliases.length)
    {
        aliases = props.character.aliases.map((alias, ind) => <p key={ind}>{alias}</p>);
    }
    let playedBy = null;
    if(props.character.playedBy && props.character.playedBy.length)
    {
        playedBy = props.character.playedBy.map((p, ind) => <p key={ind}>{p}</p>);
    }
    return (
        <div className="card">
            <div className="card-body">
                
                <h4 className="card-title">{props.character.name}</h4>
                { props.character.gender && <h6 className="card-subtitle mb-2 text-muted">Gender: {props.character.gender} </h6> }
                { props.character.born && <h6 className="card-subtitle mb-2 text-muted">Born: {props.character.born} </h6> }
                { props.character.died && <h6 className="card-subtitle mb-2 text-muted">Died: {props.character.died} </h6> }
                { props.character.culture && <h6 className="card-subtitle mb-2 text-muted">Culture: {props.character.culture} </h6> }
                { props.character.father && <h6 className="card-subtitle mb-2 text-muted">Father: {props.character.father} </h6> }
                { props.character.mother && <h6 className="card-subtitle mb-2 text-muted">Mother: {props.character.mother} </h6> }
                { props.character.spouse && <h6 className="card-subtitle mb-2 text-muted">Spouse: {props.character.spouse} </h6> }
                { props.character.titles && <h5 className="card-title mb-2 text-muted">Titles: {titles} </h5> }
                { props.character.aliases && <h5 className="card-title mb-2 text-muted">Aliases: {aliases} </h5> }
                { props.character.playedBy && <h5 className="card-title mb-2 text-muted">Played by: {playedBy} </h5> }
            </div>
        </div>
    );
}

class Characters extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            data : [],
        };
        // var c_max=2138; //,h_max=444;

        let path = "https://www.anapioficeandfire.com/api/characters";
        if(props.name && !props.random_flag)
        {
            path += "?name="+props.name;
        }
        else if(props.random_flag)
        {
            path += "/" + props.random_flag;
        }
        fetch(path)
        .then( res => res.json())
        .then((data) => {
            console.log("Yo data printing");
            console.log(data);
            this.setState({
                data : data,
            });
        })
        .catch(error => {
            console.log("Yo sadd error");
        });
    }

    componentDidUpdate(prevProps)
    {
        if( (prevProps.random_flag !== this.props.random_flag) || (prevProps.name !== this.props.name) )
        {
            let path = "https://www.anapioficeandfire.com/api/characters";
            if(this.props.name && !this.props.random_flag)
            {
                path += "?name="+this.props.name;
            }
            else if(this.props.random_flag)
            {
                path += "/" + this.props.random_flag;
            }
            // let data = 
            fetch(path)
            .then( res => res.json())
            .then((data) => {
                console.log("Yo data printing");
                console.log(data);
                this.setState({
                    data : data
                });
            })
            .catch(error => {
                console.log("Yo sadd error");
            });
        }
        // console.log("Yo data printing twice");
        // console.log(data);
    }


    render()
    {   
        // let result = this.state.data.map((character_data) => {
        //     return < Character character_data={character_data}/>
        // });
        let output = null;
        if(this.props.random_flag && this.state.data)
        {
            output =  < Character character={this.state.data}/>;
        }
        else if(!this.props.random_flag && this.state.data && this.state.data.length)
        {
            output = this.state.data.map((character_data, ind) => {
                return ((character_data.name)?< Character character={character_data} key={ind}/>:null);
                // return < Character character={character_data} key={ind} />;
            });
        }
        // else if(this.props.random_flag && this.state.data)
        // {
        //     output =  < Character character={this.state.data}/>;
        // }
        return output;
    }
}

export default Characters;