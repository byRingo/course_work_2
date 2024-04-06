import classes from "./Button.module.css";
// eslint-disable-next-line react/prop-types
export default function Button({ children, isActive, ...props }) {
  return (
    <button
      {...props}
      className={
        isActive ? `${classes.button} ${classes.active}` : classes.button
      }
    >
      {children}
    </button>
  );
}
