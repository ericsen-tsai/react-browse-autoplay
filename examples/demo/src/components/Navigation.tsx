import { Link, useLocation } from 'react-router-dom';

function Navigation() {
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
      className="mb-8 rounded-xl px-8 py-8 text-typography-inverse shadow-lg"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
      }}
    >
      <div className="mb-8 text-center">
        <h1 className="m-0 mb-2 font-bold text-4xl md:text-2xl">React Browse Autoplay Demo</h1>
        <p className="m-0 font-light text-lg opacity-90">
          Interactive showcase of scroll-based audio autoplay features
        </p>
      </div>
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 text-center md:grid-cols-2">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`hover:-translate-y-0.5 overflow-hidden rounded-lg transition-all hover:shadow-md ${
              location.pathname === item.path ? 'border border-border bg-bg-overlay shadow-lg' : ''
            }`}
          >
            <Link
              to={item.path}
              className={`block rounded-lg px-6 py-6 text-typography-inverse-muted no-underline transition-all hover:bg-bg-overlay md:px-4 ${
                location.pathname === item.path ? 'text-typography-inverse' : 'hover:text-typography-inverse'
              }`}
            >
              <div className="flex flex-col gap-2">
                <strong className="font-semibold text-xl">{item.label}</strong>
                <span className="font-light text-sm opacity-80">{item.description}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
