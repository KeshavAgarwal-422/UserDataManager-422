import React, { useEffect, useState } from "react";
import "./AddNewUser.css";
import { Country, State } from "country-state-city";
import genderOptions from "../Helpers/GenderOptions";
import { useStateContext } from "../ContextStore";

const AddNewUser = () => {

    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();

    const {
        newUser,
        setNewUser,
        addNewUserData
    } = useStateContext();

    const handleSubmit = () => {
        addNewUserData();
    }

    useEffect(() => {
        setStateData(State.getStatesOfCountry(newUser?.country?.[0]?.isoCode));
  }, [newUser?.country]);
    
    return (
        <>
            <form onSubmit={handleSubmit} className="inputs-container">
                <input
                    type="create"
                    placeholder="Name"
                    required
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="create"
                    placeholder="Email"
                    required
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="create"
                    placeholder="Mobile No."
                    required
                    value={newUser.mobileNo}
                    onChange={e => setNewUser({ ...newUser, mobileNo: e.target.value })}
                />
                <input
                    type="create"
                    placeholder="Age"
                    required
                    value={newUser.age}
                    onChange={e => setNewUser({ ...newUser, age: e.target.value })}
                />
                <select
                    className="select"
                    required
                    value={newUser.gender}
                    onChange={e => setNewUser({ ...newUser, gender: e.target.value })}
                    >
                    <option value="">Gender</option>
                    {genderOptions.map(option => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                </select>
                <select
                    className="select"
                    required
                    value={newUser.country?.[0]?.country}
                    onChange={e => {
                        setNewUser({
                            ...newUser, country: countryData?.filter((country) => country.name === e.target.value).map((country) => {
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
                <select
                    className="select"
                    required
                    value={newUser.state}
                    onChange={e => {
                        setNewUser({ ...newUser, state: e.target.value });
                    }}
                    >
                    <option value="">State</option>
                    {stateData?.map(option => (
                        <option key={option?.isoCode} value={option?.name}>
                        {option?.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Add New User</button>
            </form>
        </>
    );
};

export default AddNewUser;
