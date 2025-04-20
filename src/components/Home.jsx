import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Contact, School, GraduationCap, Users } from 'lucide-react';
import c1 from '../assets/images/c1.png';
import c2 from '../assets/images/c2.png';
import c3 from '../assets/images/c3.png';
import c4 from '../assets/images/c4.png';
import c5 from '../assets/images/c5.png';
import c6 from '../assets/images/c6.png';
import c7 from '../assets/images/c7.png';
import c8 from '../assets/images/c8.png';
import c9 from '../assets/images/c9.png';
import c10 from '../assets/images/c10.png';

const images = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10];


const Home = () => {
  const [current, setCurrent] = useState(0);
  const [card1Data, setCard1Data] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [expandedCardIds, setExpandedCardIds] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = document.getElementById(`item${current + 1}`);
    const container = carouselRef.current;

    if (target && container) {
      container.scrollTo({
        left: target.offsetLeft,
        behavior: 'smooth'
      });
    }
  }, [current]);

  const fetchCard1Data = async () => {
    try {
      const response = await fetch('https://hsbackendpkm.vercel.app/get-card1-data');
      const data = await response.json();
      setCard1Data(data);
    } catch (error) {
      console.error('Error fetching card 1 data:', error);
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('https://hsbackendpkm.vercel.app/staff');
      setStaffData(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      alert('Failed to fetch staff data');
    }
  };

  useEffect(() => {
    fetchCard1Data();
    fetchStaffData();
  }, []);

  const toggleCard = (id) => {
    setExpandedCardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderTable = () => (
    <div className="flex flex-col lg:flex-row gap-6 mt-10 justify-between">
      <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-md shadow-md w-full lg:w-1/4 text-sm">
        <h3 className="font-semibold text-lg text-blue-700 mb-4 flex items-center gap-2">
          <School size={20} /> Facilities Providing
        </h3>
        <ul className="list-disc list-inside text-blue-900 space-y-2">
          <li>Uniform and Belt</li>
          <li>Text Books and Note Books</li>
          <li>Bag and Shoes</li>
          <li>Oxford or Pictorial Dictionary</li>
          <li>Sports Material</li>
          <li>Midday Meal</li>
        </ul>
      </div>

      <div className="w-full lg:w-2/4 bg-white rounded-md shadow-md border border-gray-300">
        <div className="bg-yellow-200 text-center py-2 border-b border-gray-900 rounded-t-md">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
            <Users size={20} /> School Strength
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-sm text-center border-2 border-gray-900">
            <thead className="bg-base-200 sticky top-0 z-10">
              <tr>
                <th className="border border-gray-900">Class</th>
                <th className="border border-gray-900">SC<br />Boys</th>
                <th className="border border-gray-900">SC<br />Girls</th>
                <th className="border border-gray-900">ST<br />Boys</th>
                <th className="border border-gray-900">ST<br />Girls</th>
                <th className="border border-gray-900">BC<br />Boys</th>
                <th className="border border-gray-900">BC<br />Girls</th>
                <th className="border border-gray-900">OC<br />Boys</th>
                <th className="border border-gray-900">OC<br />Girls</th>
              </tr>
            </thead>
            <tbody>
              {card1Data.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-300'}>
                  {/* First column styled like header and with border */}
                  <td className="font-medium bg-base-200 border border-gray-900">
                    Class {rowIndex + 6}
                  </td>

                  {/* Other cells with alternating column color and border */}
                  {row.slice(1, 9).map((val, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border-1 border-gray-900 ${colIndex % 2 !== 0 ? 'bg-gray-200' : ''}`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="bg-green-100 border-l-4 border-green-600 p-6 rounded-md shadow-md w-full lg:w-1/4 text-sm">
        <h3 className="font-semibold text-lg text-green-700 mb-4 flex items-center gap-2">
          <GraduationCap size={20} /> Our School Mission
        </h3>
        <ul className="list-disc list-inside text-green-900 space-y-2">
          <li>Provide Free Education</li>
          <li>Nutritional food</li>
          <li>Healthy Physical & Mental Growth</li>
          <li>Stress Free Education</li>
          <li>Develop Creativity & Thinking</li>
          <li>Morality and Values</li>
        </ul>
      </div>
    </div>
  );

  const renderStaffCards = () => (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <Contact size={24} /> Meet Our Staff
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffData.map((item) => {
          const isExpanded = expandedCardIds.includes(item.id);
          return (
            <div key={item.id} className="card bg-base-100 shadow-md border border-gray-200">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.designation}</p>
                  </div>
                </div>

                {isExpanded && (
                  <ul className="mt-4 text-sm space-y-1">
                    <li><strong>Email:</strong> {item.email}</li>
                    <li><strong>Phone:</strong> {item.phoneNo}</li>
                    <li><strong>Qualifications:</strong> {item.qualifications}</li>
                    <li><strong>Subject:</strong> {item.subject}</li>
                    <li><strong>Achievements:</strong> {item.achievements}</li>
                  </ul>
                )}

                <button
                  className="btn btn-sm btn-outline btn-primary mt-4 w-full"
                  onClick={() => toggleCard(item.id)}
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-yellow-100 to-blue-100">

      {/* Carousel */}
      <div className="carousel w-full mb-8 rounded-xl overflow-hidden shadow-2xl bg-yellow-50 border border-yellow-300" ref={carouselRef}>
        {images.map((img, index) => (
          <div
            key={index}
            id={`item${index + 1}`}
            className="carousel-item w-full transition-all duration-700 ease-in-out"
          >
           <div className="flex items-center justify-center h-[300px] w-full bg-gradient-to-r from-rose-100 via-orange-100 to-yellow-100">

              <img
                src={img}
                className="max-h-full max-w-full object-contain"
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Buttons */}
      <div className="flex justify-center gap-2 py-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`btn btn-xs ${current === index ? 'btn-primary' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-blue-800 my-8">
        Welcome! <br /> Z P P HIGH SCHOOL - P KOTTAM
      </h2>

      {/* Info Cards & Table */}
      {renderTable()}

      {/* Staff Section */}
      {renderStaffCards()}

      {/* Footer */}
      <footer className="text-center mt-16 text-gray-600 text-sm">
        Created by Rama Sekhar ©2024
      </footer>
    </div>
  );
};

export default Home;
