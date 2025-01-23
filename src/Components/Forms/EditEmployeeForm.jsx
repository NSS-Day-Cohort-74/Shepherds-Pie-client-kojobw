import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRoleArray,
  getUserAndTheirRole,
  updateProfile,
} from "../../Services/employeeService";

export const EditEmployeeForm = () => {
  const [profile, setProfile] = useState({});
  const [roles, setRoles] = useState([]);

  const { userId } = useParams();

  const navigate=useNavigate()

  useEffect(() => {
    getUserAndTheirRole(userId).then((data) => {
      const userObj = data[0];
      setProfile(userObj);
    });
  }, [userId]);

  useEffect(() => {
    getRoleArray().then((roleArray) => {
      setRoles(roleArray);
    });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const editedProfile = {
      id: profile.id,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      isAvailable: profile.isAvailable,
      name: profile.name,
      roleId: profile.roleId,
    };

    updateProfile(editedProfile).then(() => {
      navigate("/employees");
    });
  };

  return (
    <form className="form-group">
      <h2>Update Profile for Employee #{profile.id}</h2>
      <fieldset>
        <div className="form-group">
          <label>
            Full Name:
            <input
              className="form-control"
              type="text"
              value={profile.name ? profile.name : ""}
              onChange={(event) => {
                const copy = { ...profile }; //creating a copy of state object. ... spreads all properties of employee
                copy.name = event.target.value; //setting the specialty
                setProfile(copy);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Address:
            <input
              className="form-control"
              type="text"
              value={profile.address ? profile.address : ""}
              onChange={(event) => {
                const copy = { ...profile }; //creating a copy of state object. ... spreads all properties of employee
                copy.address = event.target.value; //setting the specialty
                setProfile(copy);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Phone #:
            <input
              className="form-control"
              type="text"
              value={profile.phoneNumber ? profile.phoneNumber : ""}
              onChange={(event) => {
                const copy = { ...profile }; //creating a copy of state object. ... spreads all properties of employee
                copy.phoneNumber = event.target.value; //setting the specialty
                setProfile(copy);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              type="text"
              value={profile.email ? profile.email : ""}
              onChange={(event) => {
                const copy = { ...profile }; //creating a copy of state object. ... spreads all properties of employee
                copy.email = event.target.value; //setting the specialty
                setProfile(copy);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Role:
            <select
              value={profile.roleId}
              name="roleId"
              onChange={(event) => {
                const copy = { ...profile }; //creating a copy of state object. ... spreads all properties of employee
                copy[event.target.name] = event.target.value; //setting the specialty
                setProfile(copy);
              }}
            >
              <option value="Select a Role"> Select a Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={handleSave}>
            Save Post
          </button>
        </div>
      </fieldset>
    </form>
  );
};
