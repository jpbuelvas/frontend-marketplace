const InputGroup = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  iconClass,
}) => {
  return (
    <div className="mb-3 input-group">
      <span className="input-group-text">
        <i className={iconClass}></i>
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="form-control"
      />
    </div>
  );
};

export default InputGroup;
