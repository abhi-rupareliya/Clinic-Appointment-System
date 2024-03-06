import React from "react";
// import Logo from "../Images/logo.png";

// Custom component for printing prescription
const PrintPrescriptionComponent = ({
  prescriptionData,
  data,
  diagnosis,
  treatments,
}) => {
  console.warn(data);
  return (
    <>
      {/* <img src="../Images/logo.png" alt="ADC" /> */}
      <div
        className='mainHeader'
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2%",
        }}
      >
        <div
          className='leftClinicInfo'
          style={{
            display: "flex",
            width: "50%",
            fontSize: "1.2rem",
          }}
        >
          <div className='docInfo'>
            <span style={{ color: "darkblue", fontSize: "1.3rem" }}>
              <b>Dr. Shailesh Pateliya</b>
            </span>
            <div>B.D.S.</div>
            <div>+91-9265066366</div>
          </div>
        </div>
        <div
          className='rightClinicInfo'
          style={{
            width: "50%",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <span style={{ color: "darkblue", fontSize: "1.3rem" }}>
              <b>Ashirwad Dental Hospital</b>
            </span>
            <div>Nr. Old bus stand, beside Asha novelty,</div>
            <div>Maruti nagar, Vadiya.</div>
          </div>
        </div>
      </div>
      <hr style={{ borderStyle: "solid" }} />
      <div
        className='Date'
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2%",
          fontSize: "1.25rem",
        }}
      >
        <b>Date : {new Date(data.timestamp).toLocaleDateString() || "N/A"}</b>
      </div>
      <div
        className='PatientInfo'
        style={{
          marginBottom: "3%",
        }}
      >
        <div
          className='PatientName'
          style={{ width: "50%", fontSize: "1.2rem", marginBottom: "1%" }}
        >
          Name:
          <div>
            <span>
              <b>
                {data ? data.patient.name : "N/A"}(
                {data ? data.patient.gender.charAt(0).toUpperCase() : "-"})
              </b>
            </span>
          </div>
        </div>

        <div
          className='PatientAge'
          style={{ width: "50%", fontSize: "1.2rem", marginBottom: "1%" }}
        >
          Age:
          <div>
            <span>
              <b>{data ? data.patient.age : "-"}</b>
            </span>
          </div>
        </div>

        <div
          className='PatientNumber'
          style={{ width: "50%", fontSize: "1.2rem", marginBottom: "1%" }}
        >
          Mobile Number:
          <div>
            <span>
              <b>{data ? data.patient.phone : "-"}</b>
            </span>
          </div>
        </div>

        <div
          className='PatientAddress'
          style={{ width: "50%", fontSize: "1.2rem", marginBottom: "1%" }}
        >
          Address:
          <div>
            <span>
              <b>{data ? data.patient.address : "-"}</b>
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          marginBottom: "2%",
        }}
      >
        <hr
          style={{
            borderStyle: "solid",
          }}
        />
        <div
          className='Diagnosis'
          style={{ width: "50%", fontSize: "1.2rem", marginBottom: "1%" }}
        >
          Diagnosis
          <div>
            <span>
              <b>{diagnosis ? diagnosis : "-"}</b>
            </span>
          </div>
        </div>
      </div>
      <div
        className='Treatment'
        style={{ width: "50%", fontSize: "1.2rem", marginBottom: "1%" }}
      >
        Treatment
        <div>
          <span>
            <b>{treatments ? treatments : "-"}</b>
          </span>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "5%",
          fontSize: "1.25rem",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "8px",
                borderTop: "3px solid black",
                borderBottom: "3px solid black",
                textAlign: "left",
              }}
            >
              Medicine Name
            </th>
            <th
              style={{
                padding: "8px",
                borderTop: "3px solid black",
                borderBottom: "3px solid black",
                textAlign: "left",
              }}
            >
              Dosage
            </th>
            <th
              style={{
                padding: "8px",
                borderTop: "3px solid black",
                borderBottom: "3px solid black",
                textAlign: "left",
              }}
            >
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {prescriptionData ? (
            prescriptionData.map((prescription) =>
              prescription? (
                <tr key={prescription.id}>
                  <td style={{ padding: "8px" }}>{prescription.name}</td>
                  <td style={{ padding: "8px" }}>{prescription.day}</td>
                  <td style={{ padding: "8px" }}>
                    {prescription.morning ? "1 " : " 0 "}-
                    {prescription.afternoon ? " 1 " : " 0 "}-
                    {prescription.night ? " 1 " : " 0"}
                    <br />
                    {prescription.whentotake} meal
                  </td>
                </tr>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <hr style={{ borderStyle: "solid" }} />
      <div
        className='lastPart'
        style={{
          height: "100%",
          verticalAlign: "text-bottom",
          marginTop: "15%",
        }}
      >
        <div
          className='regards'
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "1.3rem",
          }}
        >
          <b>Dr. Shailesh Pateliya</b>
        </div>
        <div
          className='degree'
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "1.3rem",
          }}
        >
          B.D.S.
        </div>
      </div>
    </>
  );
};

export default PrintPrescriptionComponent;
