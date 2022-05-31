const map = {
  "FROM_PLAYLIST_URL": {
    args: [ "STRING" ]
  }
}

const api = {
  fromPlaylistUrl(url){
    if(url.includes("/get.php?")){
      return url.replace("/get.php?", "/xmltv.php?");
    }
  }
}

export default { map, api }
