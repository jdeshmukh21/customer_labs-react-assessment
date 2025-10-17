import React from 'react';

function SchemaDropdown({ idx, value, traitType, allOptions, currValues, updateSchema, removeSchema }) {
  // Show trait color dot (green for user, pink for group)
  const dotClass = traitType === 'group' ? 'dot group' : 'dot user';

  return (
    <div className="schema-row">
      <span className={dotClass}></span>
      <select
        className="schema-select"
        value={value}
        onChange={e => updateSchema(idx, e.target.value)}
      >
        {allOptions
          .filter(opt => opt.value === value || !currValues.includes(opt.value))
          .map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
      <button className="remove-btn" onClick={() => removeSchema(idx)}>
        <span style={{fontWeight:700,fontSize:'1.2rem'}}>–</span>
      </button>
    </div>
  );
}

export default SchemaDropdown;
