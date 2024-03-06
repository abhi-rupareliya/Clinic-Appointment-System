const express = require("express");
const {
  appointmentController: {
    getAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  },
} = require("../Controllers");
const { getAppointmentByPatient } = require("../Controllers/appointment.controller");

const router = express.Router();
router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/p/:pid", getAppointmentByPatient);

module.exports = router;
