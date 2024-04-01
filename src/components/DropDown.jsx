
function DropDown({ label, options, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.value);
    }
    return (
        <>
            <select className="p-2 m-2 border-2 hover:border-blue-500 rounded-lg w-52" onChange={handleChange} >
                <option className="">{label}</option>
                {options.map((option, idx) => (
                    <option className="" key={idx} value={option}>{option}</option>
                ))}
            </select>
        </>

    )
}
export default DropDown;