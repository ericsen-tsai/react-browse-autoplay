import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/react-browse-autoplay',
      label: 'Basic Usage',
      description: 'Simple autoplay example',
    },
    {
      path: '/react-browse-autoplay/dynamic-audio',
      label: 'Dynamic Audio',
      description: 'Switch audio sources',
    },
  ];

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>React Browse Autoplay Demo</h1>
        <p>Interactive showcase of scroll-based audio autoplay features</p>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            <Link to={item.path} className="nav-link">
              <div className="nav-link-content">
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
