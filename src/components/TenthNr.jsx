import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';

const TenthClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [columnHeaders, setColumnHeaders] = useState([]);
  const [orientation, setOrientation] = useState('portrait');
  const [paperSize, setPaperSize] = useState('a4');

  // Additional exportable fields
  const optionalFields = [
    { label: 'Date of Joining', key: 'doj' },
    { label: 'Gender', key: 'gender' },
    { label: 'Date of Birth', key: 'dob' },
    { label: 'Caste', key: 'category' },
  ];

  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    axios
      .get(`https://hsbackendpkm.vercel.app/class/10`)
      .then((response) => {
        setClassDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleCheckboxChange = (fieldKey) => {
    setSelectedFields((prev) =>
      prev.includes(fieldKey)
        ? prev.filter((f) => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const handlePreview = () => {
    // Pass selected field headers for PDF
    const selectedHeaders = optionalFields
      .filter((field) => selectedFields.includes(field.key))
      .map((field) => field.label);

    navigate('/tenth/preview', {
      state: {
        classDetails,
        className: classDetails.class_name || `Class ${id}`,
        columnHeaders: selectedHeaders,
        selectedFieldKeys: selectedFields,
        orientation,
        paperSize,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (!classDetails || !classDetails.students || classDetails.students.length === 0) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        No students found for this class.
      </div>
    );
  }

  return (
    <div className="w-full px-5 md:px-10 py-8">
      <div className="bg-white rounded-md shadow-md border border-gray-300 w-full">
        <div className="bg-green-200 text-center py-4 border-b border-gray-900 rounded-t-md flex justify-center items-center gap-2">
          <GraduationCap className="text-gray-800 w-6 h-6" />
          <h3 className="text-xl font-bold text-gray-800">Class 10 - Student Details</h3>
          <GraduationCap className="text-gray-800 w-6 h-6" />
        </div>

        {/* Export field checkboxes */}
       

        {/* Button to navigate to preview page */}
        <div className="text-right px-5 py-3">
          <button onClick={handlePreview} className="btn btn-info btn-sm">
            Click me to Generate Registers
          </button>
        </div>

        <div className="overflow-x-auto p-5">
          <table className="table-auto w-full text-sm text-center">
            <thead className="bg-gray-100 sticky top-0 z-10 text-gray-700">
              <tr>
                <th className="border px-3 py-2">Admission No</th>
                <th className="border px-3 py-2">Surname</th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Date of Joining</th>
                <th className="border px-3 py-2">Gender</th>
                <th className="border px-3 py-2">Date of Birth</th>
                <th className="border px-3 py-2">Caste</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {classDetails.students.map((student) => (
                <tr key={student.adm_no} className="hover:bg-yellow-50">
                  <td className="border px-3 py-2">{student.adm_no}</td>
                  <td className="border px-3 py-2">{student.sur_name}</td>
                  <td className="border px-3 py-2">{student.name}</td>
                  <td className="border px-3 py-2">{student.doj}</td>
                  <td className="border px-3 py-2">{student.gender}</td>
                  <td className="border px-3 py-2">{student.dob}</td>
                  <td className="border px-3 py-2">{student.category}</td>
                  <td className="border px-3 py-2">
                    <button
                      onClick={() => navigate(`/Student/${student.adm_no}`)}
                      className="btn btn-sm bg-green-400 text-white hover:bg-green-500 shadow-none border-none"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenthClassDetail;
