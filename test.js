var keychain = require('keychain');
var osType = process.platform;
//const util = require('util')

//const util = require('util');
//const readx = util.promisify(keychain.getPassword);

if(osType == "darwin"){
    console.log('its mac')
}else{
    console.log('its window')
}
console.log(osType)


/*const redis = require("redis");
const client = redis.createClient();
client.on('connect', function () {
    console.log('Connected!');
});*/

/*client.on("error", function (error) {
    console.error(error);
});*/ 

/*keychain.setPassword({ account: 'foo', service: 'FooBar.com', type: 'internet', password: 'baz' }, function (err) {
  
});*/ 

  /*keychain.getPassword({ account: 'foo', service: 'FooBar.com', type: 'internet' }, function (err, pass) {
        console.log('Password is', pass);
        // Prints: Password is baz
    });
*/
/*keychain.setPassword({ account: 'foo', service: 'FooBar.com', type: 'internet', password: 'baz' }, function (err) {
    keychain.getPassword({ account: 'foo', service: 'FooBar.com', type: 'internet' }, function (err, pass) {
        console.log('Password is', pass);
        // Prints: Password is baz
    });
});*/

/*keychain.getPassword({ account: 'foo', service: 'FooBar.com', type: 'internet' }, function (err, pass) {
    console.log('Password is', pass);
    // Prints: Password is baz
});*/ 

/*keychain.setPassword({ account: 'tinygitlab', service: 'tinygit', type: 'internet', password: 'first2' }, function (err) {
    console.log('saved')
});*/ 

/*var jk = keychain.getPassword({ account: 'tinygitlab', service: 'tinygit', type: 'internet' }, function (err, pass) {
return pass
    // Prints: Password is baz
});
console.log(jk)*/

/*async function key(){
    var fem = await keychain.getPassword({ account: 'tinygitlab', service: 'tinygit', type: 'internet' })
    console.log(fem)
    //return fem 
}*/
//var h = keychain.getPassword({ account: 'tinygitlab', service: 'tinygit', type: 'internet' })
//console.log(h)
//console.log(key())
/*keychain.getPassword({ account: 'foo', service: 'FooBar.com', type: 'internet' }, function (err, pass) {
    console.log('Password is', pass);
    // Prints: Password is baz
});*/ 

/*keychain.getPassword({ account: 'foo', service: 'FooBar.com', type: 'internet' }, function (err, pass) {

});*/
//console.log(hjj)


/*const { promisify } = require('util');
const exec1 = promisify(require('keychain'))
async function fara(){
 exec1.getPassword({ account: 'foo', service: 'FooBar.com', type: 'internet' }, function(err, pass){
  return pass
})
}

console.log(fara())*/ 

/*keychain.setPassword({ account: 'foo', service: 'FooBar', password: 'baz22' }, function (err) {
   
});*/ 

keychain.getPassword({ account: 'tinygitlab', service: 'tinygit' }, function (err, pass) {
    console.log('Password is', pass);
    // Prints: Password is baz
});

/*keychain.getPassword({ account: 'foo', service: 'FooBar' }, function (err, pass) {
    console.log('Password is', pass);
    // Prints: Password is baz
});*/
const keytar = require('keytar')



//console.log('getMe', getMe)

async function serviceName() {
    try {
       // var settt = await keytar.setPassword("tinygitlab", "tinygitlab", "dsfdgd")
        var getMe = await keytar.getPassword("tinygitlab", "tinygitlab")
        console.log('444', getMe)
        return getMe
    } catch (err) {
        return err
    }


}

console.log('gettt', serviceName())