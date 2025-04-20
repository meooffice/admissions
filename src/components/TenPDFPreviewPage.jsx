import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from './generateTenPDF';

const PreviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        classDetails,
        className = '',
        columnHeaders = ['Extra 1', 'Extra 2'],
        orientation = 'portrait',
        paperSize = 'a4',
    } = location.state || {};

    const [extraColumns, setExtraColumns] = useState(columnHeaders);
    const [extraColumnHeaders, setExtraColumnHeaders] = useState(columnHeaders.map(() => ''));
    const [selectedOrientation, setSelectedOrientation] = useState(orientation);
    const [selectedPaperSize, setSelectedPaperSize] = useState(paperSize);
    const [registerName, setRegisterName] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

    // Optional fields state
    const [includeDateOfJoining, setIncludeDateOfJoining] = useState(false);
    const [includeGender, setIncludeGender] = useState(false);
    const [includeDOB, setIncludeDOB] = useState(false);
    const [includeCaste, setIncludeCaste] = useState(false);
    const [includeAdhar, setIncludeAdhar] = useState(false);
    const [includeMoles, setIncludeMoles] = useState(false);
    const [includeFatherName, setIncludeFatherName] = useState(false);
    const [includeMotherName, setIncludeMotherName] = useState(false);
    const [includeMobileNo, setIncludeMobileNo] = useState(false);
    const [includeGuardian, setIncludeGuardian] = useState(false);

    const handleAddColumn = () => {
        setExtraColumns([...extraColumns, `Extra ${extraColumns.length + 1}`]);
        setExtraColumnHeaders([...extraColumnHeaders, '']);
    };

    const handleRemoveColumn = (index) => {
        const newColumns = [...extraColumns];
        const newHeaders = [...extraColumnHeaders];
        newColumns.splice(index, 1);
        newHeaders.splice(index, 1);
        setExtraColumns(newColumns);
        setExtraColumnHeaders(newHeaders);
    };

    const handleColumnHeaderChange = (index, value) => {
        const newHeaders = [...extraColumnHeaders];
        newHeaders[index] = value;
        setExtraColumnHeaders(newHeaders);
    };

    const handleGeneratePDF = () => {
        try {
            generatePDF(
                extraColumnHeaders,
                classDetails.students,
                selectedOrientation,
                selectedPaperSize,
                {
                    className,
                    registerName,
                    includeDateOfJoining,
                    includeGender,
                    includeDOB,
                    includeCaste,
                    includeAdhar,
                    includeMoles,
                    includeFatherName,
                    includeMotherName,
                    includeMobileNo,
                    includeGuardian
                }
            );
            setToastMessage('✅ PDF generated successfully!');
            setToastType('alert-success');
        } catch (err) {
            console.error('PDF generation failed:', err);
            setToastMessage('❌ PDF generation failed. Check console for details.');
            setToastType('alert-error');
        }

        setTimeout(() => {
            setToastMessage('');
            setToastType('');
        }, 3000);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-1">
                10th - Student Details
            </h2>

            {/* Register Name */}
            <div className="text-center mb-2">
                <label className="text-sm font-semibold mr-2">Register Name:</label>
                <input
                    type="text"
                    className="input input-bordered input-sm w-64"
                    placeholder="e.g. Attendance Register"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                />
            </div>

            {/* PDF Options */}
            <p className="text-center text-sm text-gray-600 mb-4">
                Orientation: <strong>{selectedOrientation}</strong> | Paper Size: <strong>{selectedPaperSize}</strong>
            </p>

            {/* Add/Remove Column Buttons */}
            <div className="mb-4 text-center">
                <button onClick={handleAddColumn} className="btn btn-primary btn-outline btn-sm mr-2">
                    Add Extra Column
                </button>
                {extraColumns.length > 0 && (
                    <button
                        onClick={() => handleRemoveColumn(extraColumns.length - 1)}
                        className="btn btn-error btn-outline btn-sm text-red-600 border-red-600"
                    >
                        Remove Last Column
                    </button>
                )}
            </div>

            {/* Column Header Inputs */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-center">
                {extraColumns.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 justify-center">
                        <label className="text-sm">Col {index + 1}:</label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full max-w-xs"
                            value={extraColumnHeaders[index]}
                            onChange={(e) => handleColumnHeaderChange(index, e.target.value)}
                            placeholder={`Header for ${extraColumns[index]}`}
                        />
                    </div>
                ))}
            </div>

            {/* Orientation & Paper Size */}
            <div className="mb-4 flex flex-wrap justify-center gap-8">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <label className="whitespace-nowrap font-medium">Orientation:</label>
                    <select
                        className="select select-bordered select-sm"
                        value={selectedOrientation}
                        onChange={(e) => setSelectedOrientation(e.target.value)}
                    >
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <label className="whitespace-nowrap font-medium">Paper Size:</label>
                    <select
                        className="select select-bordered select-sm"
                        value={selectedPaperSize}
                        onChange={(e) => setSelectedPaperSize(e.target.value)}
                    >
                        <option value="a4">A4</option>
                        <option value="legal">Legal</option>
                    </select>
                </div>
            </div>

            {/* Optional Fields Checkboxes */}
            <div className="mb-4 flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="dateOfJoining"
                        checked={includeDateOfJoining}
                        onChange={(e) => setIncludeDateOfJoining(e.target.checked)}
                    />
                    <label htmlFor="dateOfJoining" className="text-sm">Include Date of Joining</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="gender"
                        checked={includeGender}
                        onChange={(e) => setIncludeGender(e.target.checked)}
                    />
                    <label htmlFor="gender" className="text-sm">Include Gender</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="dob"
                        checked={includeDOB}
                        onChange={(e) => setIncludeDOB(e.target.checked)}
                    />
                    <label htmlFor="dob" className="text-sm">Include Date of Birth</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="caste"
                        checked={includeCaste}
                        onChange={(e) => setIncludeCaste(e.target.checked)}
                    />
                    <label htmlFor="caste" className="text-sm">Include Caste</label>
                </div>

                {/* New Optional Fields */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="adhar"
                        checked={includeAdhar}
                        onChange={(e) => setIncludeAdhar(e.target.checked)}
                    />
                    <label htmlFor="adhar" className="text-sm">Include Aadhar Number</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="moles"
                        checked={includeMoles}
                        onChange={(e) => setIncludeMoles(e.target.checked)}
                    />
                    <label htmlFor="moles" className="text-sm">Include Identifying Marks</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="fatherName"
                        checked={includeFatherName}
                        onChange={(e) => setIncludeFatherName(e.target.checked)}
                    />
                    <label htmlFor="fatherName" className="text-sm">Include Father's Name</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="motherName"
                        checked={includeMotherName}
                        onChange={(e) => setIncludeMotherName(e.target.checked)}
                    />
                    <label htmlFor="motherName" className="text-sm">Include Mother's Name</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="mobileNo"
                        checked={includeMobileNo}
                        onChange={(e) => setIncludeMobileNo(e.target.checked)}
                    />
                    <label htmlFor="mobileNo" className="text-sm">Include Mobile Number</label>
                </div>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border text-sm text-center">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Adm No</th>
                            <th className="border px-2 py-1">Name</th>
                            {/* ✅ Optional fields first */}
                            {includeDateOfJoining && <th className="border px-2 py-1">Date of Joining</th>}
                            {includeGender && <th className="border px-2 py-1">Gender</th>}
                            {includeDOB && <th className="border px-2 py-1">Date of Birth</th>}
                            {includeCaste && <th className="border px-2 py-1">Caste</th>}
                            {includeAdhar && <th className="border px-2 py-1">Aadhar Number</th>}
                            {includeMoles && <th className="border px-2 py-1">Identifying Marks</th>}
                            {includeFatherName && <th className="border px-2 py-1">Father's Name</th>}
                            {includeMotherName && <th className="border px-2 py-1">Mother's Name</th>}
                            {includeMobileNo && <th className="border px-2 py-1">Mobile Number</th>}
                            
                            {/* Extra fields next */}
                            {extraColumnHeaders.map((header, i) => (
                                <th key={i} className="border px-2 py-1">{header || `${i + 1}`}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {classDetails.students.map((student) => (
                            <tr key={student.adm_no}>
                                <td className="border px-2 py-1">{student.adm_no}</td>
                                <td className="border px-2 py-1">{student.sur_name} {student.name}</td>
                                {/* Optional fields */}
                                {includeDateOfJoining && <td className="border px-2 py-1">{student.doj}</td>}
                                {includeGender && <td className="border px-2 py-1">{student.gender}</td>}
                                {includeDOB && <td className="border px-2 py-1">{student.dob}</td>}
                                {includeCaste && <td className="border px-2 py-1">{student.category}</td>}
                                {includeAdhar && <td className="border px-2 py-1">{student.st_adhar}</td>}
                                {includeMoles && <td className="border px-2 py-1">{student.moles}</td>}
                                {includeFatherName && <td className="border px-2 py-1">{student.father_name}</td>}
                                {includeMotherName && <td className="border px-2 py-1">{student.mother_name}</td>}
                                {includeMobileNo && <td className="border px-2 py-1">{student.mobile_no}</td>}
                                {/* Extra columns */}
                                {extraColumns.map((_, i) => (
                                    <td key={i} className="border px-2 py-1"></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-center gap-2">
                <button onClick={handleGeneratePDF} className="btn btn-success btn-sm">
                    Generate PDF
                </button>
                <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
                    Go Back
                </button>
            </div>

            {/* Toast Notifications */}
            {toastMessage && (
                <div className="toast toast-top toast-end z-50">
                    <div className={`alert ${toastType}`}>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreviewPage;
