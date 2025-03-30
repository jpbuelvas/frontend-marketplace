const SelectInput = ({ name, value, onChange, options }) => {
  return (
    <div className="mb-3">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="form-select"
      >
        <option value="">Selecciona tu rol</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
