import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, message, Select, Card, Typography } from 'antd';
import dayjs from 'dayjs';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StudentPDF from './StudentPDF';
import ConductPDF from './ConductPDF';
import DobPdf from './DobPdf';
import './Study.css';

const { Title } = Typography;
const { Option } = Select;

const Study = () => {
    const [form] = Form.useForm();
    const [admNo, setAdmNo] = useState('');
    const [record, setRecord] = useState(null);
    const [pdfLoadingStates, setPdfLoadingStates] = useState({
        study: true,
        dob: true,
        conduct: true,
    });

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://hsbackendpkm.vercel.app/docs/${admNo}`);
            setRecord(response.data);
            form.setFieldsValue({
                ...response.data,
                dob: response.data.dob ? dayjs(response.data.dob, 'DD-MM-YYYY') : null,
                doj: response.data.doj ? dayjs(response.data.doj, 'DD-MM-YYYY') : null,
                issue_date: response.data.issue_date ? dayjs(response.data.issue_date, 'DD-MM-YYYY') : null,
                date_of_issue: response.data.date_of_issue ? dayjs(response.data.date_of_issue, 'DD-MM-YYYY') : null,
            });
            showToast('Record fetched successfully!', 'success');
        } catch (error) {
            showToast('Error fetching record', 'error');
            console.error('Error:', error);
        }
    };
    

    const handlePdfReady = (pdfType) => {
        setPdfLoadingStates((prevState) => ({
            ...prevState,
            [pdfType]: false,
        }));
    };

    const showToast = (message, type = 'info') => {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
    
        const toast = document.createElement('div');
        toast.className = `alert alert-${type}`;
        toast.innerHTML = `<span>${message}</span>`;
    
        toastContainer.appendChild(toast);
    
        setTimeout(() => {
            toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };
    

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div id="toast-container" className="toast toast-top toast-end z-50"></div>
            <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-box shadow">
                     <div className="form-wrapper">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Generate Student Certificates</h2>

                        <div className="flex justify-center gap-4 items-center mb-6">
                            <input
                                type="text"
                                value={admNo}
                                onChange={(e) => setAdmNo(e.target.value)}
                                placeholder="Enter Admission Number"
                                className="input input-bordered input-primary w-full sm:w-64"
                            />
                            <button
                                onClick={handleSearch}
                                className="btn btn-outline border-2 btn-success w-32 font-bold text-success hover:text-gray-600 "
                            >
                                Fetch Record
                            </button>
                        </div>
                    </div>
                </div>

                {record && (
                    <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
                        {/* Admission Details Card */}
                         <Card title="Admission Details" bordered={true} className="form-card">
                                                    <div className="bg-base-200 p-4 rounded-md">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Form.Item label="Adm No" name="adm_no" rules={[{ required: true, message: 'Please input surname!' }]}>
                                    <Input placeholder="Enter Admission Number" readOnly />
                                </Form.Item>

                                <Form.Item label="Date of Joining" name="doj" rules={[{ required: true, message: 'Please select Date of Joining!' }]}>
                                    <DatePicker placeholder="Select date of joining" format="DD-MM-YYYY" disabled />
                                </Form.Item>

                                <Form.Item label="Joining Class" name="join_class" rules={[{ required: true, message: 'Please select a Class!' }]}>
                                    <Select placeholder="Select Class" disabled>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <Option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        </Card>

                        {/* Student Details */}
                        <Card title="Student Details" bordered={true} className="form-card">
                            <div className="bg-base-200 p-4 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <Form.Item
                                    label="PEN Number"
                                    name="pen_no"
                                    rules={[
                                        { required: true, message: 'Please input PEN number!' },
                                        {
                                            pattern: /^\d{11,12}$/,
                                            message: 'PEN number must be 11 to 12 digits long and only contain numbers!'
                                        }
                                    ]}
                                >
                                    <Input
                                        type="text"
                                        placeholder="Enter PEN number"
                                        minLength={11}
                                        maxLength={12}
                                        readOnly
                                    />
                                </Form.Item>

                                <Form.Item label="Surname" name="sur_name" rules={[{ required: true, message: 'Please input surname!' }]}>
                                    <Input placeholder="Enter surname" readOnly />
                                </Form.Item>

                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                                    <Input placeholder="Enter name" readOnly />
                                </Form.Item>

                                <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
                                    <DatePicker placeholder="Select date of birth" format="DD-MM-YYYY" disabled />
                                </Form.Item>

                                <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender!' }]}>
                                    <Select placeholder="Select gender" disabled>
                                        <Option value="Boy">Boy</Option>
                                        <Option value="Girl">Girl</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Student Aadhaar"
                                    name="st_adhar"
                                    rules={[
                                        { required: true, message: 'Please input student Aadhaar!' },
                                        {
                                            pattern: /^\d{12}$/,
                                            message: 'Student Aadhaar must be exactly 12 digits!'
                                        }
                                    ]}
                                >
                                    <Input
                                        type="text"
                                        placeholder="Enter student Aadhaar number"
                                        maxLength={12}
                                        readOnly
                                    />
                                </Form.Item>

                                <Form.Item label="Father's Name" name="father_name" rules={[{ required: true, message: 'Please input father\'s name!' }]}>
                                    <Input placeholder="Enter father's name" readOnly />
                                </Form.Item>

                                <Form.Item label="Class From" name="form_class" rules={[{ required: true, message: 'Please input bank name!' }]}>
                                    <Input placeholder="Enter bank name" readOnly />
                                </Form.Item>

                                <Form.Item label="Class To" name="to_class" rules={[{ required: true, message: 'Please input address!' }]}>
                                    <Input placeholder="Enter address" readOnly />
                                </Form.Item>

                                <Form.Item label="Year Form" name="form_year" rules={[{ required: true, message: 'Please input ration card number!' }]}>
                                    <Input placeholder="Enter ration card number" readOnly />
                                </Form.Item>

                                <Form.Item label="Year To" name="to_year" rules={[{ required: true, message: 'Please input guardian name!' }]}>
                                    <Input placeholder="Enter guardian name" readOnly />
                                </Form.Item>

                                <Form.Item label="Status" name="status" rules={[{ required: false, message: 'Please input leaving class!' }]}>
                                    <Input placeholder="Enter leaving class" readOnly />
                                </Form.Item>

                                <Form.Item label="TC Number Issued" name="tc_no_issue" rules={[{ required: false, message: 'Please input TC number issued!' }]}>
                                    <Input placeholder="Enter TC number issued" readOnly />
                                </Form.Item>

                                <Form.Item label="Date of Issue" name="date_of_issue" rules={[{ required: false, message: 'Please select date of issue!' }]}>
                                    <DatePicker placeholder="Select date of issue" format="DD-MM-YYYY" disabled />
                                </Form.Item>
                            </div>
                        </div>
                        </Card>

                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'center', marginRight: 10 }}>
                                {/* Study Certificate Button */}
                                <PDFDownloadLink
                                    document={<StudentPDF record={record} />}
                                    fileName={`study_certificate_${admNo}.pdf`}
                                >
                                    {({ loading }) => {
                                        if (!loading && pdfLoadingStates.study) {
                                            handlePdfReady('study');
                                        }
                                        return (
                                            <Button
                                                type="primary"
                                                style={{ width: 100, marginRight: 40 }}
                                                loading={pdfLoadingStates.study && loading}
                                                disabled={pdfLoadingStates.study}
                                            >
                                                {loading ? 'Preparing...' : 'Study'}
                                            </Button>
                                        );
                                    }}
                                </PDFDownloadLink>

                                {/* DOB Certificate Button */}
                                <PDFDownloadLink
                                    document={<DobPdf record={record} />}
                                    fileName={`dob_certificate_${admNo}.pdf`}
                                >
                                    {({ loading }) => {
                                        if (!loading && pdfLoadingStates.dob) {
                                            handlePdfReady('dob');
                                        }
                                        return (
                                            <Button
                                                type="primary"
                                                style={{ width: 100, marginRight: 40 }}
                                                loading={pdfLoadingStates.dob && loading}
                                                disabled={pdfLoadingStates.dob}
                                            >
                                                {loading ? 'Preparing...' : 'DOB'}
                                            </Button>
                                        );
                                    }}
                                </PDFDownloadLink>

                                {/* Conduct Certificate Button */}
                                <PDFDownloadLink
                                    document={<ConductPDF record={record} />}
                                    fileName={`conduct_certificate_${admNo}.pdf`}
                                >
                                    {({ loading }) => {
                                        if (!loading && pdfLoadingStates.conduct) {
                                            handlePdfReady('conduct');
                                        }
                                        return (
                                            <Button
                                                type="primary"
                                                style={{ width: 100, marginRight: 40 }}
                                                loading={pdfLoadingStates.conduct && loading}
                                                disabled={pdfLoadingStates.conduct}
                                            >
                                                {loading ? 'Preparing...' : 'Conduct'}
                                            </Button>
                                        );
                                    }}
                                </PDFDownloadLink>
                                <PDFDownloadLink
                                    document={<ConductPDF record={record} />}
                                    fileName={`conduct_certificate_${admNo}.pdf`}
                                >
                                    {({ loading }) => {
                                        // Only render the button if the PDF is still loading
                                        if (loading || pdfLoadingStates.conduct) {
                                            if (!loading && pdfLoadingStates.conduct) {
                                                handlePdfReady('conduct'); // Mark as ready
                                            }

                                            return (
                                                <Button
                                                    type="primary"
                                                    style={{ width: 100, marginRight: 40 }}
                                                    loading={pdfLoadingStates.conduct && loading}
                                                    disabled={pdfLoadingStates.conduct}
                                                >
                                                    {loading ? 'Preparing...' : 'Conduct'}
                                                </Button>
                                            );
                                        }
                                        return null; // Button is removed from the DOM once the PDF is ready
                                    }}
                                </PDFDownloadLink>


                            </div>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default Study;
