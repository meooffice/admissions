import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, message, Select, Card, Typography, Table } from 'antd';
import dayjs from 'dayjs';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MarksPDF from './MemoPdf'; // Your PDF generation component


const { Title } = Typography;
const { Option } = Select;

const Memo = () => {
    const [form] = Form.useForm();
    const [admNo, setAdmNo] = useState('');
    const [record, setRecord] = useState(null);
    const [pdfLoadingStates, setPdfLoadingStates] = useState({
        study: true,
        dob: true,
        conduct: true,
    });
    const [marksData, setMarksData] = useState([
        {
            key: '1',
            academicYear: '',
            class: '',
            firstLanguage: '',
            secondLanguage: '',
            thirdLanguage: '',
            math: '',
            pScience: '',
            bScience: '',
            social: '',
            total: '',
            percentage: '',
            result: '',
        }
    ]);

    // Columns for the Marks Table
    const columns = [
        {
            title: 'Academic Year',
            dataIndex: 'academicYear',
            render: (_, record, index) => (
                <Input
                    value={record.academicYear}
                    onChange={(e) => updateMarksData(index, 'academicYear', e.target.value)}
                />
            ),
        },
        {
            title: 'Class',
            dataIndex: 'class',
            render: (_, record, index) => (
                <Input
                    value={record.class}
                    onChange={(e) => updateMarksData(index, 'class', e.target.value)}
                />
            ),
        },
        {
            title: 'First Language',
            dataIndex: 'firstLanguage',
            render: (_, record, index) => (
                <Input
                    value={record.firstLanguage}
                    onChange={(e) => updateMarksData(index, 'firstLanguage', e.target.value)}
                />
            ),
        },
        {
            title: 'Second Language',
            dataIndex: 'secondLanguage',
            render: (_, record, index) => (
                <Input
                    value={record.secondLanguage}
                    onChange={(e) => updateMarksData(index, 'secondLanguage', e.target.value)}
                />
            ),
        },
        {
            title: 'Third Language',
            dataIndex: 'thirdLanguage',
            render: (_, record, index) => (
                <Input
                    value={record.thirdLanguage}
                    onChange={(e) => updateMarksData(index, 'thirdLanguage', e.target.value)}
                />
            ),
        },
        {
            title: 'Mathematics',
            dataIndex: 'math',
            render: (_, record, index) => (
                <Input
                    value={record.math}
                    onChange={(e) => updateMarksData(index, 'math', e.target.value)}
                />
            ),
        },
        {
            title: 'P. Science/G. Science',
            dataIndex: 'pScience',
            render: (_, record, index) => (
                <Input
                    value={record.pScience}
                    onChange={(e) => updateMarksData(index, 'pScience', e.target.value)}
                />
            ),
        },
        {
            title: 'B. Science',
            dataIndex: 'bScience',
            render: (_, record, index) => (
                <Input
                    value={record.bScience}
                    onChange={(e) => updateMarksData(index, 'bScience', e.target.value)}
                />
            ),
        },
        {
            title: 'Social',
            dataIndex: 'social',
            render: (_, record, index) => (
                <Input
                    value={record.social}
                    onChange={(e) => updateMarksData(index, 'social', e.target.value)}
                />
            ),
        },
        {
            title: 'Total Marks',
            dataIndex: 'total',
            render: (_, record, index) => (
                <Input
                    value={record.total}
                    onChange={(e) => updateMarksData(index, 'total', e.target.value)}
                />
            ),
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            render: (_, record, index) => (
                <Input
                    value={record.percentage}
                    onChange={(e) => updateMarksData(index, 'percentage', e.target.value)}
                />
            ),
        },
        {
            title: 'Result',
            dataIndex: 'result',
            render: (_, record, index) => (
                <Input
                    value={record.result}
                    onChange={(e) => updateMarksData(index, 'result', e.target.value)}
                />
            ),
        },
    ];

    // Update the marks data when any input is changed
    const updateMarksData = (index, key, value) => {
        const newData = [...marksData];
        newData[index][key] = value;
        setMarksData(newData);
    };

    // Fetch the record for the given Admission Number
    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://hsbackendpkm.vercel.app/docs/${admNo}`);
            
            if (response.data) {
                setRecord(response.data);
                form.setFieldsValue({
                    ...response.data,
                    dob: response.data.dob ? dayjs(response.data.dob, 'DD-MM-YYYY') : null,
                    doj: response.data.doj ? dayjs(response.data.doj, 'DD-MM-YYYY') : null,
                    issue_date: response.data.issue_date ? dayjs(response.data.issue_date, 'DD-MM-YYYY') : null,
                    date_of_issue: response.data.date_of_issue ? dayjs(response.data.date_of_issue, 'DD-MM-YYYY') : null,
                });
    
                // Show success toast using DaisyUI
                showToast('Record fetched successfully!', 'success');
            } else {
                // Show error toast using DaisyUI
                showToast('No data found for this Admission Number.', 'error');
            }
        } catch (error) {
            // Show error toast using DaisyUI
            showToast('Error fetching record', 'error');
            console.error('Error:', error);
        }
    };
    

    // Handle when PDF is ready
    const handlePdfReady = (pdfType) => {
        setPdfLoadingStates((prevState) => ({
            ...prevState,
            [pdfType]: false,
        }));
    };

    const resetForm = () => {
        form.resetFields();
        setRecord(null);
        setAdmNo('');
        setMarksData([
            {
                key: '1',
                academicYear: '',
                class: '',
                firstLanguage: '',
                secondLanguage: '',
                thirdLanguage: '',
                math: '',
                pScience: '',
                bScience: '',
                social: '',
                total: '',
                percentage: '',
                result: '',
            }
        ]);
        message.success('Form reset after download.');
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

            <div className="max-w-5xl mx-auto bg-base-100 p-6 rounded-box shadow">
                <div className="w-full flex justify-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Create Student Marks Memo</h2>

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

                        {/* Marks Table Section */}
                        <div className="bg-base-200 p-4 rounded-md">
                            <Title level={4} className="text-center">Marks Table</Title>
                            <div className="overflow-x-auto">
                                <table className="table table-xs border-0 p-1 shadow-lg text-center pb-2 ">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Year</th>
                                            <th>Class</th>
                                            <th>1st<br></br>Lang</th>
                                            <th>2nd<br></br>Lang</th>
                                            <th>3rd<br></br>Lang</th>
                                            <th>Maths</th>
                                            <th>P.Sci/<br></br>G.Sci</th>
                                            <th>B.Sci</th>
                                            <th>Social</th>
                                            <th>Total<br></br>Marks</th>
                                            <th>Percentage</th>
                                            <th>Final Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {marksData.map((mark, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.academicYear}
                                                        onChange={(e) => updateMarksData(index, 'academicYear', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.class}
                                                        onChange={(e) => updateMarksData(index, 'class', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.firstLanguage}
                                                        onChange={(e) => updateMarksData(index, 'firstLanguage', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.secondLanguage}
                                                        onChange={(e) => updateMarksData(index, 'secondLanguage', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.thirdLanguage}
                                                        onChange={(e) => updateMarksData(index, 'thirdLanguage', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.math}
                                                        onChange={(e) => updateMarksData(index, 'math', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.pScience}
                                                        onChange={(e) => updateMarksData(index, 'pScience', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.bScience}
                                                        onChange={(e) => updateMarksData(index, 'bScience', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.social}
                                                        onChange={(e) => updateMarksData(index, 'social', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.total}
                                                        onChange={(e) => updateMarksData(index, 'total', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.percentage}
                                                        onChange={(e) => updateMarksData(index, 'percentage', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={mark.result}
                                                        onChange={(e) => updateMarksData(index, 'result', e.target.value)}
                                                        className="input input-bordered input-sm"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                            <Button
                                type="dashed"
                                onClick={() =>
                                    setMarksData([
                                        ...marksData,
                                        {
                                            key: Date.now().toString(),
                                            academicYear: '',
                                            class: '',
                                            firstLanguage: '',
                                            secondLanguage: '',
                                            thirdLanguage: '',
                                            math: '',
                                            pScience: '',
                                            bScience: '',
                                            social: '',
                                            total: '',
                                            percentage: '',
                                            result: '',
                                        },
                                    ])
                                }
                                className="mx-auto mt-4" // Centers the button horizontally using Tailwind's mx-auto
                            >
                                Add Row
                            </Button>
                        
                        </div>


                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'center', marginRight: 10 }}>
                                <PDFDownloadLink
                                    document={<MarksPDF record={record} marks={marksData} />}
                                    fileName={`Marks_Memo_${admNo}.pdf`}
                                >
                                    {({ loading }) => (
                                        <Button
                                            type="primary"
                                            style={{ width: 100, marginRight: 40 }}
                                            loading={pdfLoadingStates.study && loading}
                                            onClick={() => {
                                                // Delay ensures PDF starts downloading before clearing data
                                                setTimeout(() => {
                                                    resetForm();
                                                }, 1000);
                                            }}
                                        >
                                            {loading ? 'Preparing...' : 'Download PDF'}
                                        </Button>

                                    )}
                                </PDFDownloadLink>
                            </div>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default Memo;
