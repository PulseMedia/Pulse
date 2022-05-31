const map = {
  "READ_FILE": {
    args: [ "STRING" ]
  },
  "WRITE_FILE": {
    args: [ "STRING", "STRING" ]
  },
  "APPEND_FILE": {
    args: [ "STRING", "STRING" ]
  },
  "DELETE_FILE": {
    args: [ "STRING" ]
  },
  "EXISTS_FILE": {
    args: [ "STRING" ]
  }
}

const api = {

}

import { presenter } from "../presenter.js";
class File extends presenter {

  constructor(path = ""){
    super();
    this.path = path;
  }

  async delete(){
    return await this.api.deleteFile(this.path);
  }

  async exists(){
    return await this.api.existsFile(this.path);
  }

  async read(){
    return await this.api.readFile(this.path);
  }

  async write(content){
    return await this.api.writeFile(this.path, content);
  }

  async append(content){
    return await this.api.appendFile(this.path, content);
  }

}

export default { map, api, presenter: File }
