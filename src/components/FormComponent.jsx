import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Typography, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './staff.css';

const { Title } = Typography;

const FormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (info) => {
    const selectedFile = info.file.originFileObj;

    // Validate file type and size
    if (selectedFile) {
      const isJpegOrPng = selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png';
      const isUnder500KB = selectedFile.size / 1024 <= 500;

      if (!isJpegOrPng) {
        message.error('Only .jpeg and .png files are allowed!');
        return;
      }
      if (!isUnder500KB) {
        message.error('File must be smaller than 500KB!');
        return;
      }

      setFile(selectedFile);
      message.success('File selected successfully!');
    } else {
      setFile(null);
      message.error('Please select a valid file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      message.error('Please select a file to upload.');
      return;
    }

    const storageRef = ref(storage, `images/${uuidv4()}-${file.name}`);

    try {
      setLoading(true);
      await uploadBytes(storageRef, file);
      const uploadedImageUrl = await getDownloadURL(storageRef);
      setImageUrl(uploadedImageUrl);
      message.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl) {
      message.error('Please upload an image first.');
      return;
    }

    try {
      await axios.post('https://hsbackendpkm.vercel.app/submit', {
        name,
        email,
        imageUrl,
      });
      message.success('Form submitted successfully');
      setName('');
      setEmail('');
      setFile(null);
      setImageUrl('');
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Error submitting form.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: '20px' }}>
      <Title level={2}>Submit Form</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name" required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </Form.Item>
        
        <Form.Item label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Form.Item>

        <Form.Item label="Upload Image (.jpeg/.png under 500KB)" required>
          <Upload
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleFileChange}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={!file}
            loading={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </Form.Item>

        {imageUrl && (
          <Form.Item label="Image Preview">
            <Image
              src={imageUrl}
              alt="Uploaded"
              width={120}
              height={160}
              style={{
                borderRadius: '4px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                border: '2px solid #000',
              }}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit Form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComponent;
