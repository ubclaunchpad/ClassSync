// Modal.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from 'react-select';
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';




const Modal = ({ selectedSlot, availablePeople, onBook, onClose }) => {

    return (
        <div className="modal-container">
            <div className="modal-content">
                {/* <button onClick={onClose}>Close</button>
                <p>Please select 5 classes for student's python classes</p>

                <h2>Tutor Modal</h2>

                <p>Selected Slot: {selectedSlot}</p>


                <h4>Select student</h4>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    options={[{ value: 'red', label: 'Kat' }, { value: 'blue', label: 'Ben' }]}
                />

                <h4>Select course</h4>



                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    options={[{ value: 'red', label: 'Python' }, { value: 'blue', label: 'Java' }]}
                /> */}


                <div style={{ position: 'relative', padding: '10px', paddingRight: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', width: '90%', overflow: 'auto', scrollbarWidth: 'thin' }}>
                    <button onClick={onClose} style={{ position: 'absolute', right: '30px', top: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>x</button>

                    <h3 style={{ marginBottom: '20px', color: '#007BFF' }}>{moment(selectedSlot).format('MMMM Do YYYY')}</h3>
                    <h4 style={{ marginBottom: '10px', color: '#333' }}>{moment(selectedSlot).format('h:mm a')} - {moment(selectedSlot).add(1, 'hours').format('h:mm a')}</h4>
                    <p style={{ marginBottom: '10px', fontWeight: '500', color: '#333' }}>Available Tutors:</p>
                    <div style={{ maxHeight: '55vh', overflowY: 'auto', overflowX: 'hidden' }}>
                        {availablePeople.map((person) => (
                            <div key={person.value} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', transition: 'transform 0.3s ease-in-out', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={(e) => { 
  e.stopPropagation();
  window.open(`/viewTutor/${person.value}`, '_blank')
}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
<img src={person.image} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />                                    <p style={{ margin: '0', fontWeight: '500', color: '#333', textDecoration: 'none' }}>
  {person.label}
</p>                                </div>
                                <button style={{ padding: '12px 24px', backgroundColor: '#B3DEFC', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.3s ease', fontSize: '15px' }} onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#007BFF'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#B3DEFC'; e.currentTarget.style.color = '#000'; }} onClick={(e) => { e.stopPropagation(); onBook(person); }}>
                                    Book
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div >
    );
};

Modal.propTypes = {
    selectedSlot: PropTypes.string.isRequired,
    availablePeople: PropTypes.array.isRequired,
    onBook: PropTypes.func.isRequired,
};

export default Modal;
