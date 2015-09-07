export default class Story {

  constructor({ title: title, description: description } = { title: 'My Story', description: '' }) {
    this.title = title;
    this.description = description;
  }

}
