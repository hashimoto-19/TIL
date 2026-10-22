import { Link } from 'react-router-dom'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <Link className="logo" to="/">
        hashimoto-19
      </Link>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label="テーマを切り替える"
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  )
}
