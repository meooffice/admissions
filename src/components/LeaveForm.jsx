import React, { useState } from 'react';
import { Form, Input, Button, message, Card, DatePicker, Typography, Select } from 'antd';
import axios from 'axios';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import LeavePdf from './leaveDoc'; // Ensure you have a LeavePdf.js component
import './leave.css'; // Assuming you have custom styles here

const { Title } = Typography;
const { Option } = Select;

const LeaveForm = () => {
    const [form] = Form.useForm();
    const [leaveBalance, setLeaveBalance] = useState(''); // State for leave balance
    const [submitting, setSubmitting] = useState(false); // State to track form submission status

    const handleLeaveSubmit = async (values) => {
        setSubmitting(true);

        // Format date fields before submission
        const formattedValues = {
            ...values,
            from_date: values.from_date ? dayjs(values.from_date).format('DD-MM-YYYY') : '',
            to_date: values.to_date ? dayjs(values.to_date).format('DD-MM-YYYY') : '',
            date: values.date ? dayjs(values.date).format('DD-MM-YYYY') : '',
            leave_balance: parseFloat(values.leave_available) - parseFloat(values.leave_days),
        };

        console.log('Submitting leave data:', formattedValues); // Debugging submission

        try {
            await axios.post('https://hsbackendpkm.vercel.app/leave', formattedValues);
            message.success('Leave data submitted successfully!');

            // Generate PDF and download it automatically
            const pdfBlob = await pdf(<LeavePdf data={formattedValues} />).toBlob();
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'leave_form.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url); // Clean up URL

            form.resetFields(); // Reset form after successful submission
            setLeaveBalance(''); // Reset leave balance
        } catch (error) {
            message.error('Error submitting Leave data');
            console.error('Error:', error);
        } finally {
            setSubmitting(false); // Reset submitting state after submission
        }
    };

    const handleLeaveChange = () => {
        const leaveAvailable = parseFloat(form.getFieldValue('leave_available')) || 0;
        const leaveDays = parseFloat(form.getFieldValue('leave_days')) || 0;

        if (!isNaN(leaveAvailable) && !isNaN(leaveDays)) {
            const balance = leaveAvailable - leaveDays;
            setLeaveBalance(balance);
            form.setFieldsValue({ leave_balance: balance });
        }
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-box shadow">
                <Title level={2} className="form-header">Leave Form</Title>
                <Form form={form} layout="vertical" onFinish={handleLeaveSubmit}>
                    <Card title="Leave Details" bordered={true} className="form-card">
                        <div className="bg-base-200 p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Form.Item
                                    label="Proceeding No"
                                    name="proceeding_no"
                                    rules={[{ required: true, message: 'Please enter the proceeding number!' }]}
                                >
                                    <Input placeholder="Enter Proceeding No" />
                                </Form.Item>
                                <Form.Item
                                    label="Proceedings Date"
                                    name="date"
                                    rules={[{ required: true, message: 'Please select the proceedings date!' }]}
                                >
                                    <DatePicker format="DD-MM-YYYY" placeholder="Select Date" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="DDO Name, Qualifications"
                                    name="ddo_name"
                                    rules={[{ required: true, message: 'Please enter the DDO name!' }]}
                                >
                                    <Input placeholder="Enter Name" />
                                </Form.Item>

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter the name!' }]}
                                >
                                    <Input placeholder="Enter Name" />
                                </Form.Item>

                                <Form.Item
                                    label="Designation"
                                    name="designation"
                                    rules={[{ required: true, message: 'Please enter the designation!' }]}
                                >
                                    <Select placeholder="Select Designation">
                                        <Option value="SA (Tel)">SA (Tel)</Option>
                                        <Option value="SA (Eng)">SA (Eng)</Option>
                                        <Option value="SA (Hin)">SA (Hin)</Option>
                                        <Option value="SA (Maths)">SA (Maths)</Option>
                                        <Option value="SA (PS)">SA (PS)</Option>
                                        <Option value="SA (BS)">SA (BS)</Option>
                                        <Option value="SA (SS)">SA (SS)</Option>
                                        <Option value="SA (PE)">SA (PE)</Option>
                                        <Option value="SGT">SGT</Option>
                                        <Option value="LPT">LPT</Option>
                                        <Option value="LPH">LPH</Option>
                                        <Option value="PET">PET</Option>
                                        <Option value="MTS">MTS</Option>
                                        <Option value="Non Teaching ___________">Non Teaching</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="From Date"
                                    name="from_date"
                                    rules={[{ required: true, message: 'Please select the from date!' }]}
                                >
                                    <DatePicker format="DD-MM-YYYY" placeholder="Select From Date" style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item
                                    label="To Date"
                                    name="to_date"
                                    rules={[{ required: true, message: 'Please select the to date!' }]}
                                >
                                    <DatePicker format="DD-MM-YYYY" placeholder="Select To Date" style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item
                                    label="Type of Leave"
                                    name="type_of_leave"
                                    rules={[{ required: true, message: 'Please select the type of leave!' }]}
                                >
                                    <Select placeholder="Select Type of Leave">
                                        <Option value="Medical">Medical</Option>
                                        <Option value="Commutation">Commutation</Option>
                                        <Option value="Half Pay">Half Pay</Option>
                                        <Option value="Earned">Earned</Option>
                                        <Option value="Meternity">Meternity</Option>
                                        <Option value="Peternity">Peternity</Option>
                                        <Option value="Mis Carriage">Mis Carriage</Option>
                                        <Option value="Histerictomy">Histerictomy</Option>
                                        <Option value="EOL">EOL</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Leave Available"
                                    name="leave_available"
                                    rules={[{ required: true, message: 'Please enter the leave available!' }]}
                                >
                                    <Input
                                        placeholder="Enter Leave Available"
                                        type="number"
                                        min={0}
                                        onChange={handleLeaveChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Leave Days"
                                    name="leave_days"
                                    rules={[{ required: true, message: 'Please enter the leave days!' }]}
                                >
                                    <Input
                                        placeholder="Enter Leave Days"
                                        type="number"
                                        min={0}
                                        onChange={handleLeaveChange}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Leave Balance"
                                    name="leave_balance"
                                >
                                    <Input
                                        placeholder="Auto-calculated Leave Balance"
                                        value={leaveBalance}
                                        disabled
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Reason"
                                    name="reason"
                                    rules={[{ required: true, message: 'Please enter the Reason!' }]}
                                >
                                    <Input placeholder="Enter Name" />
                                </Form.Item>
                            </div>
                        </div>
                    </Card>

                    <Card title="Remarks" bordered={true} className="form-card">
                        <div className="bg-base-200 p-4 rounded-md">
                            <Form.Item
                                label="Add any specific notes (if applicable):"
                                name="add_text"
                                rules={[{ required: false, message: 'Please enter the Reason!' }]}                            >
                                <Input placeholder="Enter Additional notes (optional):" />
                            </Form.Item>
                        </div>
                    </Card>

                    <Form.Item>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`btn btn-primary btn-soft ${submitting ? 'btn-disabled' : ''}`}
                            >
                                {submitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm mr-2"></span>Submitting...
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LeaveForm;
