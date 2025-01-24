import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRoleArray,
  getUserAndTheirRole,
  updateProfile,
} from "../../Services/employeeService";
import "./Forms.css";

export const EditEmployeeForm = () => {
  const [profile, setProfile] = useState({});
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({}); // State to store error messages

  const { userId } = useParams();

  const navigate = useNavigate();

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

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    //check if all fields are filled
    if (
      !profile.name ||
      !profile.address ||
      !profile.phoneNumber ||
      !profile.email ||
      !profile.roleId
    ) {
      formErrors.required = "All fields are required";
      isValid = false;
    }

    // Validate phone number (no letters)
    if (profile.phoneNumber && /[a-zA-Z]/.test(profile.phoneNumber)) {
      formErrors.phoneNumber = "Phone number should not contain letters.";
      isValid = false;
    }
    //Validate name(no numbers)
    if (profile.name && /\d/.test(profile.name)) {
      //profile.name&& checks if it exists and is not empty sting or null or undefined,
      // \d is a shorthand character class in regular expressions that matches any digit (0 through 9).
      // The regular expression /\d/ will match any occurrence of a single digit anywhere in the string.
      formErrors.name = "Name should not contain numbers.";
      isValid = false;
    }
    // Validate email format
    if (
      profile.email &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(profile.email)
    ) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    //Validate role selection
    if (profile.roleId === "Select a Role" || !profile.roleId) {
      formErrors.roleId = "Please select a role.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSave = (event) => {
    event.preventDefault();
    // Validate the form before saving
    if (!validateForm()) {
      return; // Don't submit the form if validation fails
    }

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
      // Show confirmation alert after saving the profile
      const isConfirmed = window.confirm("Changes have been saved");
      if (isConfirmed) {
        navigate("/employees");
      }
    });
  };

  return (
    <form className="form-group">
      <h2>🍕Update Profile for Employee #{profile.id}🍕</h2>
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
          {errors.name && <span className="error">{errors.name}</span>}
          {errors.required && !profile.name && (
            <span className="error">{errors.required}</span>
          )}
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
          {errors.required && !profile.address && (
            <span className="error">{errors.required}</span>
          )}
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
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
          {errors.required && !profile.phoneNumber && (
            <span className="error">{errors.required}</span>
          )}
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
          {errors.email && <span className="error">{errors.email}</span>}
          {errors.required && !profile.email && (
            <span className="error">{errors.required}</span>
          )}
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
          {errors.roleId && <span className="error">{errors.roleId}</span>}
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
