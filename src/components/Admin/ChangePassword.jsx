import React, { useState } from 'react';

function AdminForm() {
  const [formData, setFormData] = useState({
    username: '',
    oldpassword: '',
    newpassword: '',
    reEnterPassword: ''
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
    if (formData.newpassword !== formData.reEnterPassword) {
      alert("Passwords do not match");
      return;
    }
    const add_admin = { ...formData };
    console.log(add_admin);
    
  };
  

  return (
    <div className="admin-form-container">
      <h2>Change Password</h2>
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
          <label htmlFor="oldpassword">Old Password:</label>
          <input
            type="password"
            id="oldpassword"
            name="oldpassword"
            value={formData.oldpassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="newpassword">New Password:</label>
          <input
            type="password"
            id="newpassword"
            name="newpassword"
            value={formData.newpassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="reEnterPassword">Re-enter New Password:</label>
          <input
            type="password"
            id="reEnterPassword"
            name="reEnterPassword" // Corrected the name attribute here
            value={formData.reEnterPassword}
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
