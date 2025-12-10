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
    disabled = false, // ⬅️ NOVO
}) => {
    return (
        <div className={`field-n ${large ? "large-n" : ""}`}>
            <label>{label}</label>

            {/* DATE / TIME COM ÍCONE */}
            {type === "date-icon" || type === "time-icon" ? (
                <div className={`input-with-icon-n ${disabled ? "disabled-n" : ""}`}>
                    <input
                        ref={inputRef}
                        type={type === "date-icon" ? "date" : "time"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        disabled={disabled}             // ⬅️ AQUI
                        className={error ? "input-error-n" : ""}
                    />

                    <span
                        className={`icon-n ${disabled ? "icon-disabled-n" : ""}`}
                        onClick={!disabled ? handleIconClick : undefined}   // ⬅️ Não clica quando desativado
                    >
                        {icon}
                    </span>
                </div>
            ) : type === "select" ? (
                <select
                    value={value}
                    onChange={onChange}
                    disabled={disabled}             // ⬅️ SELECT desativado
                    className={error ? "input-error-n" : ""}
                >
                    {children}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}             // ⬅️ TEXTAREA desativado
                    className={error ? "input-error-n" : ""}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}             // ⬅️ INPUT normal desativado
                    className={error ? "input-error-n" : ""}
                />
            )}

            {error && <span className="error-msg-n">{errorMsg}</span>}
        </div>
    );
};

export default Field;
