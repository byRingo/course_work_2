export default function InputSection({ onChange, onBlur, value, name, type }) {
  return (
    <input
      value={value}
      type="text"
      name={name}
      placeholder={"Enter " + name}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
    />
  );
}
