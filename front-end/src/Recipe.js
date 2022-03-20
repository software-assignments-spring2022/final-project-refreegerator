import {Card} from "react-bootstrap";
const Recipe = props => {
    return (
        <>
            <Card>
                <Card.Body>
                    <h2> {props.title} </h2>
                    <p> {props.body} </p>
                </Card.Body>
            </Card>
        </>

    )
}

export default Recipe
