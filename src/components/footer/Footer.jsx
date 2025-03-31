import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Sección de la marca */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-3">MarketPlace</h5>
            <p>
              Somos la plataforma líder en ventas online. Encuentra productos de
              calidad y disfruta de una experiencia de compra única.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-3">Enlaces</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/products" className="text-light text-decoration-none">
                  Productos
                </a>
              </li>
              <li>
                <a href="/cart" className="text-light text-decoration-none">
                  Carrito
                </a>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-3">Soporte</h5>
            <ul className="list-unstyled">
              <li>
                <a className="text-light text-decoration-none">FAQ</a>
              </li>
              <li>
                <a className="text-light text-decoration-none">Ayuda</a>
              </li>
              <li>
                <a className="text-light text-decoration-none">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a className="text-light text-decoration-none">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-3 border-light" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              © 2025 MarketPlace. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <a className="text-light me-3">
              <i className="bi bi-facebook fs-4"></i>
            </a>
            <a className="text-light me-3">
              <i className="bi bi-twitter fs-4"></i>
            </a>
            <a className="text-light">
              <i className="bi bi-linkedin fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
