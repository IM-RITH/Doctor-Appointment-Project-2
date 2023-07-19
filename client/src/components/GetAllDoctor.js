import React from "react";
import {useNavigate} from "react-router-dom";

function Doctor({doctor}) {
    const navigate = useNavigate();
    return(
        <div className="card2 p-1 pointer" onClick={()=> navigate(`/booking-appointment/${doctor._id}`)}>
            <h1 className="card-title1">{doctor?.firstName} {doctor?.lastName}</h1>
            <hr/>
            <div className="info3">
                <p className="specialize">Specialization: {doctor.specialization}</p>
                {/* <p className="phoneNumber">Phone Number: {doctor.phoneNumber}</p> */}
                {/* <p className="fees">Fees: {doctor.fee} ($)</p> */}
                <p className="time">Time: {doctor.timing[0]} - {doctor.timing[1]}</p>
                <p className="address">Address: {doctor.address}</p>
                {/* <p className="experience">Experience: {doctor.experience}</p> */}
            </div>
        </div>
    )
}

export default Doctor;