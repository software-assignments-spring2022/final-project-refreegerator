import ReactDom from "react-dom";
import React from "react"
import {Link} from "react-router-dom";
import   {Card} from "react-bootstrap";
const ListItem = props =>{
    return(
        <>
                <Card>
                    <Card.Body>
                        <h1> {props.category} </h1>
                        <h2> {props.name} </h2> 
                        <h3> {props.expdatestr} </h3>
                    </Card.Body>
                </Card>
        </>
    )
}
export default ListItem
