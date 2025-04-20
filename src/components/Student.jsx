import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Card, Typography, Spin } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import './SearchAndUpdateForm.css';

const { Title } = Typography;
const { Option } = Select;

const StudentUpdate = () => {
    const { admNo } = useParams();
    const [form] = Form.useForm();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [toasts, setToasts] = useState([]);

    const showToast = (type, message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    const handleFetch = async () => {
        if (!admNo) {
            showToast('error', 'Admission number not found!');
            return;
        }
        setFormLoading(true);
        try {
            const response = await axios.get(`https://hsbackendpkm.vercel.app/search/${admNo}`);
            setRecord(response.data);
            form.setFieldsValue({
                ...response.data,
                dob: response.data.dob ? dayjs(response.data.dob, 'DD-MM-YYYY') : null,
                doj: response.data.doj ? dayjs(response.data.doj, 'DD-MM-YYYY') : null,
                issue_date: response.data.issue_date ? dayjs(response.data.issue_date, 'DD-MM-YYYY') : null,
                date_of_issue: response.data.date_of_issue ? dayjs(response.data.date_of_issue, 'DD-MM-YYYY') : null,
            });
            showToast('success', 'Record fetched successfully!');
        } catch (error) {
            showToast('error', 'Error fetching record');
            console.error('Error:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                adm_no: admNo,
                dob: values.dob ? dayjs(values.dob).format('DD-MM-YYYY') : '',
                doj: values.doj ? dayjs(values.doj).format('DD-MM-YYYY') : '',
                issue_date: values.issue_date ? dayjs(values.issue_date).format('DD-MM-YYYY') : '',
                date_of_issue: values.date_of_issue ? dayjs(values.date_of_issue).format('DD-MM-YYYY') : '',
            };

            await axios.put(`https://hsbackendpkm.vercel.app/update/${admNo}`, formattedValues);
            showToast('success', 'Record updated successfully!');
            form.resetFields();
            setRecord(null);
        } catch (error) {
            showToast('error', 'Error updating record');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetch();
    }, [admNo]);

    if (formLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            {/* Toast Notification Container */}
            <div className="toast toast-top toast-end z-50">
                {toasts.map(({ id, type, message }) => (
                    <div
                        key={id}
                        className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg`}
                    >
                        <span>{message}</span>
                    </div>
                ))}
            </div>
            <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-box shadow">
                <Title level={2} className="form-header">UPDATE STUDENT DETAILS</Title>

                {record && (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdate}
                        style={{ marginTop: 20 }}
                    >
                        {/* Admission Details */}
                        <Card title="Admission Details" bordered={true} className="form-card">
                            <div className="bg-base-200 p-4 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item label="Date of Joining" name="doj" rules={[{ required: true, message: 'Please select Date of Joining!' }]}>
                                        <DatePicker placeholder="Select date of joining" format="DD-MM-YYYY" />
                                    </Form.Item>

                                    <Form.Item label="Joining Class" name="join_class" rules={[{ required: true, message: 'Please select a Class!' }]}>
                                        <Select placeholder="Select Class">
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
                                        onInput={(e) => {
                                            // Replace non-numeric characters
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }} // restrict input to max 12 digits
                                    />
                                </Form.Item>

                                <Form.Item label="Surname" name="sur_name" rules={[{ required: true, message: 'Please input surname!' }]}>
                                    <Input placeholder="Enter surname" />
                                </Form.Item>

                                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                                    <Input placeholder="Enter name" />
                                </Form.Item>

                                <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
                                    <DatePicker placeholder="Select date of birth" format="DD-MM-YYYY" />
                                </Form.Item>

                                <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender!' }]}>
                                    <Select placeholder="Select gender">
                                        <Option value="Boy">Boy</Option>
                                        <Option value="Girl">Girl</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Mother Tongue" name="mother_lang" rules={[{ required: true, message: 'Please input mother tongue!' }]}>
                                    <Input placeholder="Enter mother tongue" />
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
                                        onInput={(e) => {
                                            // Replace non-numeric characters
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item label="Caste" name="caste" rules={[{ required: true, message: 'Please input caste!' }]}>
                                    <Input placeholder="Enter caste" />
                                </Form.Item>
                                <Form.Item label="Category" name="catogory" rules={[{ required: true, message: 'Please select category!' }]}>
                                    <Select placeholder="Select category">
                                        <Option value="SC">SC</Option>
                                        <Option value="ST">ST</Option>
                                        <Option value="BC">BC</Option>
                                        <Option value="OC">OC</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Nationality & Religion" name="nation_religion" rules={[{ required: true, message: 'Please input nationality and religion!' }]}>
                                    <Input placeholder="Enter nationality & religion" />
                                </Form.Item>

                                <Form.Item label="Height (cm)" name="hieght" rules={[{ required: true, message: 'Please input height!' }]}>
                                    <Input placeholder="Enter height in cm" />
                                </Form.Item>

                                <Form.Item label="Shoe Size (cm)" name="shoe_size_cm" rules={[{ required: true, message: 'Please input shoe size!' }]}>
                                    <Input placeholder="Enter shoe size in cm" />
                                </Form.Item>

                                <Form.Item label="Moles" name="moles" rules={[{ required: true, message: 'Please input any moles!' }]}>
                                    <Input placeholder="Enter distinguishing moles" />
                                </Form.Item>

                                <Form.Item label="Father's Name" name="father_name" rules={[{ required: true, message: 'Please input father\'s name!' }]}>
                                    <Input placeholder="Enter father's name" />
                                </Form.Item>

                                <Form.Item
                                    label="Father's Aadhaar"
                                    name="f_adhar"
                                    rules={[
                                        { required: true, message: "Please input father's Aadhaar!" },
                                        {
                                            pattern: /^\d{12}$/,
                                            message: "Aadhaar number must be exactly 12 digits long!"
                                        }
                                    ]}
                                >
                                    <Input
                                        type="text" // Change type to "text" to allow maxLength to work correctly
                                        placeholder="Enter Father Aadhaar number"
                                        maxLength={12}
                                        onInput={(e) => {
                                            // Replace non-numeric characters
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                    /></Form.Item>


                                <Form.Item label="Mother's Name" name="mother_name" rules={[{ required: true, message: 'Please input mother\'s name!' }]}>
                                    <Input placeholder="Enter mother's name" />
                                </Form.Item>

                                <Form.Item
                                    label="Mother's Aadhaar"
                                    name="m_adhar"
                                    rules={[
                                        { required: true, message: "Please input mother's Aadhaar!" },
                                        {
                                            pattern: /^\d{12}$/,
                                            message: "Aadhaar number must be exactly 12 digits!",
                                        },
                                    ]}
                                >
                                    <Input
                                        type="text" // Change type to "text" to allow maxLength to work correctly
                                        placeholder="Enter Mother Aadhaar number"
                                        maxLength={12}
                                        onInput={(e) => {
                                            // Replace non-numeric characters
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                    /></Form.Item>


                                <Form.Item label="Occupation" name="ocupation" rules={[{ required: true, message: 'Please input occupation!' }]}>
                                    <Input placeholder="Enter occupation" />
                                </Form.Item>
                            </div>
                            </div>
                        </Card>

                        {/* Address Details */}
                        <Card title="Address Details" bordered={true} className="form-card">
                            <div className="bg-base-200 p-4 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <Form.Item
                                    label="Bank Account Number"
                                    name="bannk_ac_no"
                                    rules={[
                                        { required: true, message: 'Please input bank account number!' },
                                        {
                                            pattern: /^\d{11,16}$/,
                                            message: 'Bank account number must be between 11 and 16 digits!'
                                        }
                                    ]}
                                >
                                    <Input
                                        type="text" // Change type to "text" to allow maxLength to work correctly
                                        placeholder="Enter student Aadhaar number"
                                        maxLength={16}
                                        onInput={(e) => {
                                            // Replace non-numeric characters
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="IFSC Code"
                                    name="ifsc_code"
                                    rules={[
                                        { required: true, message: 'Please input IFSC code!' },
                                        {
                                            pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                                            message: 'IFSC code must be in the format: XXXX0YYYYYY (X=letters, Y=numbers)'
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter IFSC code"
                                        maxLength={11} // Restrict input to a maximum of 11 characters
                                    />
                                </Form.Item>



                                <Form.Item label="Bank Name" name="bannk_name" rules={[{ required: true, message: 'Please input bank name!' }]}>
                                    <Input placeholder="Enter bank name" />
                                </Form.Item>

                                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input address!' }]}>
                                    <Input placeholder="Enter address" />
                                </Form.Item>

                                <Form.Item label="Ration Card Number" name="ration_card_no" rules={[{ required: true, message: 'Please input ration card number!' }]}>
                                    <Input placeholder="Enter ration card number" />
                                </Form.Item>
                                <Form.Item
                                    label="Mobile Number"
                                    name="mobile_no"
                                    rules={[
                                        { required: true, message: 'Please input mobile number!' },
                                        {
                                            pattern: /^(?:[6789]\d{9})$/,
                                            message: 'Mobile number must be a 10-digit number starting with 6, 7, 8, or 9!'
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter mobile number"
                                        maxLength={10} // Limit input length to 10 digits
                                        onInput={(e) => {
                                            // Allow only numeric input
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                    />
                                </Form.Item>



                                <Form.Item label="Guardian" name="guardian" rules={[{ required: true, message: 'Please input guardian name!' }]}>
                                    <Input placeholder="Enter guardian name" />
                                </Form.Item>
                                <Form.Item
                                    label="TV Type"
                                    name="tv_type"
                                    rules={[{ required: true, message: 'Please select TV type!' }]}
                                >
                                    <Select placeholder="Select TV type">
                                        <Select.Option value="Analog">Analog</Select.Option>
                                        <Select.Option value="Smart">Smart</Select.Option>
                                        <Select.Option value="Advanced">Advanced</Select.Option>
                                        <Select.Option value="No TV">No TV</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="TV Connection"
                                    name="tv_connection"
                                    rules={[{ required: true, message: 'Please select TV connection!' }]} // Update message for select
                                >
                                    <Select placeholder="Select TV connection">
                                        <Option value="Cable">Cable</Option>
                                        <Option value="DTH">DTH</Option>
                                        <Option value="Not Applicable">Not Applicable</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="DTH Provider"
                                    name="dth_name"
                                    rules={[{ required: true, message: 'Please select DTH provider!' }]} // Update message for select
                                >
                                    <Select placeholder="Select DTH provider">
                                        <Option value="Tata Sky">Tata Sky</Option>
                                        <Option value="Bharat Business">Bharat Business</Option>
                                        <Option value="Dish TV">Dish TV</Option>
                                        <Option value="SUN Direct">SUN Direct</Option>
                                        <Option value="Airtel">Airtel</Option>
                                        <Option value="M/s Reliance BIG TV">M/s Reliance BIG TV</Option>
                                        <Option value="Others">Others</Option>
                                        <Option value="Not Applicable">Not Applicable</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Mobile Type"
                                    name="mobile_type"
                                    rules={[{ required: true, message: 'Please select mobile type!' }]} // Update message for select
                                >
                                    <Select placeholder="Select mobile type">
                                        <Option value="Basic">Basic</Option>
                                        <Option value="Smart">Smart</Option>
                                        <Option value="No Mobile">No Mobile</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Computer Available?" name="computer" rules={[{ required: true, message: 'Please input computer type!' }]}>

                                    <Select placeholder="Enter computer availability">
                                        <Option value="Basic">Yes</Option>
                                        <Option value="Smart">No</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Internet Availability" name="internet" rules={[{ required: true, message: 'Please input internet availability!' }]}>
                                    <Select placeholder="Enter internet availability">
                                        <Option value="Basic">Yes</Option>
                                        <Option value="Smart">No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            </div>
                        </Card>

                        <Card title="Student Status Details" bordered={true} className="form-card">
                            <div className="bg-base-200 p-4 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                                <Form.Item label="TC Number Issued" name="tc_no_issue" rules={[{ required: false, message: 'Please input TC number issued!' }]}>
                                    <Input placeholder="Enter TC number issued" />
                                </Form.Item>

                                <Form.Item label="Date of Issue" name="date_of_issue" rules={[{ required: false, message: 'Please select date of issue!' }]}>
                                    <DatePicker placeholder="Select date of issue" format="DD-MM-YYYY" />
                                </Form.Item>

                                <Form.Item label="Completed Class" name="complted_class" rules={[{ required: false, message: 'Please input completed class!' }]}>
                                    <Input placeholder="Enter completed class" />
                                </Form.Item>

                                <Form.Item label="Leaving Class" name="leaving_class" rules={[{ required: false, message: 'Please input leaving class!' }]}>
                                    <Input placeholder="Enter leaving class" />
                                </Form.Item>

                                {/* Continue adding other previous school details */}
                            </div>
                            </div>
                        </Card>

                        {/* Submit Button */}
                        <Form.Item>
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`btn btn-info btn-soft w-[100px] border border-green-400 ${loading ? 'btn-disabled' : ''}`}
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>

                        </Form.Item>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default StudentUpdate;
