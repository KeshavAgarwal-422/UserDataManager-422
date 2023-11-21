import React, { useEffect, useState } from "react";
import './UserDataManager.css'
import { useStateContext } from "../ContextStore/index";
import Loading from "../Components/Loading";
import AddNewUser from "../Components/AddNewUser";
import UserTable from "../Components/UserTable";
import Navbar from "../Components/Navbar";

const UserDataManager = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const {
        usersRef,
        loading,
        fetchAllUsers} = useStateContext();

    useEffect(() => {
    fetchAllUsers();
  }, [usersRef,searchTerm]);

    return loading ?
        <Loading /> :
    (
    <div className="content-wrapper">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AddNewUser/>
        <UserTable searchTerm={searchTerm}/>
    </div>
  );
}

export default UserDataManager;
