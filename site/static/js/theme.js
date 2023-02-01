class ThemeSwitcher {
  constructor(element) {
    this.element = element;
    this.themeSwitcherButton = this.element.querySelector("button");
    this.themeSwitcherItems = this.element.querySelectorAll("a");

    this.init();
  }

  init() {
    console.log(this.getCookie("theme"));
    this.addEventListeners();
  }

  setSystemTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      this.setActiveThemeIcon("dark");
      document.cookie = `theme=dark; expires=${new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 365
      ).toGMTString()}; path=/`;
    } else {
      document.documentElement.classList.remove("dark");
      this.setActiveThemeIcon("light");
      document.cookie = `theme=light; expires=${new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 365
      ).toGMTString()}; path=/`;
    }
    this.setActiveDropdownItem("system");
    document.cookie = `systemTheme=true; expires=${new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 365
    ).toGMTString()}; path=/`;
  }

  setDarkTheme() {
    document.documentElement.classList.add("dark");
    this.setActiveThemeIcon("dark");
    this.setActiveDropdownItem("dark");
    document.cookie = `theme=dark; expires=${new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 365
    ).toGMTString()}; path=/`;
  }

  setLightTheme() {
    document.documentElement.classList.remove("dark");
    this.setActiveThemeIcon("light");
    this.setActiveDropdownItem("light");
    document.cookie = `theme=light; expires=${new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 365
    ).toGMTString()}; path=/`;
  }

  setActiveThemeIcon(theme) {
    this.themeSwitcherButton.innerHTML = this.element.querySelector(
      `[data-theme-icon=${theme}]`
    ).innerHTML;
  }

  getCookie(cookieName) {
    let name = cookieName + "=";
    let cookieArray = document.cookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let c = cookieArray[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setActiveDropdownItem(theme) {
    this.element.querySelectorAll("[data-theme-icon]").forEach((item) => {
      item.classList.remove("text-blue-500");
    });
    this.element.querySelectorAll("[data-theme-name]").forEach((item) => {
      item.classList.remove("text-blue-500");
    });
    this.element
      .querySelector(`[data-theme-icon=${theme}]`)
      .classList.add("text-blue-500");
    this.element
      .querySelector(`[data-theme-name=${theme}]`)
      .classList.add("text-blue-500");
  }

  onThemeSwitcherItemClick(event) {
    const theme = event.target.dataset.theme;

    if (theme === "system") {
      document.cookie = `theme=; expires=${new Date(
        new Date().getTime() - 1000
      ).toGMTString()}; path=/`;
      this.setSystemTheme();
    } else if (theme === "dark") {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  addEventListeners() {
    const bindedOnThemeSwitcherItemClick =
      this.onThemeSwitcherItemClick.bind(this);

    this.themeSwitcherItems.forEach((item) => {
      item.addEventListener("click", bindedOnThemeSwitcherItemClick);
    });
  }
}

const themeSwitcher = document.querySelector("#theme-switcher");

if (themeSwitcher) {
  new ThemeSwitcher(themeSwitcher); // eslint-disable-line no-new
}
