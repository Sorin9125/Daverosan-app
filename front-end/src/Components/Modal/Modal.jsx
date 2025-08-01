import { useEffect, useRef } from "react";
import "./Modal.css"

function Modal({ isOpen, isClosed, children }) {
    const modalRef = useRef(null);
    useEffect(() => {
        const handleClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                isClosed();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }

    }, [isOpen, isClosed]);
    return (
        <>
            {
                isOpen ?
                    <div className="modal">
                        <div className="modal-content" ref={modalRef}>
                            <button className="modal-close" onClick={isClosed}>x</button>
                            {children}
                        </div>
                    </div> :
                    null
            }
        </>
    )
}

export default Modal;