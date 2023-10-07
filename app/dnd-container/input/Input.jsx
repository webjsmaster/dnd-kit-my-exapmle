const Input = ({name, value, placeholder, onChange}) => {
    return (
        <input
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="border p-2 w-full rounded-lg shadow-lg hover:shadow-xl"
        ></input>
    );
};

export default Input;
