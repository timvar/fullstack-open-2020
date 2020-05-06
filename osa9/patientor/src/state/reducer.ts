import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export const SET_PATIENT_LIST ="SET_PATIENT_LIST";
export const ADD_PATIENT = "ADD_PATIENT";
export const SET_DIAGNOSIS_LIST = "SET_DIAGNOSIS_LIST";

interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

interface SetDiagnosisListAction {
  type: typeof SET_DIAGNOSIS_LIST;
  payload: Diagnosis[];
}

export type Action = SetPatientListAction | AddPatientAction | SetDiagnosisListAction;

export function setPatientList(patientList: Patient[]): Action {
  return {
    type: SET_PATIENT_LIST,
    payload: patientList
  };
}

export function setDiagnosisList(diagnosisList: Diagnosis[]): Action {
  return {
    type: SET_DIAGNOSIS_LIST,
    payload: diagnosisList
  };
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case SET_DIAGNOSIS_LIST:
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
