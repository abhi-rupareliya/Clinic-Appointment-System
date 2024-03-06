const db = require("../Database/config");
const Patient = require("../Models/Patient");
const Appointment = db.Appointment;
const { getIo } = require("../Services/socket.services");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { status: "pending" },
      order: [["timestamp", "DESC"]],
      include: [
        {
          model: db.Patient,
        },
        {
          model: db.Prescription,
        },
      ],
    });
    if (appointments.length === 0) {
      return res.status(404).json({ error: "No appointments found" });
    }
    return res.status(200).json(appointments);
  } catch (error) {
    console.warn(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    // also get patient name and number from patient model
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: db.Patient,
        },
        {
          model: db.Prescription,
        },
      ],
    });
    if (!appointment) {
      return res.status(404).json({ error: "No appointment found" });
    }
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const {
      patient,
      dentist,
      status,
      timestamp,
      diagnosis,
      treatment,
      remarks,
      prescription,
    } = req.body;
    const appointment = new Appointment({
      patient,
      dentist,
      status,
      timestamp,
      diagnosis,
      treatment,
      remarks,
      prescription,
    });

    await appointment.save();
    const io = getIo();
    await io.emit("appointment", appointment);
    return res.status(201).json(appointment);
  } catch (error) {
    console.warn(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateAppointment = async (req, res) => {
  let transaction;
  try {
    const {
      patient,
      dentist,
      status,
      timestamp,
      diagnosis,
      treatment,
      remarks,
      prescription,
    } = req.body;

    // Begin a transaction
    transaction = await db.sequelize.transaction();

    const appointment = await Appointment.findByPk(req.params.id, {
      transaction,
    });
    if (!appointment) {
      return res.status(404).json({ error: "No appointment found" });
    }

    // Update appointment fields
    appointment.patient = patient || appointment.patient;
    appointment.dentist = dentist || appointment.dentist;
    appointment.status = status || appointment.status;
    appointment.timestamp = timestamp || appointment.timestamp;
    appointment.diagnosis = diagnosis || appointment.diagnosis;
    appointment.treatment = treatment || appointment.treatment;
    appointment.remarks = remarks || appointment.remarks;

    // Save the updated appointment within the transaction
    await appointment.save({ transaction });
    // Delete existing prescriptions associated with the appointment
    await db.Prescription.destroy({
      where: { appointment: appointment._id },
      transaction,
    });
    // Create new prescriptions associated with the appointment
    if (prescription && prescription.length > 0) {
      await db.Prescription.bulkCreate(
        prescription.map((presc) => ({
          ...presc,
          appointment: appointment._id,
        })),
        { transaction }
      );
    }
    // Commit the transaction
    await transaction.commit();
    // Emit appointment event
    const io = getIo();
    io.emit("appointment", appointment);
    return res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    if (transaction) await transaction.rollback();
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "No appointment found" });
    }
    await appointment.destroy();
    const io = getIo();
    io.emit("appointment", appointment);
    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAppointmentByPatient = async (req, res) => {
  try {
    try {
      const appointments = await Appointment.findAll({
        where: { patient: req.params.pid },
        order: [["timestamp", "DESC"]],
        include: [
          {
            model: db.Patient,
          },
          {
            model: db.Prescription,
          },
        ],
      });
      if (appointments.length === 0) {
        return res.status(404).json({ error: "No appointments found" });
      }
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
