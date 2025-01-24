import "./EmployeeList.css";

export const Employee = ({ employee }) => {
  return (
    <div className="employee">
      <h2>Employee #{employee.id}</h2>
      <div className="employee-info">
        <div>
          Employee Name: <span>{employee.name}</span>
        </div>
        <div>
          Employee Role: <span>{employee.role.name}</span>
        </div>
      </div>
      <div>
        <div className="employee-contacts">
          Employee Contacts:
          <div>
            phone # <span>{employee.phoneNumber}</span>
          </div>
          <div>
            email: <span>{employee.email}</span>
          </div>
          <div>
            address: <span>{employee.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
