import React, { Component, createContext } from 'react';
import {
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialBills,
  initialPrescriptions,
} from '../data/initialData';

// Create Context - demonstrates React Dataflow (State, Props)
export const AppContext = createContext();

// Class-based Context Provider - demonstrates Component API & Constructors
class AppProvider extends Component {
  constructor(props) {
    super(props);
    // State initialization in constructor - demonstrates Constructors & State
    this.state = {
      patients: initialPatients,
      doctors: initialDoctors,
      appointments: initialAppointments,
      bills: initialBills,
      prescriptions: initialPrescriptions,
      notification: null,
    };
  }

  // Notification helper
  showNotification = (message, type = 'success') => {
    this.setState({ notification: { message, type } });
    setTimeout(() => this.setState({ notification: null }), 3000);
  };

  // ---- Patient CRUD ----
  addPatient = (patient) => {
    const newPatient = { ...patient, id: Date.now() };
    this.setState(
      (prev) => ({ patients: [...prev.patients, newPatient] }),
      () => this.showNotification('Patient added successfully')
    );
  };

  updatePatient = (id, updated) => {
    this.setState(
      (prev) => ({
        patients: prev.patients.map((p) => (p.id === id ? { ...p, ...updated } : p)),
      }),
      () => this.showNotification('Patient updated successfully')
    );
  };

  deletePatient = (id) => {
    this.setState(
      (prev) => ({ patients: prev.patients.filter((p) => p.id !== id) }),
      () => this.showNotification('Patient deleted', 'danger')
    );
  };

  // ---- Doctor CRUD ----
  addDoctor = (doctor) => {
    const newDoctor = { ...doctor, id: Date.now(), patients: 0 };
    this.setState(
      (prev) => ({ doctors: [...prev.doctors, newDoctor] }),
      () => this.showNotification('Doctor added successfully')
    );
  };

  updateDoctor = (id, updated) => {
    this.setState(
      (prev) => ({
        doctors: prev.doctors.map((d) => (d.id === id ? { ...d, ...updated } : d)),
      }),
      () => this.showNotification('Doctor updated successfully')
    );
  };

  deleteDoctor = (id) => {
    this.setState(
      (prev) => ({ doctors: prev.doctors.filter((d) => d.id !== id) }),
      () => this.showNotification('Doctor removed', 'danger')
    );
  };

  // ---- Appointment CRUD ----
  addAppointment = (appt) => {
    const newAppt = { ...appt, id: Date.now() };
    this.setState(
      (prev) => ({ appointments: [...prev.appointments, newAppt] }),
      () => this.showNotification('Appointment booked successfully')
    );
  };

  updateAppointment = (id, updated) => {
    this.setState(
      (prev) => ({
        appointments: prev.appointments.map((a) => (a.id === id ? { ...a, ...updated } : a)),
      }),
      () => this.showNotification('Appointment updated')
    );
  };

  deleteAppointment = (id) => {
    this.setState(
      (prev) => ({ appointments: prev.appointments.filter((a) => a.id !== id) }),
      () => this.showNotification('Appointment cancelled', 'danger')
    );
  };

  // ---- Billing CRUD ----
  addBill = (bill) => {
    const newBill = { ...bill, id: Date.now() };
    this.setState(
      (prev) => ({ bills: [...prev.bills, newBill] }),
      () => this.showNotification('Bill created successfully')
    );
  };

  updateBill = (id, updated) => {
    this.setState(
      (prev) => ({
        bills: prev.bills.map((b) => (b.id === id ? { ...b, ...updated } : b)),
      }),
      () => this.showNotification('Bill updated')
    );
  };

  deleteBill = (id) => {
    this.setState(
      (prev) => ({ bills: prev.bills.filter((b) => b.id !== id) }),
      () => this.showNotification('Bill deleted', 'danger')
    );
  };

  // ---- Prescription CRUD ----
  addPrescription = (rx) => {
    const newRx = { ...rx, id: Date.now() };
    this.setState(
      (prev) => ({ prescriptions: [...prev.prescriptions, newRx] }),
      () => this.showNotification('Prescription added successfully')
    );
  };

  updatePrescription = (id, updated) => {
    this.setState(
      (prev) => ({
        prescriptions: prev.prescriptions.map((r) => (r.id === id ? { ...r, ...updated } : r)),
      }),
      () => this.showNotification('Prescription updated')
    );
  };

  deletePrescription = (id) => {
    this.setState(
      (prev) => ({ prescriptions: prev.prescriptions.filter((r) => r.id !== id) }),
      () => this.showNotification('Prescription deleted', 'danger')
    );
  };

  render() {
    const value = {
      ...this.state,
      addPatient: this.addPatient,
      updatePatient: this.updatePatient,
      deletePatient: this.deletePatient,
      addDoctor: this.addDoctor,
      updateDoctor: this.updateDoctor,
      deleteDoctor: this.deleteDoctor,
      addAppointment: this.addAppointment,
      updateAppointment: this.updateAppointment,
      deleteAppointment: this.deleteAppointment,
      addBill: this.addBill,
      updateBill: this.updateBill,
      deleteBill: this.deleteBill,
      addPrescription: this.addPrescription,
      updatePrescription: this.updatePrescription,
      deletePrescription: this.deletePrescription,
      showNotification: this.showNotification,
    };

    // Demonstrates passing value via Props through Context Provider
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
