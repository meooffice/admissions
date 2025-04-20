import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Card, Typography } from 'antd';
import dayjs from 'dayjs';
import { pdf } from '@react-pdf/renderer';
import AdmissionPDF from './AdmissionPDF';
import './PostForm.css';

const { Title } = Typography;
const { Option } = Select;

const PostForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState([]);

    const showToast = (type, message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 8000);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const formattedValues = {
                ...values,
                dob: values.dob ? dayjs(values.dob).format('DD-MM-YYYY') : '',
                doj: values.doj ? dayjs(values.doj).format('DD-MM-YYYY') : '',
                issue_date: values.issue_date ? dayjs(values.issue_date).format('DD-MM-YYYY') : '',
                date_of_issue: values.date_of_issue ? dayjs(values.date_of_issue).format('DD-MM-YYYY') : '',
            };

            // Post the data and receive admNo
            const response = await axios.post('https://hsbackendpkm.vercel.app/post', formattedValues);
            const { admNo, success } = response.data;

            if (success && admNo) {
                showToast('success', `Data submitted successfully! Admission No: ${admNo}`);

                // Generate PDF and download
                const blob = await pdf(<AdmissionPDF formData={formattedValues} />).toBlob();
                const blobURL = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobURL;
                link.download = `Admission_Form_${admNo}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                form.resetFields();
            } else {
                showToast('error', 'Submission failed: No admission number returned.');
            }
        } catch (error) {
            showToast('error', 'Error submitting the form');
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="form-container">
            {/* Toast notification container */}
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
            <div className="form-wrapper">
                <Title
                    level={2}
                    className="form-header border-2 rounded-2xl bg-green-500 w-1/2 text-center mx-auto"
                >
                    ADMISSION FORM
                </Title>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
                                        type="text" // Change type to "text" to allow maxLength to work correctly
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
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Internet Availability" name="internet" rules={[{ required: true, message: 'Please input internet availability!' }]}>
                                    <Select placeholder="Enter internet availability">
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </Card>

                    {/* Previous School Details */}
                    <Card title="Previous School Details" bordered={true} className="form-card">
                        <div className="bg-base-200 p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                                <Form.Item label="RC/TC Number" name="rc_tc_no" rules={[{ required: true, message: 'Please input RC/TC number!' }]}>
                                    <Input placeholder="Enter RC/TC number" />
                                </Form.Item>

                                <Form.Item label="Issue Date" name="issue_date" rules={[{ required: true, message: 'Please select issue date!' }]}>
                                    <DatePicker placeholder="Select issue date" format="DD-MM-YYYY" />
                                </Form.Item>

                                <Form.Item label="Last Class" name="last_class" rules={[{ required: true, message: 'Please input last class!' }]}>
                                    <Input placeholder="Enter last class" />
                                </Form.Item>

                                <Form.Item label="Last School" name="last_school" rules={[{ required: true, message: 'Please input last school!' }]}>
                                    <Input placeholder="Enter last school" />
                                </Form.Item>

                                <Form.Item label="Last School Address" name="last_school_add" rules={[{ required: true, message: 'Please input last school address!' }]}>
                                    <Input placeholder="Enter last school address" />
                                </Form.Item>

                                <Form.Item label="Qualified?" name="qualified" rules={[{ required: true, message: 'Please select qualification status!' }]}>
                                    <Select placeholder="Select qualification status">
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Medium of Instruction" name="medium" rules={[{ required: true, message: 'Please input medium of instruction!' }]}>
                                    <Input placeholder="Enter medium of instruction" />
                                </Form.Item>

                                <Form.Item label="Who is Joining" name="who_is_joinig" rules={[{ required: true, message: 'Please input who is joining!' }]}>
                                    <Input placeholder="Enter name of who is joining" />
                                </Form.Item>

                                <Form.Item label="Relation" name="relation" rules={[{ required: true, message: 'Please input relation!' }]}>
                                    <Input placeholder="Enter relation" />
                                </Form.Item>

                                <Form.Item label="Present Address" name="present_add" rules={[{ required: true, message: 'Please input present address!' }]}>
                                    <Input placeholder="Enter present address" />
                                </Form.Item>

                                <Form.Item label="Distance to School" name="distance_to_school" rules={[{ required: true, message: 'Please input distance to school!' }]}>
                                    <Input placeholder="Enter distance to school" />
                                </Form.Item>

                                <Form.Item label="Mode of Transport" name="mode_transport" rules={[{ required: true, message: 'Please input mode of transport!' }]}>
                                    <Input placeholder="Enter mode of transport" />
                                </Form.Item>


                            </div>
                        </div>
                    </Card>

                    <Form.Item>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-outline  btn-primary"
                                disabled={loading}
                                id="submit"
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PostForm;
