import React, { Component } from 'react';
import './App.css';


function House(props)
{
    let titles = null;
    if(props.house.titles && props.house.titles.length)
    {
        titles = props.house.titles.filter(value => value).map((title, ind) => <p key={ind}>{title}</p>);
        if(titles!=null && titles.length===0)
        {
            titles = null;
        }
    }
    let ances_weapons = null;
    if(props.house.ancestralWeapons && props.house.ancestralWeapons.length)
    {
        ances_weapons = props.house.ancestralWeapons.filter(value => value).map((weapon, ind) => <p key={ind}>{weapon}</p>);
        if(ances_weapons!=null && ances_weapons.length===0)
        {
            ances_weapons = null;
        }
    }
    let seats = null;
    if(props.house.seats && props.house.seats.length)
    {
        seats = props.house.seats.filter(value => value).map((p, ind) => <p key={ind}>{p}</p>);
        if(seats!=null && seats.length===0)
        {
            seats = null;
        }
    }

    return (
        <div className="card row justify-content-cente">
            <h2 className="card-title" style={{color: '#ffffff', backgroundColor: '#000000'}}>{props.house.name}</h2>
            <div className="card-body col-auto">
                <table className="table table-responsive">
                    <tbody>
                            { props.house.coatOfArms && <tr> <th scope="row">Coat of Arms</th> <td>{props.house.coatOfArms} </td> </tr> }
                            { props.house.words && <tr> <th scope="row">Slogan</th> <td>{props.house.words} </td> </tr> }
                            { props.house.region && <tr> <th scope="row">Region</th> <td>{props.house.region} </td> </tr>}
                            { props.house.currentLord && <tr> <th scope="row">Current Lord</th> <td>{props.house.currentLord} </td> </tr> }
                            { seats && seats.length && <tr> <th scope="row">Seats</th> <td>{seats} </td> </tr> }
                            { props.house.heir && <tr> <th scope="row">Heir</th> <td>{props.house.heir} </td> </tr> }
                            { props.house.founded && <tr> <th scope="row">Founded</th> <td>{props.house.founded} </td> </tr> }
                            { props.house.founder && <tr> <th scope="row">Founder</th> <td>{props.house.founder} </td> </tr> }
                            { props.house.diedOut && <tr> <th scope="row">Died out</th> <td>{props.house.diedOut} </td> </tr> }
                            { titles && titles.length && <tr> <th scope="row">Titles</th> <td>{titles} </td> </tr> }
                            { ances_weapons && ances_weapons.length && <tr> <th scope="row">Ancestral Weapons</th> <td>{ances_weapons} </td> </tr> }
                    </tbody>
                </table>
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