import React, { Component } from 'react';
import './App.css';


function House(props)
{
    let titles = null;
    if(props.house.titles && props.house.titles.length)
    {
        titles = props.house.titles.map((title, ind) => <p key={ind}>{title}</p>);
    }
    let ances_weapons = null;
    if(props.house.ancestralWeapons && props.house.ancestralWeapons.length)
    {
        ances_weapons = props.house.ancestralWeapons.map((weapon, ind) => <p key={ind}>{weapon}</p>);
    }
    let seats = null;
    if(props.house.seats && props.house.seats.length)
    {
        seats = props.house.seats.map((p, ind) => <p key={ind}>{p}</p>);
    }

    return (
        <div className="card">
            <div className="card-body">
                
                <h4 className="card-title">{props.house.name}</h4>
                { props.house.region && <h6 className="card-subtitle mb-2 text-muted">Region: {props.house.region} </h6> }
                { props.house.coatOfArms && <h6 className="card-subtitle mb-2 text-muted">Coat of Arms: {props.house.coatOfArms} </h6> }
                { props.house.words && <h6 className="card-subtitle mb-2 text-muted">Slogan: {props.house.words} </h6> }
                { props.house.currentLord && <h6 className="card-subtitle mb-2 text-muted">Current Lord`: {props.house.currentLord} </h6> }
                { props.house.seats && <h5 className="card-title mb-2 text-muted">Seats: {seats} </h5> }
                { props.house.heir && <h6 className="card-subtitle mb-2 text-muted">Heir: {props.house.heir} </h6> }
                { props.house.founded && <h6 className="card-subtitle mb-2 text-muted">Founded: {props.house.founded} </h6> }
                { props.house.founder && <h6 className="card-subtitle mb-2 text-muted">Founder: {props.house.founder} </h6> }
                { props.house.diedOut && <h6 className="card-subtitle mb-2 text-muted">Died out: {props.house.diedOut} </h6> }
                { props.house.titles && <h5 className="card-title mb-2 text-muted">Titles: {titles} </h5> }
                { props.house.ancestralWeapons && <h5 className="card-title mb-2 text-muted">Ancestral Weapons: {ances_weapons} </h5> }
            </div>
        </div>
    );
}

class Houses extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            data : [],
        };
        // var c_max=2138; //,h_max=444;

        let path = "https://www.anapioficeandfire.com/api/houses";
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
            let path = "https://www.anapioficeandfire.com/api/houses";
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
        // let result = this.state.data.map((house_data) => {
        //     return < house house_data={house_data}/>
        // });
        let output = null;
        if(this.props.random_flag && this.state.data)
        {
            output =  < House house={this.state.data}/>;
        }
        else if(!this.props.random_flag && this.state.data && this.state.data.length)
        {
            output = this.state.data.map((house_data, ind) => {
                return ((house_data.name)?< House house={house_data} key={ind}/>:null);
                // return < house house={house_data} key={ind} />;
            });
        }
        // else if(this.props.random_flag && this.state.data)
        // {
        //     output =  < house house={this.state.data}/>;
        // }
        return output;
    }
}

export default Houses;