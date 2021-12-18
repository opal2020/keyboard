import { observable } from 'mobx';

const themeMode = observable({
  mode: 'light',
  toLight() {
    this.mode = 'light';
  },
  toDark() {
    this.mode = 'dark';
  },
});

export default themeMode;
