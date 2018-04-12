import React from "react";
const TableComponent = props => {
  return (
    <table className="patient-table" id="patient-table">
      <thead>
        <tr className="table-header">
          <th className="table-header">Patient Id</th>
          <th className="table-header">Battery Life</th>
          <th className="table-header">Last Seen </th>
          <th className="table-header">File Size </th>
          <th className="table-header">Params</th>
        </tr>
      </thead>
      <tbody>
        {/* map over the filteredPatients items to create table */}
        {props.patients
          ? props.patients.map((patient, i) =>
              <tr className="tr-table" key={i}>
                <td className="patient-details-col">
                  {patient.id}
                </td>
                <td className="patient-details-col">
                  {patient.battery}
                </td>
                <td className="patient-details-col">
                  {patient.last_seen}
                </td>
                <td className="patient-details-col">
                  {patient.file_size}
                </td>
                <td className="patient-details-col">
                  {patient.params}
                </td>
              </tr>
            )
          : ""}
      </tbody>
    </table>
  );
};
export default TableComponent;
