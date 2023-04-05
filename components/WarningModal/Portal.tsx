import ReactDOM from "react-dom";

function ModalWrapper({ children }) {
  const el = document.getElementById("portal");
  return ReactDOM.createPortal(children, el);
}

export default ModalWrapper;
