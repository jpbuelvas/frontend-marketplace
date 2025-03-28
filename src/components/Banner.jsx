import { banner01 } from "../assets/images/index";

function Banner() {
  const bannerStyle = {
    backgroundImage: `url(${banner01})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "300px",
    width: "100vw", // Hace que ocupe todo el ancho de la pantalla
    flex: "0  auto",
    display: "flex",
  };

  return (
    <div className="w-100" style={bannerStyle}>
      {/* Overlay para oscurecer un poco el banner si deseas */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      ></div>
    </div>
  );
}

export default Banner;
