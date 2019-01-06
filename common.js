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


//Storage keys
var local_pwd = "AESpassword";
var local_data = "decrypted";
var remote_data = "encrypted";


//firebase get,set
var dbref = firebase.database().ref().child(remote_data);
//get data
function getData(func){ //get remote, decrypt, save local, (optional: function)
  dbref.once("value").then( snapshot => saveLocalThen(decrypt(snapshot.val()), func) ); 
}
//save data
function saveData(func){ //get local, encrypt, save remote, (optional: function)
  dbref.set(encrypt(getLocal()), func);
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
function addItem(url, name){
  if (url){
    var newdata = JSON.parse(getLocal());
    if (!newdata) newdata = [];
    if (!name) name = url;
    newdata.push({'href':url, 'text':name});
    saveLocal(JSON.stringify(newdata));
  }
}

//delete item
function delItem(name){
  var newdata = traverse(JSON.parse(getLocal()),name);
  saveLocal(JSON.stringify(newdata));
}

//Traverse json
function traverse(o,name){
  jQuery(o).each(function (index){
    if (o[index].nodes) {
      o[index].nodes = traverse(o[index].nodes,name);
    }
    if(o[index].text == name){
      o.splice(index,1);
      return false;
    }
  });
  return o;
}

