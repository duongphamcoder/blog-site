function Description({ type, text }) {
  switch (type) {
    case "gmail":
    case "phone":
      return (
        <a href="#" className="description">
          {text}
        </a>
      );
    default:
      return <p className="description">{text}</p>;
  }
}

export default Description;
