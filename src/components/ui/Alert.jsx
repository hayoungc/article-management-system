import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { alertActions } from "../../features/alert/alertSlice";
import { styled } from "styled-components";

const StyledAlert = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  .alert {
    --bs-alert-bg: transparent;
    --bs-alert-padding-x: 1rem;
    --bs-alert-padding-y: 1rem;
    --bs-alert-margin-bottom: 1rem;
    --bs-alert-color: inherit;
    --bs-alert-border-color: transparent;
    --bs-alert-border: 1px solid var(--bs-alert-border-color);
    --bs-alert-border-radius: 0.375rem;
    position: relative;
    padding: var(--bs-alert-padding-y) var(--bs-alert-padding-x);
    margin-bottom: var(--bs-alert-margin-bottom);
    color: var(--bs-alert-color);
    background-color: var(--bs-alert-bg);
    border: var(--bs-alert-border);
    border-radius: var(--bs-alert-border-radius);
  }

  .alert-dismissible {
    padding-right: 3rem;
  }

  .alert-success {
    --bs-alert-color: #0f5132;
    --bs-alert-bg: #d1e7dd;
    --bs-alert-border-color: #badbcc;
  }

  .alert-danger {
    --bs-alert-color: #842029;
    --bs-alert-bg: #f8d7da;
    --bs-alert-border-color: #f5c2c7;
  }

  .btn-close {
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: #000;
    background: transparent
      url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e")
      center/1em auto no-repeat;
    border: 0;
    border-radius: 0.375rem;
    opacity: 0.5;
  }

  .alert-dismissible .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 1.25rem 1rem;
  }

  button {
    cursor: pointer;
    font-size: inherit;
    line-height: inherit;
  }
`;

export function Alert() {
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useSelector((x) => x.alert?.value);

  useEffect(() => {
    dispatch(alertActions.clear());
  }, [location]);

  if (!alert) return null;

  return (
    <StyledAlert>
      <div className={`alert alert-dismissible ${alert.type}`}>
        {alert.message}
        <button
          type="button"
          className="btn-close"
          onClick={() => dispatch(alertActions.clear())}
        ></button>
      </div>
    </StyledAlert>
  );
}
