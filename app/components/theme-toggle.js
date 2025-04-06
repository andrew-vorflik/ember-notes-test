import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ThemeToggle extends Component {
  @service storage;
  @tracked isDarkMode = false;

  constructor() {
    super(...arguments);
    this.loadThemeFromStorage();
    this.initBodyClasses();
  }

  initBodyClasses() {
    document.body.classList.add('dark:bg-gray-900', 'bg-gray-50');
  }

  loadThemeFromStorage() {
    const storedTheme = this.storage.getTheme();

    if (storedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    } else {
      this.isDarkMode = false;
      document.body.classList.remove('dark');
    }
  }

  @action
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      this.storage.setTheme('dark');
    } else {
      document.body.classList.remove('dark');
      this.storage.setTheme('light');
    }
  }
}
