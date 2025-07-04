import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: import.meta.env.VITE_DEMO_PAGE_BASE_URL,
      label: 'Basic Usage',
      description: 'Simple autoplay example',
    },
    {
      path: `${import.meta.env.VITE_DEMO_PAGE_BASE_URL}/dynamic-audio`,
      label: 'Dynamic Audio',
      description: 'Switch audio sources',
    },
  ];

  return (
    <nav
      className="text-custom-inverse px-8 py-8 mb-8 rounded-xl shadow-custom-lg"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
      }}
    >
      <div className="text-center mb-8">
        <h1 className="m-0 mb-2 text-4xl md:text-responsive-xl font-bold shadow-md">React Browse Autoplay Demo</h1>
        <p className="m-0 text-lg opacity-90 font-light">
          Interactive showcase of scroll-based audio autoplay features
        </p>
      </div>
      <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-4 grid-responsive">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-custom-md ${
              location.pathname === item.path ? 'bg-custom-overlay shadow-custom-md' : ''
            }`}
          >
            <Link
              to={item.path}
              className={`block px-6 py-6 md:px-4 text-custom-inverse-muted no-underline transition-all duration-200 rounded-lg hover:bg-custom-overlay ${
                location.pathname === item.path ? 'text-custom-inverse' : 'hover:text-custom-inverse'
              }`}
            >
              <div className="flex flex-col gap-2">
                <strong className="text-xl font-semibold">{item.label}</strong>
                <span className="text-sm opacity-80 font-light">{item.description}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
