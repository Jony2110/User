import React, { useState, useEffect } from 'react';

function EditModal({ isOpen, onClose, user, onSave }) {
  const [name, setName] = useState(user.name || '');
  const [age, setAge] = useState(user.age || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(user.name || '');
    setAge(user.age || '');
    setErrors({});
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age || isNaN(age) || age <= 0) newErrors.age = 'Valid age is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave({ ...user, name, age: Number(age) });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white p-2 mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
