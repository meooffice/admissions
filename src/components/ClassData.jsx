import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ id, class_name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/class/${class_name}`);
  };

  return (
    <div
      className="stats shadow bg-lemon text-primary-content cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={handleClick}
      key={id}
    >
      <div className="stat">
  <div className="stat-title font-extrabold text-2xl text-primary">Class</div>
  <div className="stat-value text-4xl text-black-200">{class_name}</div>
  <div className="stat-desc text-lg  text-gray-900">Click to view details</div>
</div>
    </div>
  );
};

const ClassData = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://hsbackendpkm.vercel.app/classes')
      .then(response => {
        setClasses(response.data.classes);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-900">Find Your Class here</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {classes.map(({ id, class_name }) => (
          <ClassCard key={id} id={id} class_name={class_name} />
        ))}
      </div>
    </div>
  );
};

export default ClassData;
