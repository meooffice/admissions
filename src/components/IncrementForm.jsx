import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography, DatePicker } from 'antd';
import axios from 'axios';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import IncrementPdf from './Increment'; // Ensure this matches the new filename
import './increment.css';
import dayjs from 'dayjs';

const { Title } = Typography;

const IncrementForm = () => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [employees, setEmployees] = useState([{}]);

    // Function to handle adding a new employee row
    const addEmployee = () => {
        setEmployees([...employees, {}]);
    };

    // Function to handle removing an employee row
    const removeEmployee = (index) => {
        const updatedEmployees = employees.filter((_, idx) => idx !== index);
        setEmployees(updatedEmployees);
    };

    // Function to handle form submission
    const handleIncrementSubmit = async (values) => {
        setSubmitting(true);

        const employeeData = employees.map((employee, index) => ({
            proceeding_no: index === 0 ? values.proceeding_no : undefined,
            date: index === 0 && values.date ? values.date.format('DD-MM-YYYY') : undefined, // Ensure correct date format
            ddo_name: index === 0 ? values.ddo_name : undefined,
            name: employee.name,
            designation: employee.designation,
            present_pay: employee.present_pay,
            rate_increment: employee.rate_increment,
            future_pay: employee.future_pay, // Automatically calculated
            effect_date: employee.effect_date ? employee.effect_date.format('DD-MM-YYYY') : undefined, // Check for effect_date
            next_date: employee.next_date ? employee.next_date.format('DD-MM-YYYY') : undefined, // Check for next_date
            pay_scale: employee.pay_scale,
        }));

        try {
            await axios.post('https://hsbackendpkm.vercel.app/multy', employeeData);
            message.success('Increment data submitted successfully!');

            const pdfBlob = await pdf(<IncrementPdf data={employeeData} />).toBlob();
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'increment_form.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);

            // Reset form fields
            form.resetFields();
            setEmployees([{}]); // Reset employee data to a single empty object

            // Reset specific fields (effect_date and next_date) for all employees
            setEmployees((prevEmployees) =>
                prevEmployees.map(() => ({
                    name: '',
                    designation: '',
                    present_pay: '',
                    rate_increment: '',
                    future_pay: '',
                    effect_date: null,  // Set to null for clearing DatePicker
                    next_date: null,    // Set to null for clearing DatePicker
                    pay_scale: ''
                }))
            );
        } catch (error) {
            message.error('Error submitting Increment data');
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Automatic future pay calculation
    const handleEmployeeChange = (index, field, value) => {
        const updatedEmployees = [...employees];
        updatedEmployees[index] = {
            ...updatedEmployees[index],
            [field]: value,
        };

        if (field === 'present_pay' || field === 'rate_increment') {
            const presentPay = updatedEmployees[index].present_pay || 0;
            const rateIncrement = updatedEmployees[index].rate_increment || 0;
            updatedEmployees[index].future_pay = parseFloat(presentPay) + parseFloat(rateIncrement);
        }

        setEmployees(updatedEmployees);
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-box shadow">
                <Title level={2} className="form-header">Increment Form</Title>
                <Form form={form} layout="vertical" onFinish={handleIncrementSubmit}>
                    <Card title="Leave Details" bordered={true} className="form-card">
                        <div className="bg-base-200 p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Form.Item
                                    label="Proceeding No"
                                    name="proceeding_no"
                                    rules={[{ required: true, message: 'Please enter the proceeding number!' }]}
                                    className="field-item"
                                >
                                    <Input placeholder="Enter Proceeding No" />
                                </Form.Item>

                                <Form.Item
                                    label="Date"
                                    name="date"
                                    rules={[{ required: true, message: 'Please select the date!' }]}
                                    className="field-item"
                                >
                                    <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} placeholder="Select Date" />
                                </Form.Item>

                                <Form.Item
                                    label="DDO Name And Qualifications"
                                    name="ddo_name"
                                    rules={[{ required: true, message: 'Please enter the DDO name!' }]}
                                    className="field-item"
                                >
                                    <Input placeholder="Enter DDO Name" />
                                </Form.Item>
                            </div>
                        </div>
                    </Card>

                    {employees.map((employee, index) => (
                        <Card key={index} title={`Employee ${index + 1}`} bordered={true} className="form-card">
                            <div className="bg-base-200 p-4 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Form.Item
                                        label="Name"
                                        rules={[{ required: true, message: 'Please enter the name!' }]}
                                    >
                                        <Input
                                            placeholder="Enter Name"
                                            value={employee.name}
                                            onChange={(e) => handleEmployeeChange(index, 'name', e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Designation"
                                        rules={[{ required: true, message: 'Please enter the designation!' }]}
                                    >
                                        <Input
                                            placeholder="Enter Designation"
                                            value={employee.designation}
                                            onChange={(e) => handleEmployeeChange(index, 'designation', e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Scale of Pay"
                                        rules={[{ required: true, message: 'Please enter the Scale of Pay!' }]}
                                    >
                                        <Input
                                            placeholder="Enter Scale of Pay"
                                            value={employee.pay_scale}
                                            onChange={(e) => handleEmployeeChange(index, 'pay_scale', e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Present Pay"
                                        rules={[{ required: true, message: 'Please enter the present pay!' }]}
                                    >
                                        <Input
                                            placeholder="Enter Present Pay"
                                            type="number"
                                            min={0}
                                            value={employee.present_pay}
                                            onChange={(e) => handleEmployeeChange(index, 'present_pay', e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Rate of Increment"
                                        rules={[{ required: true, message: 'Please enter the rate of increment!' }]}
                                    >
                                        <Input
                                            placeholder="Enter Rate of Increment"
                                            type="number"
                                            min={0}
                                            value={employee.rate_increment}
                                            onChange={(e) => handleEmployeeChange(index, 'rate_increment', e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Future Pay">
                                        <Input
                                            placeholder="Future Pay"
                                            value={employee.future_pay}
                                            readOnly
                                        />
                                    </Form.Item>

                                    <Form.Item label="Effect Date">
                                        <DatePicker
                                            format="DD-MM-YYYY"
                                            value={employee.effect_date}
                                            onChange={(date) => handleEmployeeChange(index, 'effect_date', date)}
                                            placeholder="Select Effect Date"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Next Increment Date">
                                        <DatePicker
                                            format="DD-MM-YYYY"
                                            value={employee.next_date}
                                            onChange={(date) => handleEmployeeChange(index, 'next_date', date)}
                                            placeholder="Select Next Increment Date"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>

                                    <div className="flex items-end">
                                        <Button
                                            type="danger"
                                            onClick={() => removeEmployee(index)}
                                            style={{ width: '100%', color: 'red', fontWeight: 'bold' }}
                                        >
                                            Remove Employee
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}



                    <div className="flex justify-center mb-5">
                        <button
                            onClick={addEmployee}
                            className="btn btn-outline btn-accent btn-soft w-[200px]"
                        >
                            Add Employee
                        </button>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`btn btn-primary btn-soft w-[200px] ${submitting ? 'btn-disabled' : ''}`}
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


                </Form>
            </div>
        </div>
    );
};

export default IncrementForm;
