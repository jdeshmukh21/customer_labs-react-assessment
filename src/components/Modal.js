import React from 'react';

function Modal({
  open,
  onClose,
  segmentName,
  setSegmentName,
  schemas,
  addValue,
  setAddValue,
  availableOptions,
  SCHEMA_OPTIONS,
  handleAddSchema,
  handleSchemaChange,
  handleRemoveSchema,
  handleSave
}) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header"><div className="modal-title">Saving Segment</div></div>
        <div className="modal-main">
          <label className="label-main">Enter the Name of the Segment</label>
          <input
            className="segment-input"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={e => setSegmentName(e.target.value)}
          />
          <div className="modal-desc">
            To save your segment, you need to add the schemas to build the query
          </div>
          <div className="legend">
            <span><span className="dot user"></span> User Traits </span>
            <span style={{marginLeft:16}}><span className="dot group"></span> Group Traits </span>
          </div>
          <div className="schema-list-box">
            {schemas.map((sc, idx) => (
              <div className="schema-row" key={idx}>
                <span className={`dot ${sc.traitType}`}></span>
                <select
                  className="schema-select"
                  value={sc.value}
                  onChange={e => handleSchemaChange(idx, e.target.value)}
                >
                  {SCHEMA_OPTIONS.filter(
                    opt => opt.value === sc.value || !schemas.some(scm => scm.value === opt.value)
                  ).map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <button className="remove-btn" onClick={() => handleRemoveSchema(idx)}>
                  <span style={{fontWeight:700,fontSize:'1.2rem'}}>&ndash;</span>
                </button>
              </div>
            ))}
            <div className="add-dropdown-row">
              <select
                className="schema-select"
                value={addValue}
                onChange={e => setAddValue(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button className="add-schema-link" disabled={!addValue} onClick={handleAddSchema}>
                + Add new schema
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="save-btn" disabled={!segmentName || schemas.length === 0 || schemas.some(s => !s.value)} onClick={handleSave}>
            Save the Segment
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
