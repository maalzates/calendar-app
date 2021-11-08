import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { eventClearActiveNote, eventStartAddNew, eventStartUpdate } from '../../actions/events';
import { uiCloseModal } from '../../actions/ui';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours') // Nos da la fecha actual en este formato 3:00:00 y le añade 2 horas al momento donde fue llamado.
const nowPlus1 = now.clone().add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
}

const CalendarModal = () => {

    const dispatch = useDispatch()
    const {modalOpen} = useSelector(({ui}) => ui);
    const {activeEvent} = useSelector(({calendar}) => calendar)
    
    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent)

    const {title, notes, start, end} = formValues

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    
    useEffect(() => {
        if(activeEvent != null){
        setFormValues(activeEvent)
        }
    }, [activeEvent])

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveNote());
        setFormValues(initEvent)
    }

    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndtDateChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment (end);

        if ( momentStart.isSameOrAfter(momentEnd) ) {
            Swal.fire('Error', 'La fecha final debe ser mayor a fecha inicial', 'error')
        } 
        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        // TODO 
        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {
            dispatch(eventStartAddNew(formValues))
        }

        setTitleValid(true);
        closeModal();

    }

    return (
        <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
            className="container"
            onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />

                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndtDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        id="form-title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal
