import React from "react";




const ButtonFactory = (props) => {


    let symbol = props.symbol;
    let name = props.name;
    let onClick = props.onClick;


    return (
        <button className="btn btn-primary" value={symbol} onClick={onClick}>{symbol} : {name}</button>
    )
}


export default ButtonFactory;