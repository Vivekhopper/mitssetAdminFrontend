import React, { useState } from 'react';
function AdminForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    reEnterPassword: '',
    adminPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.reEnterPassword) {
      alert("Passwords do not match");
      return;
    }
    const add_admin = { ...formData };
    console.log(add_admin);
    
  };
  

  return (
    <div className="admin-form-container">
      <h2>Add Admin Form</h2>
      <form onSubmit={handleSubmit} className='addAdminForm'>
        <div className="form-row">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="reEnterPassword">Re-enter Password:</label>
          <input
            type="password"
            id="reEnterPassword"
            name="reEnterPassword"
            value={formData.reEnterPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="adminPassword">Admin Password:</label>
          <input
            type="password"
            id="adminPassword"
            name="adminPassword"
            value={formData.adminPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminForm;
