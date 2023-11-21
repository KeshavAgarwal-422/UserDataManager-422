import React from "react";
import { createContext, useContext, useState } from "react";
import { db } from "../Firebase/Config";
import {
    collection,
    getDocs,
    setDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { showToast } from "../Helpers/Toast"

const stateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", mobileNo: "", age: "", gender: "", country: {}, state: "" });
    const [editingUser, setEditingUser] = useState(null);
    const [editedUserData, setEditedUserData] = useState({
        name: "",
        email: "",
        mobileNo: "",
        age: "",
        gender: "",
        country: {},
        state: ""
    });

    const usersRef = collection(db, "users");

    const fetchAllUsers = async () => {
        try {
            const querySnapshot = await getDocs(usersRef);
            const userData = [];
            querySnapshot.forEach((doc) => {
                userData.push({ id: doc.id, ...doc.data() });
            });
            setUsers(userData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showToast("error", `${error}`);
        }
    };

    const addNewUserData = async () => {
        if (newUser.name && newUser.email && newUser.age && newUser.gender && newUser.state) {
            try {
                setLoading(true);
                const docRef = doc(usersRef);
                await setDoc(docRef, newUser);
                setNewUser({ name: "", email: "", mobileNo: "", age: "", gender: "", state: "", country: "" });
                setLoading(false);
                showToast("success", "User data added successfully");
            } catch (error) {
                setLoading(false);
                showToast("error", `${error}`);
            }
        }
    };

    const updateUserData = (user) => {
        setEditingUser(user.id);
        setEditedUserData({
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            age: user.age,
            gender: user.gender,
            country: user.country,
            state: user.state
        });
    };

    const saveUpdatedUserData = (user) => {
        setLoading(true);
        const updatedUserData = { ...user, ...editedUserData };
        const userDocRef = doc(usersRef, user.id);
        setDoc(userDocRef, updatedUserData, { merge: true });
        setEditingUser(null);
        setLoading(false);
        showToast("success", "User data updated successfully");
    };

    const cancelUserUpdate = () => {
        setEditingUser(null);
    };

    const deleteUserData = async (id) => {
        try {
            setLoading(true);
            const userDocRef = doc(usersRef, id);
            await deleteDoc(userDocRef);
            setLoading(false);
            showToast("success", "User data deleted successfully");
        } catch (error) {
            setLoading(false);
            showToast("error", `${error}`);
        }
    };

    return (
        <stateContext.Provider
            value={{
                usersRef,
                loading,
                users,
                setUsers,
                newUser,
                setNewUser,
                editedUserData,
                setEditedUserData,
                editingUser,
                setEditingUser,
                fetchAllUsers,
                addNewUserData,
                updateUserData,
                saveUpdatedUserData,
                cancelUserUpdate,
                deleteUserData
            }}
        >
            {children}
        </stateContext.Provider>
    );
};
export const useStateContext = () => useContext(stateContext);