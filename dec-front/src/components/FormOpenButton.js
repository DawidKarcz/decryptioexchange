import { BsPlus, BsX } from "react-icons/bs";

const FormOpenButton = ({ toggle, toggleSearch }) => {
  return (
    <div className="addFormCoin-padding">
      <div className="toggleFormAppearButton" onClick={toggle}>
        {toggleSearch ? (
          <BsX className="addFormCoin" />
        ) : (
          <BsPlus className="addFormCoin" />
        )}
      </div>
    </div>
  );
};

export default FormOpenButton;
