import React, { useEffect, useState } from "react";
import "./UserTable.css";
import { Country, State } from "country-state-city";
import { useStateContext } from "../ContextStore";
import genderOptions from "../Helpers/GenderOptions";

const UserTable = ({ searchTerm }) => {

    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();

    const {
        users,
        editedUserData,
        setEditedUserData,
        editingUser,
        updateUserData,
        saveUpdatedUserData,
        cancelUserUpdate,
        deleteUserData } = useStateContext();   
    
    
    useEffect(() => {
        setStateData(State.getStatesOfCountry(editedUserData?.country?.[0]?.isoCode));
  }, [editedUserData?.country]);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th className="header">Name</th>
                        <th className="header">Email</th>
                        <th className="header">Mobile No.</th>
                        <th className="header">Age</th>
                        <th className="header">Gender</th>
                        <th className="header">Country</th>
                        <th className="header">State</th>
                        <th className="header">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter((user) =>
                            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.mobileNo.includes(searchTerm.toLowerCase()) ||
                            user.age.toString().includes(searchTerm) ||
                            user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.country?.[0]?.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.state.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((user) => (
                            <tr key={user.id}>
                                <td>
                                    {editingUser === user.id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.name}
                                            onChange={e => setEditedUserData({ ...editedUserData, name: e.target.value })}
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td>
                                    {editingUser === user.id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.email}
                                            onChange={e => setEditedUserData({ ...editedUserData, email: e.target.value })}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editingUser === user.id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.mobileNo}
                                            onChange={e => setEditedUserData({ ...editedUserData, mobileNo: e.target.value })}
                                        />
                                    ) : (
                                        user.mobileNo
                                    )}
                                </td>
                                <td>
                                    {editingUser === user.id ? (
                                        <input
                                            type="text"
                                            value={editedUserData.age}
                                            onChange={e => setEditedUserData({ ...editedUserData, age: e.target.value })}
                                        />
                                    ) : (
                                        user.age
                                    )}
                                </td>
                                <td>
                                    {editingUser === user.id ? (
                                      <select
                                        className="select"
                                        value={editedUserData.gender}
                                        onChange={e => setEditedUserData({ ...editedUserData, gender: e.target.value })}
                                        >
                                        <option value="">Gender</option>
                                        {genderOptions.map(option => (
                                            <option key={option} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                    </select>
                                    ) : (
                                        user.gender
                                    )}
                                </td>
                                <td>
                                    {editingUser === user.id ? (
                                        <select
                                        value={editedUserData.country?.[0]?.country}
                                        onChange={e => {
                                            setEditedUserData({
                                                ...editedUserData, country: countryData?.filter((country) => country.name === e.target.value).map((country) => {
                                                    return {
                                                        country: country?.name,
                                                        isoCode:country?.isoCode
                                            } })})
                                        }}
                                        >
                                        <option value="">Country</option>
                                        {countryData?.map(option => (
                                            <option key={option?.isoCode} value={option?.name}>
                                            {option?.name}
                                            </option>
                                        ))}
                                </select>
                                    ) : (
                                        user.country?.[0]?.country
                                    )}
                                 </td>
                                <td>
                                    {editingUser === user.id ? (
                                         <select
                    value={editedUserData.state}
                    onChange={e => {
                        setEditedUserData({ ...editedUserData, state: e.target.value });
                    }}
                    >
                    <option value="">Select State</option>
                    {stateData?.map(option => (
                        <option key={option?.isoCode} value={option?.name}>
                        {option?.name}
                        </option>
                    ))}
                </select>
                                    ) : (
                                        user.state
                                    )}
                                </td>
                                <td>
                                    {editingUser === user.id ? (
                                        <>
                                            <button onClick={() => saveUpdatedUserData(user)}>
                                               Save
                                            </button>
                                            <button onClick={cancelUserUpdate}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => updateUserData(user)}>
                                                Edit
                                            </button>
                                            <button onClick={() => deleteUserData(user.id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default UserTable;
