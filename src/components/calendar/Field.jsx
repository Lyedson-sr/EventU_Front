import "./newEventU.css";

const Field = ({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    errorMsg,
    large = false,
    icon = null,
    children = null,
    inputRef = null, 
    handleIconClick = null, 
}) => {
    return (
        <div className={`field-n ${large ? "large-n" : ""}`}>
            <label>{label}</label>

            {/* Estrutura para Data/Hora com ícone */}
            {type === "date-icon" || type === "time-icon" ? (
                <div className="input-with-icon-n">
                    <input
                        ref={inputRef} 
                        type={type === "date-icon" ? "date" : "time"} 
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className={error ? "input-error-n" : ""}
                    />
                    <span className="icon-n" onClick={handleIconClick}> 
                        {icon}
                    </span>
                </div>
            ) : type === "select" ? (
                <select value={value} onChange={onChange} className={error ? "input-error-n" : ""}>
                    {children}
                </select>
            ) : type === "textarea" ? (
                <textarea // Este é o componente usado pela Descrição
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={error ? "input-error-n" : ""}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={error ? "input-error-n" : ""}
                />
            )}

            {error && <span className="error-msg-n">{errorMsg}</span>}
        </div>
    );
};

export default Field;
