import "./index.css";

export const Footer = () => {
  return (
    <footer
      className="footer"
      onClick={() => {
        window.open("https://10play.dev", "_blank");
      }}
    >
      <span className="footer-text">
        Made with <span className="heart">❤️</span> 10Play
      </span>
    </footer>
  );
};
