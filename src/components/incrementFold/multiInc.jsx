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
    const [futurePay, setFuturePay] = useState('');
    const [submitting, setSubmitting] = useState(false); // State to track submission status

    const handleIncrementSubmit = async (values) => {
        setSubmitting(true); // Set submitting to true

        const formattedValues = {
            ...values,
            date: values.date.format('DD-MM-YYYY'),
            effect_date: values.effect_date.format('DD-MM-YYYY'),
            next_date: values.next_date.format('DD-MM-YYYY'), // Format the next_date
            future_pay: parseFloat(values.present_pay) + parseFloat(values.rate_increment),
        };

        try {
            await axios.post('https://hsbackendpkm.vercel.app/increment', formattedValues);
            message.success('Increment data submitted successfully!');

            // Generate PDF and download it automatically
            const pdfBlob = await pdf(<IncrementPdf data={formattedValues} />).toBlob();
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'increment_form.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url); // Clean up URL

            form.resetFields();
            setFuturePay('');
        } catch (error) {
            message.error('Error submitting Increment data');
            console.error('Error:', error);
        } finally {
            setSubmitting(false); // Reset submitting state after submission
        }
    };

    const handlePayChange = () => {
        const presentPay = parseFloat(form.getFieldValue('present_pay'));
        const rateIncrement = parseFloat(form.getFieldValue('rate_increment'));

        if (presentPay && rateIncrement) {
            const future = presentPay + rateIncrement;
            setFuturePay(future);
            form.setFieldsValue({ future_pay: future });
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <Title level={2} className="form-header">Increment Form</Title>
                <Form form={form} layout="vertical" onFinish={handleIncrementSubmit}>
                    <Card title="Beneficiary Details" bordered={true} className="form-card">
                        <div className="form-fields-grid">
                            <Form.Item
                                label="Proceeding No"
                                name="proceeding_no"
                                rules={[{ required: true, message: 'Please enter the proceeding number!' }]}
                            >
                                <Input placeholder="Enter Proceeding No" />
                            </Form.Item>

                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[{ required: true, message: 'Please select the date!' }]}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    style={{ width: '100%' }}
                                    placeholder="Select Date"
                                />
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
                                <Input placeholder="Enter Designation" />
                            </Form.Item>
                            <Form.Item
                                label="Scale of Pay"
                                name="pay_scale"
                                rules={[{ required: true, message: 'Please enter the Scale of Pay!' }]}
                            >
                                <Input placeholder="Enter Designation" />
                            </Form.Item>

                            <Form.Item
                                label="Present Pay"
                                name="present_pay"
                                rules={[{ required: true, message: 'Please enter the present pay!' }]}
                            >
                                <Input
                                    placeholder="Enter Present Pay"
                                    type="number"
                                    min={0}
                                    onChange={handlePayChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Rate of Increment"
                                name="rate_increment"
                                rules={[{ required: true, message: 'Please enter the rate of increment!' }]}
                            >
                                <Input
                                    placeholder="Enter Rate of Increment"
                                    type="number"
                                    min={0}
                                    onChange={handlePayChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Future Pay"
                                name="future_pay"
                                rules={[{ required: true, message: 'Please enter the future pay!' }]}
                            >
                                <Input
                                    placeholder="Auto-calculated Future Pay"
                                    value={futurePay}
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                label="Effect Date"
                                name="effect_date"
                                rules={[{ required: true, message: 'Please select the effect date!' }]}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    style={{ width: '100%' }}
                                    placeholder="Select Effect Date"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Next Increment Date"
                                name="next_date"
                                rules={[{ required: true, message: 'Please select the next increment date!' }]}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    style={{ width: '100%' }}
                                    placeholder="Select Next Increment Date" // Updated placeholder for clarity
                                />
                            </Form.Item>

                            <Form.Item
                                label="DDO Name And Qualifications"
                                name="ddo_name"
                                rules={[{ required: true, message: 'Please enter the DDO name!' }]}
                            >
                                <Input placeholder="Enter DDO Name" />
                            </Form.Item>
                        </div>
                    </Card>

                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default IncrementForm;
