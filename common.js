// INSERT YOUR "Initialize Firebase" CODE
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



function tdebug(str){
  $('#tdebug').val(str + '\n' + $('#tdebug').val());
}

//LocalStorage keys
var local_pwd = "pwd";
var local_data = "jsonstr";
var remote_data = "encdata";


//firebase get,set
var dbref = firebase.database().ref().child(remote_data);
//get data
function getData(func){ //get remote, decrypt, save local, (optional: function)
  dbref.once("value").then( snapshot => saveLocalThen(decrypt(snapshot.val()), func) ); 
  tdebug('loading and decrypting (remote)'); 
}
//save data
function saveData(func){ //get local, encrypt, save remote, (optional: function)
  dbref.set(encrypt(getLocal()), func);
  tdebug('encrypting and saving (remote)'); 
}


//get local
function getLocal(){
  return localStorage.getItem(local_data);
}
//save local, function
function saveLocalThen(data, func){
  saveLocal(data);
  func();
}
//save local
function saveLocal(data){
  localStorage.setItem(local_data, data);
}


//decrypt, encrypt
function encrypt(data){
  return CryptoJS.AES.encrypt(data, getpwd()).toString();
}
function decrypt(data){
  try{
    return CryptoJS.AES.decrypt(data, getpwd()).toString(CryptoJS.enc.Utf8);
  }
  catch(err){
    localStorage.removeItem(local_pwd);
    return null; //bad password?
  }
}
function getpwd(){
  var pwd = localStorage.getItem(local_pwd);
  if (!pwd){
    pwd = prompt('Encryption Password');
    localStorage.setItem(local_pwd, pwd);
  }
  return pwd;
}


//add item
function addItem(url){
  tdebug('adding ' + url); 
  if (url){
    var newdata = JSON.parse(getLocal());
    if (!newdata) newdata = [];
    newdata.push({'href':url, 'text':url});
    saveLocal(JSON.stringify(newdata));
  }
}

//delete or move item
function cutItem(name, moveto){
  tdebug('cutting ' + name); 
  var cutobj = traverse(JSON.parse(getLocal()), name, null);
  if (moveto){ //move
    tdebug('pasting to ' + moveto); 
    var pasteobj =  traverse(cutobj.obj, moveto, cutobj.node);
    if (!pasteobj.node){ //no target matched
      pasteobj.obj.push({"nodes": [cutobj.node], "text": moveto}); //new folder
    }
    cutobj = pasteobj; //sync
  }
  saveLocal(JSON.stringify(cutobj.obj));
}

//Traverse json
function traverse(o, name, paste){ //node to move
  var node;
  jQuery(o).each(function (index){ //loop
    if (o[index].nodes) {
      obj = traverse(o[index].nodes, name, paste); //deeper
      o[index].nodes = obj.obj;
      if (obj.node) node = obj.node;
    }
    if (paste){ //move
      if(o[index].text == name){ 
        node = o[index];
        o[index].nodes.push(paste); //paste
        return false;
      }
    }
    else{ 
      if(o[index].text == name){ 
        node = o[index]; //cut
        o.splice(index,1);
        return false;
      }
    }
  });
  return {"obj":o, "node":node};
}
