import React, { useState, useEffect } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const CustomForm = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [subject, setSubject] = useState('');
  const [achievements, setAchievements] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hsbackendpkm.vercel.app/staff');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('error', 'Error fetching data');
      }
    };
    fetchData();
  }, []);

  const showToast = (type, message) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000); // Toast disappears after 4s
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    const isLessThan100KB = file.size / 1024 < 100;
    if (!isImage) showToast('error', 'You can only upload image files!');
    if (!isLessThan100KB) showToast('error', 'Image must be smaller than 100KB!');
    return isImage && isLessThan100KB;
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }
    const storageRef = ref(storage, `images/${uuidv4()}-${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const uploadedImageUrl = await getDownloadURL(storageRef);
      setImageUrl(uploadedImageUrl);
      setErrorMessage('');
      showToast('success', 'Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Error uploading image.');
      showToast('error', 'Error uploading image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      showToast('error', 'Please upload an image first.');
      return;
    }

    const staffData = {
      name,
      designation,
      email,
      phoneNo,
      qualifications,
      subject,
      achievements,
      imageUrl,
    };

    try {
      if (editingRow !== null) {
        await axios.put(`https://hsbackendpkm.vercel.app/staff/${editingRow}`, staffData);
        showToast('success', 'Data updated successfully');
      } else {
        await axios.post('https://hsbackendpkm.vercel.app/submit', staffData);
        showToast('success', 'Form submitted successfully');
      }

      setName('');
      setDesignation('');
      setEmail('');
      setPhoneNo('');
      setQualifications('');
      setSubject('');
      setAchievements('');
      setFile(null);
      setImageUrl('');
      setEditingRow(null);

      const response = await axios.get('https://hsbackendpkm.vercel.app/staff');
      setData(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('error', 'Error submitting form.');
    }
  };

  const handleEdit = (record) => {
    setEditingRow(record.id);
    setName(record.name);
    setDesignation(record.designation);
    setEmail(record.email);
    setPhoneNo(record.phoneNo);
    setQualifications(record.qualifications);
    setSubject(record.subject);
    setAchievements(record.achievements);
    setImageUrl(record.imageUrl);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hsbackendpkm.vercel.app/staff/${id}`);
      showToast('success', 'Data deleted successfully');
      const response = await axios.get('https://hsbackendpkm.vercel.app/staff');
      setData(response.data);
    } catch (error) {
      console.error('Error deleting data:', error);
      showToast('error', 'Error deleting data.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Toast Container */}
      <div className="toast toast-top toast-end z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <div className="badge badge-xl badge-info mt-1 text-lg font-bold px-6 py-3">
          Staff Profiles
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="card bg-base-200 shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Staff Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Name" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Designation" className="input input-bordered w-full" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
            <input type="email" placeholder="Email" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Phone No" className="input input-bordered w-full" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
            <input type="text" placeholder="Qualifications" className="input input-bordered w-full" value={qualifications} onChange={(e) => setQualifications(e.target.value)} required />
            <input type="text" placeholder="Subject" className="input input-bordered w-full" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <input type="text" placeholder="Achievements" className="input input-bordered w-full col-span-full" value={achievements} onChange={(e) => setAchievements(e.target.value)} />
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="flex justify-center mt-10">
          <div className="card bg-base-200 shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center">Image Upload</h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <label className="btn btn-outline cursor-pointer">
                <UploadOutlined />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile && beforeUpload(selectedFile)) {
                      setFile(selectedFile);
                    }
                  }}
                />
                Select Image
              </label>

              <button type="button" className="btn btn-accent" onClick={handleUpload}>
                Upload Image
              </button>
            </div>

            {imageUrl && (
              <div className="mt-4 text-center">
                <p className="font-medium">Image Preview:</p>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-32 h-40 object-cover border-2 border-neutral rounded mx-auto mt-2"
                />
              </div>
            )}
          </div>
        </div>


        {errorMessage && <p className="text-error text-sm text-center">{errorMessage}</p>}

        <div className="text-center">
          <button type="submit" className="btn btn-outline  btn-primary">
            {editingRow !== null ? 'Update Form' : 'Submit Form'}
          </button>
        </div>
      </form>

      {/* STAFF CARDS */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.id} className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="avatar avatar-online">
                  <div className="w-24 rounded-full">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.designation}</p>
                </div>
              </div>

              <ul className="mt-4 flex flex-col gap-1 text-sm">
                <li><strong>Email:</strong> {item.email}</li>
                <li><strong>Phone:</strong> {item.phoneNo}</li>
                <li><strong>Qualifications:</strong> {item.qualifications}</li>
                <li><strong>Subject:</strong> {item.subject}</li>
                <li><strong>Achievements:</strong> {item.achievements}</li>
              </ul>

              <div className="mt-4 flex justify-between items-center">
                <button className="btn btn-outline btn-sm btn-primary" onClick={() => handleEdit(item)}>
                  Update
                </button>
                <button className="btn btn-outline btn-sm btn-error" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomForm;
