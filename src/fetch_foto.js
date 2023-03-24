import axios from 'axios';

export default class pixabayAPIService {
  constructor() {
    this.baseUrl =
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true';
    this.key = '21559295-31b58d30a68587a7f7e8a7807';
    this.query = '';
    this.page = 1;
    this.perPage = 40;
    this.lengthArrayPhotos;
  }

  async onFetchPhotos() {
    const url = `${this.baseUrl}&page=${this.page}&per_page=${this.perPage}&key=${this.key}&q=${this.query}`;
    const res = await axios.get(url);
    this.lengthArrayPhotos = res.data.hits.length;
    return res;
  }

  incrementPages() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get getCurrentQuery() {
    return this.query;
  }

  set setNewQuery(newQuery) {
    this.query = newQuery;
  }
}
