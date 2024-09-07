/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../../utils/auth';// Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: user.fbUser.displayName,
    email: user.fbUser.email,
    uid: user.uid,
    username: user.fbUser.displayName.replace(/\s/g, '').toLowerCase(),
    seller: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  useEffect(() => {
    // Set form values directly without using setFormData
    const nameInput = document.getElementById('formBasicName');
    const emailInput = document.getElementById('formBasicEmail');

    nameInput.value = user?.fbUser?.displayName || '';
    emailInput.value = user?.fbUser?.email || '';
  }, [user]);

  return (
    <div className="formLayout">
      <div className="imagePosition">
        <img src="/logo.png" alt="logo" className="registerlogo" />
      </div>
      <h2 style={{ marginBottom: '30px' }}>Create an Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="fullName" id="formBasicName" required placeholder="Enter your FullName" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" id="formBasicEmail" required placeholder="Enter your email" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Text className="text-muted">Information is grabbed when you first sign in with google.<br /></Form.Text>
          <Form.Text className="text-muted">Feel free to update the information as needed.</Form.Text>
        </Form.Group>
        <div className="registerButton">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    fbUser: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
