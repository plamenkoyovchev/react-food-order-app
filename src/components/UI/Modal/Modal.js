import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = () => {
	return <div className={classes.backdrop}></div>;
};

const Overlay = ({ children }) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{children}</div>
		</div>
	);
};

const modalPortalElement = document.getElementById("modal-overlay");
const Modal = ({ children }) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop />, modalPortalElement)}
			{ReactDOM.createPortal(<Overlay>{children}</Overlay>, modalPortalElement)}
		</>
	);
};

export default Modal;
