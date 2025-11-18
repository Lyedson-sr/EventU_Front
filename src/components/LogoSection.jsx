import Logo from "../assets/EventU-logo.png";

function LogoSection() {
  return (
    <div className="left">
      <div className="logo-container">
        <img src={Logo} alt="EventU Logo" className="logo" />
      </div>
      
      <div className="presentation-container">
        <h1 className="title">EventU</h1>
        <p className="subtitle">
          Organize sua vida acadêmica, gerencie<br />
          suas aulas, reuniões e eventos com<br />
          facilidade
        </p>
      </div>
    </div>
  );
}

export default LogoSection;
