import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '' });

  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:4000/contacts');
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/contacts', form);
    fetchContacts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📇 Contact Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {contacts.map((c, i) => (
          <li key={i}>{c.name} - {c.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
