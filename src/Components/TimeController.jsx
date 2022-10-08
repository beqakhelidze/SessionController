import React from "react";
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

const TimeController = (props) => {

    return (
        <div>
            <h2>{props.name}</h2>
            <div className='Controllers'>
                <BsFillArrowDownCircleFill
                    onClick={!props.isTurned ? () => props.Controller({ Key: props.type, type: "decrement" })
                                             : () => { }}
                />
                <h2>{props.value}</h2>
                <BsFillArrowUpCircleFill
                    onClick={!props.isTurned ? () => props.Controller({ Key: props.type, type: "increment" })
                                             : () => { }}
                />
            </div>
        </div>
    )
}

export default TimeController;