// INSERT "Initialize Firebase" SNIPPET ('var config" ... "firebase.initializeApp(config);"
//========================================
  var config = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXX.firebaseapp.com",
    databaseURL: "https://XXXXXX.firebaseio.com",
    projectId: "XXXXXXXX",
    storageBucket: "",
    messagingSenderId: "XXXXXXXXXXX"
  };
  firebase.initializeApp(config);
//========================================


function debug(lbl) {
  console.log( lbl + ": " );
};

function Config(local, remote, remember) {

  this.tjson;
  this.tdata;
  this.pwd;
  this.expanded = new Set();

  // STORAGE KEYS
  this.LOCAL = local ? local : "bookmarks"; 
  this.REMOTE = remote ? remote : "encdata";
  this.REMEMBER = (remember=="false") ? false : true; //remember password?

  // LOCAL DATA
  this.storeLocal = function(str) { if (this.REMEMBER) localStorage.setItem(this.LOCAL, str); return true; };
  this.backupLocal = function() { if (this.REMEMBER) localStorage.setItem(this.LOCAL+'BAK', this.tjson); return true; };

  // SAVING
  this.save = function(data) {
    this.tdata = data;
    this.tjson = JSON.stringify(data);
    return this.storeLocal(this.tjson);
  };
  this.saveStr = function(json) {
    this.tjson = json;
    this.tdata = JSON.parse(json);
    return this.storeLocal(this.tjson);
  };
  this.saveExpanded = function(){ localStorage.setItem(G.LOCAL+"-expanded", JSON.stringify(Array.from(this.expanded)));}

  // LOAD LOCAL
  this.saveStr(localStorage.getItem(this.LOCAL));
  if (localStorage.getItem(this.LOCAL+"-expanded")){ 
    this.expanded = new Set(JSON.parse(localStorage.getItem(this.LOCAL+"-expanded")));
  }

  // REMOTE DATA (async)
  this.dbref = firebase.database().ref().child(this.REMOTE);
  this.fetchCallback = function(json, func) {
    this.saveStr(json); 
    if (func) func();
  };
  this.fetchData = function(func) { 
    this.dbref.once("value").then( 
      snapshot => this.fetchCallback(this.decrypt(snapshot.val()), func) //fetch->decrypt
    ); 
  };
  this.postData = function(func) { 
    this.dbref.set(this.encrypt(this.tjson), func); //encrypt->post
  };

  // PASSWORDS, ENCRYPT/DECRYPT
  this.getPassword = function() { 
    if (this.pwd) return this.pwd;
    this.pwd = localStorage.getItem(this.LOCAL+"-pwd");
    if (!this.pwd){
      this.pwd = prompt('Encryption Password');
      if (this.REMEMBER) localStorage.setItem(this.LOCAL+"-pwd", this.pwd);
    }
    return this.pwd;
  };
  this.encrypt = function(str) { return CryptoJS.AES.encrypt(str, this.getPassword()).toString() };
  this.decrypt = function(str) {
    try{
      return CryptoJS.AES.decrypt(str, this.getPassword()).toString(CryptoJS.enc.Utf8);
    }
    catch(err){ 
      console.log("BAD PASSWORD?");
      this.pwd = null; //forget
      localStorage.removeItem(this.LOCAL+"-pwd");
      return null;
    };
  };
}

//add item
function addItem(url){
  if (url){
    var newdata = G.tdata;
    if (!newdata) newdata = [];
    newdata.push({'href':url, 'text':url});
    G.save(newdata);
    return true;
  }
}

//delete, cut, paste
function cutItem(name, moveto){
  var cutobj = jsonQ(G.tdata);
  //cut
  var cutpath = cutobj.find("text", function (){return this==name}).path();
  cutpath.pop();
  var elx = cutobj.pathValue(cutpath); //cut for paste
  //delete
  var cutidx = cutpath.pop();
  var cuttree = cutobj.pathValue(cutpath);
  cuttree.splice(cutidx,1); 
  cutobj.setPathValue(cutpath, cuttree);
  //paste
  if (moveto){ 
    var pobj = jsonQ(G.tdata);
    try {
      var pastepath = pobj.find("text", function (){return this==moveto}).path();
      //error, else existing folder...
      pastepath.pop();
      var elp = pobj.pathValue(pastepath); //folder
      elp.nodes.push(elx); //append
      pobj.setPathValue(pastepath, elp); 
    }
    catch(err){ //new folder
      G.tdata.push({"text": moveto, "nodes": [elx]});
    }
  }
  G.save(G.tdata);
  return true;
}

