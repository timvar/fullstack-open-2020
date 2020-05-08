import React from 'react';
import { Formik, Form, Field } from 'formik';
import {Props} from '../types';
import { Grid, Button } from "semantic-ui-react";
import {DiagnosisSelection, TextField, NumberField} from '../AddPatientModal/FormField';
import { useStateValue } from "../state";


const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      date: '',
      specialist: '',
      type: 'HealthCheck',
      description: '',
      healthCheckRating: 0,
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.healthCheckRating < 0) {
          errors.description = requiredError;
        }
        
        return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          <Field
            label='Date'
            placeholder='YYYY-MM-DD'
            name='date'
            component={TextField}
          />
          <Field
            label='Specialist'
            placeholder='Specialist'
            name='specialist'
            component={TextField}
          />
          <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
          />
          <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    

          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>

        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;
