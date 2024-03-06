const db = require("../Database/config");
const Patient = db.Patient;

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      order: [["date_registration", "DESC"]],
    });
    if (patients.length === 0) {
      return res.status(404).json({ error: "No patients found" });
    }
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const { name, gender, age, address, email, phone, date_registration } =
      req.body;
    const newPatient = await Patient.create({
      name,
      gender,
      email,
      age,
      address,
      phone,
      date_registration,
    });
    return res.status(201).json(newPatient.dataValues);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({ errors: validationErrors });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { name, gender, age, address, email, phone, date_registration } =
      req.body;
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const updatedPatient = await patient.update({
      name: name || patient.name,
      gender: gender || patient.gender,
      age: age || patient.age,
      address: address || patient.address,
      email: email || patient.email,
      phone: phone || patient.phone,
      date_registration: date_registration || patient.date_registration,
    });

    return res.status(200).json(updatedPatient);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({ errors: validationErrors });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    await patient.destroy();
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
