import React, { useState } from 'react';

const EditResource = ({ onNext }) => {
  const [formData, setFormData] = useState({
    title: 'Introduction to',
    type: 'Youtube Video',
    description: 'Discover the basics of Artificial Intelligence, including key concepts, real-world applications, and how AI is shaping our future.',
    guest: 'ibrahim khdair',
    websiteUrl: 'https://Link goes here'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form updated:', formData);
  };

  const resourceTypes = [
    'Youtube Video',
    'Article',
    'Book',
    'Podcast',
    'Course'
  ];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body p-5">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div></div>
                <h2 className="card-title mb-0 text-center">Edit this resource</h2>
                <button
                  className="btn btn-link p-0"
                  title="Options"
                >
                  <i className="bi bi-arrow-up-right-circle custom-icon" style={{
                    fontSize: '33px',
                    color: '#0b0c10',
                    borderRadius: '50%',
                    padding: '5px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffffff'
                  }}></i>
                </button>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label" style={{ textAlign: 'left', display: 'block' }}>
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label" style={{ textAlign: 'left', display: 'block' }}>
                    Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    {resourceTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label" style={{ textAlign: 'left', display: 'block' }}>
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="websiteUrl" className="form-label" style={{ textAlign: 'left', display: 'block' }}>
                    Website URL <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="websiteUrl"
                    name="websiteUrl"
                    value={formData.websiteUrl.replace('https://', '')}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: 'https://' + e.target.value }))}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="guest" className="form-label" style={{ textAlign: 'left', display: 'block' }}>
                    Guest
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="guest"
                    name="guest"
                    value={formData.guest}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResource;
