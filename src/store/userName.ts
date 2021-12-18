import { observable } from 'mobx';

const userName = observable({
  name: '',
  setUserName(inputName: string) {
    this.name = inputName;
  },
});

export default userName;
