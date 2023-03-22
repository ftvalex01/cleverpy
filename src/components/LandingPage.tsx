import '../styles/LandingPage.css';
import "../styles/NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
const logo =  require("../images/Cleverpy®.jpg")



function LandingPage() {
  return (
    <div>
      <main>
        <div className="container">
          <div className="landing-circle">
          <img src={logo} alt="imagen logo" className="landing-circle__image"></img>
          </div>
          <div className='landing-texto'>
            <div className='landing-text__titulo'>
              <h1>Prueba técnica React junior</h1>
            </div>
            <div className='landing-text__body'>
              <p>Bienvenido a mi aplicación de prueba técnica en React para el puesto de desarrollador junior.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className='footer'>
      <div>
        <h3>Desarrollado por Alejandro Suárez Sarabia</h3>
      </div>
      <div>
        <a href="https://github.com/ftvalex01">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
    </footer>
    </div>
  );
}

export default LandingPage;
