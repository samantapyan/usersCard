import { Button, Table } from 'react-bootstrap';
import './style.scss'
import fields from '../../fields'
import {useEffect, useState} from "react";
import Modal from "../Modal/Modal";

function UsersTable() {

    const [users, setUsers]  = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState('addUser');

    useEffect(()=>{
        let usersFromStorage = window.localStorage.getItem('users')
        console.log("lS = ", usersFromStorage, JSON.parse(usersFromStorage))
        setUsers(JSON.parse(usersFromStorage))
    },[])




    return (
        <div className={'mt-5 w-75  mx-auto'}>
            <Button variant="primary" onClick={() =>  {
                setModalType("addUser")
                setModalShow(true)
            }

            }>
               Add User
            </Button>
            <Modal show={modalShow}
                   modaltype={modalType}
                   users={users}
                   setUsers={setUsers}
                   onHide={() => setModalShow(false)}
            />

            <Table striped bordered hover variant="dark" className={'mt-5 users-table' }>
                <thead>


                <tr>
                    {fields.map((f,i) => (
                        <th key={i}>{f.label}</th>
                    ))}

                </tr>
                </thead>
                <tbody>

                {users.length > 0 && users.map((user, ind) => (
                    <tr key={ind}>
                        <td data-label="N">{ind+1}</td>
                        <td data-label="Name">{user.name}</td>
                        <td data-label="Surname">{user.surname}</td>
                        <td data-label="Email">{user.email}</td>
                        <td data-label="Phone">{user.phone}</td>
                        <td data-label="Action">
                            <Button variant="primary" onClick={() => {
                                setModalShow(true)
                                setModalType("editUser")
                            }}>
                            Edit User
                        </Button>
                        </td>
                    </tr>
                ) )}

                </tbody>
            </Table>
        </div>
    );
}

export default UsersTable;
