import '../CSS/App.css'
import Nav, { NavItem } from './Navbar'
import ModeSwitcher from '../JS/ModeSwitcher.jsx'

function App() {
  return (
      <div> 
        <Nav className="Nav glass-navbar" brand="Zeus Angelo">
          <NavItem to="#Home">Home</NavItem>
          <NavItem to="#Projects">Projects</NavItem>
          <NavItem to="#">Skills</NavItem>
          <NavItem to="#">Certifications</NavItem>
          <NavItem to="#">Contact</NavItem>
        </Nav>

        <div>
          <ModeSwitcher className="mode-btn light" />
        </div>

        <main>
          <section className='Home' id='Home'>
            <h1>Hi, I'm Zeus Angelo Bautista</h1>
            <p>Aspiring Front-End Developer & Responsive Web Design Specialist</p>
            <p>I'm Zeus Bautista, a focused 3rd-year I.T. student dedicated to full-cycle application development. I specialize in building user-friendly web experiences and managing efficient data structures. This is supported by my Database Management certification and practical experience in preparing data for seamless system integration.</p>
            
            <a
              className="Resume"
              href="/RESUME SAMPLE.pdf"
              download="Zeus_Angelo_Bautista_Resume.pdf"
              aria-label="Download Zeus Angelo Bautista resume"
            >
              Download Resume
            </a>
          </section>

          <section className='Projects' id='Projects'>
            <div className="container">
              <h2>Projects</h2>
              <p>Real-world applications demonstrating front-end development, database management, and problem-solving skills.</p>
              <div className="projects-grid">
                <article className="project-card">
                  <div className="project-media" />
                  <div className="project-body">
                    <h3>SafeLink Mobile</h3>
                    <div className="tags">
                      <span className="tag">React Native</span>
                      <span className="tag">JavaScript</span>
                      <span className="tag">Firebase</span>
                      <span className="tag">Mobile</span>
                    </div>
                    <button className="project-cta">Code</button>
                  </div>
                </article>

                <article className="project-card">
                  <div className="project-media" />
                  <div className="project-body">
                    <h3>Room Reservation System</h3>
                    <div className="tags">
                      <span className="tag">HTML5</span>
                      <span className="tag">CSS3</span>
                      <span className="tag">JavaScript</span>
                      <span className="tag">SQL</span>
                    </div>
                    <button className="project-cta">Code</button>
                  </div>
                </article>
              </div>
            </div>
          </section>

        </main>

      </div>
  )
}

export default App