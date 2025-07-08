function Input({ type, value, onChange, placeholder, name }) {
  return (
    <input
      type = {type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  );
}
export default Input;
