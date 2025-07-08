function Header({theme, onChangeTheme}){
    return (
        <header>
            <div className="header-content">Header</div>
            <div className="theme-bar">
            <select value={theme} onChange={(e)=> onChangeTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            </div>
        </header>
    )
}

export default Header;