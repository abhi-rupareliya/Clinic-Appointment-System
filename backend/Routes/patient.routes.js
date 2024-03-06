const express = require("express");
const {
  patientController: {
    createPatient,
    updatePatient,
    deletePatient,
    getPatient,
    getPatients,
  },
} = require("../Controllers");

const router = express.Router();
router.get("/", getPatients);
router.get("/:id", getPatient);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;
