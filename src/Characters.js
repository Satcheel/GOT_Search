import React, { Component } from 'react';
import './App.css';

function Character(props)
{
    let titles = null;
    if(props.character.titles && props.character.titles.length)
    {
        titles = props.character.titles.filter(value => value).map((title, ind) => <p key={ind}>{title}</p>);
        if(titles!=null && titles.length===0)
        {
            titles = null;
        }
    }
    let aliases = null;
    if(props.character.aliases && props.character.aliases.length)
    {
        aliases = props.character.aliases.filter(value => value).map((alias, ind) => <p key={ind}>{alias}</p>);
        if(aliases!=null && aliases.length===0)
        {
            aliases = null;
        }
    }
    let playedBy = null;
    if(props.character.playedBy && props.character.playedBy.length)
    {
        playedBy = props.character.playedBy.filter(value => value).map((p, ind) => <p key={ind}>{p}</p>);
        if(playedBy!=null && playedBy.length===0)
        {
            playedBy = null;
        }
    }
    return (
        <div className="card row justify-content-cente">
            <h2 className="card-title" style={{color: '#ffffff', backgroundColor: '#000000'}}>{props.character.name}</h2>
            <div className="card-body col-auto">
                <table className="table table-responsive">
                    <tbody>
                            { titles && titles.length && <tr> <th scope="row">Titles</th> <td>{titles} </td> </tr>}
                            { aliases && aliases.length && <tr> <th scope="row">Aliases</th> <td>{aliases} </td> </tr> }
                            { playedBy && playedBy.length && <tr> <th scope="row">Played by</th> <td>{playedBy} </td> </tr> }
                            { props.character.gender && <tr> <th scope="row">Gender</th> <td>{props.character.gender} </td> </tr> }
                            { props.character.born && <tr> <th scope="row">Born</th> <td>{props.character.born} </td> </tr> }
                            { props.character.died && <tr> <th scope="row">Died</th> <td>{props.character.died} </td> </tr> }
                            { props.character.culture && <tr> <th scope="row">Culture</th> <td>{props.character.culture} </td> </tr> }
                            { props.character.father && <tr> <th scope="row">Father</th> <td>{props.character.father} </td> </tr> }
                            { props.character.mother && <tr> <th scope="row">Mother</th> <td>{props.character.mother} </td> </tr> }
                            { props.character.spouse && <tr> <th scope="row">Spouse</th> <td>{props.character.spouse} </td> </tr> }
                    </tbody>
                </table>
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