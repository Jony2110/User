import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser, editUser } from './redux/usersSlice';
import EditModal from './EditModal';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'winter';
    document.querySelector('html').setAttribute('data-theme', savedTheme);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age || isNaN(age) || age <= 0) newErrors.age = 'Valid age is required';
    return newErrors;
  };

  const handleAddUser = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(addUser({ id: Date.now(), name, age: Number(age) }));
      setName('');
      setAge('');
      setErrors({});
    }
  };

  const handleTheme = (event) => {
    const themeMode = event.target.checked ? 'night' : 'winter';
    document.querySelector('html').setAttribute('data-theme', themeMode);
    localStorage.setItem('theme', themeMode);
  };

  const handleRemoveUser = (userId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      dispatch(removeUser(userId));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (user) => {
    dispatch(editUser(user));
    setIsEditModalOpen(false);
  };

  return (
   <div>
     <div className="p-4 max-w-md mx-auto">
      <div className='flex justify-center'>
      <h1 className='text-center '>
        Create by <br /> <a className='text-blue-600 hover:underline' href="https://github.com/Jony2110/">JONNY</a>
      </h1>
        <label className="swap swap-rotate ml-32">
          <input type="checkbox" onClick={handleTheme} />
          {/* sun icon */}
          <svg
            className="swap-on h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>
          {/* moon icon */}
          <svg
            className="swap-off h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="border rounded-md p-2 mr-2 w-full mt-20"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <input
          type="number"
          className="border rounded-md p-2 w-full mt-5"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 w-full rounded-md " onClick={handleAddUser}>
        Add User
      </button>

      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="mb-2 p-2 border">
            <div className="flex justify-between">
              <span>
                {user.name} - {user.age} years old
              </span>
              <div>
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={editingUser || {}}
        onSave={handleSaveEdit}
      />
    </div>
   </div>
  );
}

export default App;
