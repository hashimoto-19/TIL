export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <p className="logo">hashimoto-19</p>
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
