
import darkSideLogo from "../../assets/dark-side-logo.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={darkSideLogo} alt="Prism Logo" className="h-10 w-10" />
    </div>
  );
};

export default Logo;
