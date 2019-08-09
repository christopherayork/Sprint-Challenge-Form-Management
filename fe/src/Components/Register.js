import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 60%;
`;

const BE = 'http://localhost:5000/api/register';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      tos: false
    };
    this.values = props.values;
    this.errors = props.errors;
    this.touched = props.touched;
    this.isSubmitting = props.isSubmitting;
    this.status = props.status;
  }

  render() {
    return (
        <FormContainer>
          <Form>
            <div>
              {this.touched.username && this.errors.username && <p>{this.errors.username}</p>}
              <Field type='text' name='username' placeholder='Username' />
            </div>
            <div>
              {this.touched.password && this.errors.password && <p>{this.errors.password}</p>}
              <Field type='password' name='password' placeholder='Password' />
            </div>
            <label>
              <Field type='checkbox' name='tos' checked={this.values.checked} />
              Accept TOS
            </label>
            <br />
            <button disabled={this.isSubmitting}>Register</button>
          </Form>
        </FormContainer>
    );
  }
}

const FormikRegister = withFormik({
  mapPropsToValues({username, password, tos}) {
    return {
      username: username || '',
      password: password || '',
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
        .min(6, "Username must be at least 6 characters in length")
        .required("You must enter a username"),
    password: Yup.string()
        .min(6, "Your password must be at least 6 characters long")
        .required("You must enter a password"),
    tos: Yup.bool()
        .isValid(true)
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus, props }) {
    console.log(values);
    const user = {username: values.username, password: values.password};
    console.log(user);
    axios.post(BE, user)
        .then(res => {
          console.log(res.data);
          setStatus(res.data);
          setSubmitting(false);
          resetForm();
          props.setLastUpdate(Date.now());
        })
        .catch(err => {
          console.error(err);
          setErrors(err);
          setSubmitting(false);
        });
  }
})(RegisterForm);

export default FormikRegister;