import React, { useState } from 'react';
import Modal from './components/Modal';
import './App.css';

const SCHEMA_OPTIONS = [
  { label: 'First Name', value: 'first_name', traitType: 'user' },
  { label: 'Last Name', value: 'last_name', traitType: 'user' },
  { label: 'Gender', value: 'gender', traitType: 'user' },
  { label: 'Age', value: 'age', traitType: 'user' },
  { label: 'Account Name', value: 'account_name', traitType: 'group' },
  { label: 'City', value: 'city', traitType: 'group' },
  { label: 'State', value: 'state', traitType: 'group' }
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]); // [{value, traitType}]
  const [addValue, setAddValue] = useState('');

  const webhookUrl = 'https://webhook.site/8a6c4c12-8867-471f-9ffc-4af1799c7e3e'; // Replace as needed

  // Only show options not already selected
  const availableOptions = SCHEMA_OPTIONS.filter(
    opt => !schemas.some(sc => sc.value === opt.value)
  );

  // Add selected schema to blue box
  const handleAddSchema = () => {
    if (!addValue) return;
    const option = SCHEMA_OPTIONS.find(opt => opt.value === addValue);
    if (option && !schemas.some(sc => sc.value === addValue)) {
      setSchemas([...schemas, { value: addValue, traitType: option.traitType }]);
      setAddValue('');
    }
  };

  // Change schema in blue box and keep all options unique
  const handleSchemaChange = (idx, val) => {
    if (schemas.some(sc => sc.value === val)) return; // Prevent duplicates
    const opt = SCHEMA_OPTIONS.find(o => o.value === val);
    const updated = schemas.map((sc, i) =>
      i === idx ? { value: val, traitType: opt.traitType } : sc
    );
    setSchemas(updated);
  };

  // Remove dropdown from blue box
  const handleRemoveSchema = idx =>
    setSchemas(schemas.filter((_, i) => i !== idx));

  // Save to server
  const handleSave = async () => {
    const payload = {
      segment_name: segmentName,
      schema: schemas.map(sc => ({ [sc.value]: SCHEMA_OPTIONS.find(opt => opt.value === sc.value)?.label }))
    };
    // await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    alert(JSON.stringify(payload, null, 2));
    setShowModal(false);
    setSegmentName('');
    setSchemas([]);
    setAddValue('');
  };

  return (
    <div className="main-bg">
      <button className="header-save-btn" onClick={() => setShowModal(true)}>
        Save segment
      </button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        segmentName={segmentName}
        setSegmentName={setSegmentName}
        schemas={schemas}
        addValue={addValue}
        setAddValue={setAddValue}
        availableOptions={availableOptions}
        SCHEMA_OPTIONS={SCHEMA_OPTIONS}
        handleAddSchema={handleAddSchema}
        handleSchemaChange={handleSchemaChange}
        handleRemoveSchema={handleRemoveSchema}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
