import axios from 'axios'
import urlJoin from 'url-join'

class GhRaw {
  constructor({
    repository,
    blob = 'master',
    branch,
    commit,
  } = {}) {  
    this.repository = repository;
    this.blob = commit || branch || blob;
    this.axios = axios.create({
      baseURL: 'https://raw.githubusercontent.com/'
    })
  }
  
  get(path, options = {}) {

    const repository = options.repository || this.repository;
    const blob = options.commit || options.branch || options.blob || this.blob;
    
    if (!repository) throw new Error('gh-raw: options.repository is required')
   
    return this.axios.get(urlJoin(repository, blob, path)).then(res => res.data)
  } 

  extend(options) {
    return new GhRaw({
      repository: this.repository,
      blob: this.blob,
      ...options,
    })
  }
}

// make default request object
const ghRaw = new GhRaw();

export default ghRaw