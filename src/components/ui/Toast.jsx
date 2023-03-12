import "../../styles/Toast.css";
import PropTypes from "prop-types";
// import { useEffect } from "preact/hooks";
import { useEffect, useRef } from "preact/hooks";
import Button from "./Button";
import { IoClose } from "../../assets/icons";

/**
 * Toast
 * @description display message and optional callback
 */
const Toast = ({ toast, setToast }) => {
  const ref = useRef(null);

  const resetToast = () => {
    window.removeEventListener("click", closeOnClickedOutside);
    setToast(prev => ({
      ...prev,
      show: false,
      callback: null,
      from: null,
      timeout: null,
    }));
  };

  const closeOnClickedOutside = (e) => {
    if (e.target === toast.from && ref.current === null) {
      resetToast();
      return;
    }

    if (e.target.closest(".toast") === null) {
      resetToast();
      return;
    }

    ref.current = true;
  };

  useEffect(() => {
    if (toast.show) {
      if (toast.timeout !== null) {
        setTimeout(() => {
          resetToast();
        }, toast.timeout);
      }
      ref.current = null;
      window.addEventListener("click", closeOnClickedOutside);
    } else {
      resetToast();
    }
  }, [toast.show]);

  return (
    <>
      <aside class={toast.show ? "toast toast-show" : "toast toast-hide"}>
        <div class="toast-col-1">
          <span class="toast-message">{toast.message}</span>
        </div>

        <div class="toast-col-2">
          {
            toast.callback !== null ? (
              <Button
                title="Undo"
                className="btn-primary btn-primary--darker btn-small"
                disabled={!toast.show}
                onClick={() => {
                  resetToast();
                  if (toast.callback !== null) {
                    toast.callback();
                  }
                }}
              />
            ) : null
          }
          <Button
            title={<IoClose />}
            className="btn-transparent btn-svgpair"
            disabled={!toast.show}
            onClick={resetToast}
          />
        </div>

      </aside>
    </>
  );
};

Toast.propTypes = {
  toast: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    callback: PropTypes.func,
    from: PropTypes.object,
    timeout: PropTypes.number,
  }),
  setToast: PropTypes.func.isRequired,
};

export default Toast;