
//Helper functions
var splitString = function(string){
	return string.split("");
}

//
var getKeyByValue = function ( object, value ) {
    for( var property in object ) {
        if( object.hasOwnProperty( property ) ) {
             if( object[ property ] === value )
                 return property;
        }
    }
}


//Initial variables
var string = splitString("Happy birthday!");

var alpha = "abcdefghijklmnopqrstuvwxyz";

var key = 3;


var alphaArr = splitString(alpha);

//Map letter of alpebet to index, ex key value pair: (s,18)
var indexMap = function(alphaArr){
	var alphaMap = {};
	for(i=0;i<alphaArr.length;i++){
		alphaMap[alphaArr[i]] = i;
	}
	return alphaMap;
}

var crypt = function(input,key,map,cryptFlag){
	//cryptFlag signals decrypt(false) or encrypt (true)
	var cryptMessage = [];
	var mapLength = Object.keys(map).length;
	var isUpper = false;
	for(i=0;i<input.length;i++){
		//Test for non letter characters
		if(/[^a-zA-Z]/.test(input[i]) == false){
			if(input[i] == input[i].toUpperCase()){
				input[i] = input[i].toLowerCase();
				isUpper = true;
			}
			var mapNumber = map[input[i]];
			if(cryptFlag){
				var cryptNumber = mapNumber+key;
				if(cryptNumber>mapLength){
					cryptNumber = cryptNumber - mapLength;
				}
			}
			else{
				var cryptNumber = mapNumber-key;
				if(cryptNumber<0){
					cryptNumber = cryptNumber + mapLength;
				}
			}
			cryptMessage[i] = getKeyByValue(map, cryptNumber);
			if(isUpper == true){
				cryptMessage[i] = cryptMessage[i].toUpperCase();
				input[i] = input[i].toUpperCase();
			}
			isUpper = false;
		}
		else{
			cryptMessage[i] = input[i];
		}
	}
	return cryptMessage;
}

var alphaMap = indexMap(alphaArr);

var encryptedMessage = crypt(string,key,alphaMap,true);


 console.log("Message is: "+string);
 console.log("Encrypted message is: "+encryptedMessage);


var decryptedMessage = crypt(encryptedMessage,key,alphaMap,false);
console.log("Decrypted message is: "+decryptedMessage);