// Importing Button Component from Ant Design to open up the cryptocurrency form
import { Button } from "antd"
const FormButton = ({setFormAppear , formAppear}) => {
  return (
   <div onClick={() => {
    setFormAppear(!formAppear);
  }}>
      <Button className="buttonAdd">Add Crypto</Button>
    </div>
  );
};

export default FormButton;
