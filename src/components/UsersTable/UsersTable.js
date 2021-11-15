import { Button, Table } from 'react-bootstrap';
import './style.scss'
import fields from '../../fields'
import {useEffect, useState} from "react";
import Modal from "../Modal/Modal";
import {FaEdit} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'

function UsersTable() {

    const [users, setUsers]  = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState('addUser');
    const [searchData, setSearchData] = useState(null)
    const [originalUsers, setAllOriginalUsers] = useState([])
    const [currentUserId, setCurrentUserId] = useState('');

    useEffect(()=>{
        let usersFromStorage = window.localStorage.getItem('users')
        if (usersFromStorage) {
            setUsers([...JSON.parse(usersFromStorage)])
            setAllOriginalUsers([...JSON.parse(usersFromStorage)])
        }
    },[])

    function deleteUser(id){
        let usersCopy = [...users]
        let newUsers = usersCopy.filter(u => u.id !==id)
        setUsers(newUsers)
        window.localStorage.setItem("users", JSON.stringify(newUsers))
    }

    function setSearch(fieldName, value) {
        let newData = {...searchData}
        if (value === "") {
            delete newData[fieldName]
        } else {
            newData[fieldName] = value
        }

        setSearchData(newData)
    }


    useEffect(()=>{
        let newUsers = []
        let allUsers = [...originalUsers]
        allUsers.forEach(u => {
           if (searchData !== null && Object.keys(searchData).length) {
               let isEqual = false
               for (let field in searchData) {
                   if (searchData[field] ) {
                       if (typeof  u[field] === "string") {
                           if (u[field].startsWith(searchData[field])) {
                               isEqual= true
                           } else {
                               isEqual= false
                               break;
                           }
                       } else if (typeof u[field] === "number") {
                           let number = u[field].toString()
                           if (number.startsWith(searchData[field])) {
                               isEqual= true
                           } else {
                               isEqual= false
                               break;
                           }
                       }
                   }
               }
               if (isEqual) {
                   newUsers.push(u)
               }

           } else {
               newUsers.push(u)
           }
        })
        if (searchData !== null && Object.keys(searchData).length) {
            setUsers(newUsers)
        } else {
            if (allUsers) {
                setUsers([...allUsers])
            }
        }

    }, [searchData, originalUsers])

    return (
        <div className={'mt-5 w-75  mx-auto'}>
            <Button variant="primary" onClick={() =>  {
                setModalType("addUser")
                setModalShow(true)
                setCurrentUserId('')
            }
            }>
               Add User
            </Button>
            <Modal show={modalShow}
                   modaltype={modalType}
                   users={users}
                   originalusers={originalUsers}
                   setoriginalusers={setAllOriginalUsers}
                   setmodalshow={setModalShow}
                   id={currentUserId}
                   setall={setUsers}
                   resetid={setCurrentUserId}
                   onHide={() => {
                       setModalShow(false)
                   }}
            />
            <div className={'search-mobile'}>
                <div className={'text-center heading'}>Live Search</div>
                {fields.map((f,i) => {
                    if (f.name !== "id" && f.name !== "action") {
                        return (
                            <div  key={i}>
                                <div>{f.label}</div>
                                <div className={'w-full'}>
                                    <input type={"text"}
                                           value={searchData && searchData.hasOwnProperty(f.name) && searchData[f.name] || ''}
                                           onChange={e => setSearch(f.name, e.target.value)}
                                           className={'w-100'}/>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <Table striped bordered hover variant="dark" className={'mt-5 text-center users-table' }>
                <thead>
                <tr>
                    {fields.map((f,i) => (
                        <th key={i} className={''}>
                          <div>
                                {f.label}
                          </div>
                            {(f.name !== "id" && f.name !== "action") && (
                                <div className={'w-full'}>
                                    <input type={"text"}
                                           value={searchData && searchData.hasOwnProperty(f.name) && searchData[f.name] || ''}
                                           onChange={e => setSearch(f.name,e.target.value)} className={'w-100'}/>
                                </div>
                            )}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 && users.map((user, ind) => (
                    <tr key={ind}>
                        <td data-label="N">{ind+1}</td>
                        <td data-label="Name">{user.name}</td>
                        <td data-label="Surname">{user.surname}</td>
                        <td data-label="Email">{user.email}</td>
                        <td data-label="Email">{user.address}</td>
                        <td data-label="Phone">{user.phone}</td>
                        <td data-label="Action" >
                            <div className={'actions  d-flex justify-content-evenly'}>
                                <FaEdit
                                    className={'cursor-pointer mx-3'}
                                    onClick={() => {
                                        setModalType("editUser")
                                        setCurrentUserId(user.id)
                                        setModalShow(true)
                                    }}/>
                                <AiFillDelete
                                    onClick={() => deleteUser(user.id)}
                                    className={'ml-3 cursor-pointer'}/>
                            </div>
                        </td>
                    </tr>
                ) )}
                </tbody>
            </Table>
            {users && users.length === 0 && (
                <div className={'text-center'}>
                    No users
                </div>
            )}
        </div>
    );
}

export default UsersTable;
