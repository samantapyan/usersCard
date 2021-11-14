import './style.scss'
import fields from '../../fields'
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useState, useEffect}  from 'react';
import {Modal, Button} from 'react-bootstrap';

function ModalWindow(props) {

const emailRegexp  ='(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().matches(emailRegexp, "Invalid Email"),
        surname: yup.string().required(),
        phone: yup.number().required().typeError("Incorrect Phone Number")


    })

    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)});

    function AddUser(){
        console.log("add user")

    }
    const onSubmit = data => {
        let usersData = [...props.users]
        console.log(data)
        usersData.push(data)
        window.localStorage.setItem("users", JSON.stringify(usersData))
        props.setUsers(usersData)
reset()
        props.onHide()
    };

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.modaltype === "addUser" ? 'Add User' : "Edit User"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'user-modal-body'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((f,i) =>  {
                            console.log("f==", f)
                            if (f.type === "fill") {
                                return (
                                    <div key={i} className={'w-75 mt-2 d-block m-auto margin-auto d-flex flex-column  align-items-start'}>
                                        <label htmlFor={f.label} className={'pl-3 text-center'}>{f.label}</label>
                                        <input {...register(f.name,
                                            { required: true, maxLength: 20 }
                                        )}
                                               name={f.name}
                                               type="text"
                                               id={f.label}
                                               className={'input w-100'}/>
                                               <div className={'text-danger'}>
                                                   {errors[f.name]?.message}
                                               </div>

                                    </div>
                                )
                            }
                        }

                        )}
                        <div className={'text-center mt-3'}>
                            {props.modaltype === "addUser" ? (
                                <Button  type={'submit'} >Add User</Button>
                            ) : (
                                <Button  type={'submit'}>Save User</Button>
                            )}
                        </div>

                      </form>
                </Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalWindow;
