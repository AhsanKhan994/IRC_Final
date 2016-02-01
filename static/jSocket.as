
package {
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	import flash.events.*;
	import flash.net.Socket;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.system.Security;

	import flash.utils.ByteArray;
	import mx.utils.Base64Decoder;
	import mx.utils.Base64Encoder;

	public class jSocket extends Sprite {
		protected var socket:Socket;
		protected var id:String;
		protected var dataHandler;

		protected var encrypted:Boolean = false;
		protected var sendKeyArray;
		protected var sendRC4:RC4 = new RC4();
		protected var receiveKeyArray;
		protected var receiveRC4:RC4 = new RC4();

		public function jSocket():void {
			// Pass exceptions between flash and browser
			ExternalInterface.marshallExceptions = true;

			var url:String = root.loaderInfo.url;
			id = "jSocket_1";

			dataHandler = initialHandler;

			socket = new Socket();
			socket.addEventListener("close", onClose);
			socket.addEventListener("connect", handleConnected);
			socket.addEventListener("ioError", onError);
			socket.addEventListener("securityError", onSecurityError);
			socket.addEventListener("socketData", onData);


			ExternalInterface.addCallback("connect", connect);
			ExternalInterface.addCallback("close", close);
			ExternalInterface.addCallback("write", write);

			ExternalInterface.call("jSocket.flashCallback", "init", id);
		}

		public function connect(host:String, port:int):void{
			Security.loadPolicyFile("xmlsocket://"+host+":8843");

			var myLoader:URLLoader = new URLLoader();
			var url:String = "https://" + host + ":" + secureWebPort + "/flash/secure.xml";
			myLoader.load(new URLRequest(url));
			myLoader.addEventListener(Event.COMPLETE, onIDSeedLoad);

			socket.connect(host, port);
		}

		public function close():void{
			socket.close();
		}

		public function handleConnected(e:Event):void {
			write("ENCRYPT " + ident + " 128 R");
		}

		protected function initialHandler(data:String) {
			var xmlObject = new XML(data);
			var _local4 = xmlObject.toString();
			var _local1 = _local4.split(" ", 3);
			if ((_local1[0] == "ENCRYPT") && (_local1[1] == "OK")) {
				log("Encryption initialized");
				encrypted = true;
				wiggle();
				munch();
				dataHandler = handleEncrypted;
				write("IRCVERS ConferenceRoom FLASH " + versionNumeric + " :" + copyright);
				onConnect();
			} else {
				log("FAILED TO RECEIVE ENCRYPT OK");
				close();
			}
		}

		function handleEncrypted(data:String) {
			var xmlObject = new XML(data);
			var body = ""+xmlObject;
			var crypt:Array = Base64.decodeToArray(body);
			var chars:Array = receiveRC4.engineCrypt(crypt);
			var data:String = charsToStr(chars);
			dataCallback(data);
		}

		public function write(str:String):void{
			try {
				var data:String;
				if (encrypted) {
					var chars:Array = strToChars(str+"\r\n");
					log(chars.toString());
					var crypt:Array = sendRC4.engineCrypt(chars);
					var base64:String = Base64.encodeFromArray(crypt);
					data = "<r>"+base64+"</r>";
				} else {
					data = str+"\r\n";
				}
				socket.writeUTFBytes(data);
				socket.flush();
			} catch (e:Error) {
				log(e.toString());
			}
		}

		protected function onConnect():void{
			ExternalInterface.call("jSocket.flashCallback", "connect", id);
		}

		protected function onError(event:IOErrorEvent):void{
			ExternalInterface.call("jSocket.flashCallback", "error", id, event.text);
		}

		protected function onSecurityError(event:SecurityErrorEvent):void{
			ExternalInterface.call("jSocket.flashCallback", "error", id, event.text);
		}

		protected function onClose(event:Event):void{
			socket.close();
			ExternalInterface.call("jSocket.flashCallback", "close", id);
		}

		var bytes:ByteArray = new ByteArray();
		protected function onData(event:ProgressEvent):void{
			var byte:int;
			while (socket.bytesAvailable != 0) {
				byte = socket.readByte();
				if (byte == 0) {
					onDataImpl(bytes);
					bytes = new ByteArray();
				} else {
					bytes.writeByte(byte);
				}
			}
			if (!encrypted) {
				onDataImpl(bytes);
			}
		}

		protected function onDataImpl(bytes:ByteArray) {
			var data:String = bytes.toString();
			dataHandler(data);
		}

		protected function dataCallback(data:String):void {
			ExternalInterface.call("jSocket.flashCallback", "data", id, data);
		}

		protected function log(text:String):void {
			ExternalInterface.call("jSocket.flashCallback", "log", id, text);
		}

		// idSeed

		var secureWebPort:int = 443;
		var build:int = 28;
		var copyright:String = "Copyright (c) 1999-2007 WebMaster Incorporated";
		var versionNumeric:String = "3.0." + build + ".0";
		var ident:String = "0000000000";
		var seed:String = "00000000000000";

		function onIDSeedLoad(e:Event) {
			try {
				var idSeed:XML = new XML(e.target.data);
				if (idSeed.firstChild.nodeName.toUpperCase() == "KEY") {
					ident = idSeed.firstChild.attributes.ident;
					seed = idSeed.firstChild.attributes.seed;
				} else {
					ident = "0000000000";
					seed = "00000000000000";
				}
			} catch (e:Error) {
				ident = "0000000000";
				seed = "00000000000000";
			}
		}


		// UTILS

		protected function charsToStr(chars:Array):String {
			var _local3:String = new String("");
			var _local1:int = 0; 
			while (_local1 < chars.length) {
				_local3 = _local3 + String.fromCharCode(chars[_local1]);
				_local1++;
			}    
			return(_local3);
		}    
		protected function strToChars(str:String):Array {
			var _local3:Array = new Array();
			var _local1:int = 0; 
			while (_local1 < str.length) {
				var code:int = str.charCodeAt(_local1);
				if (code < 256) {
					_local3.push(code);
				} else {
					if (code == 351)
						_local3.push("s".charCodeAt());
					else if (code == 350)
						_local3.push("S".charCodeAt());
					else if (code == 286)
						_local3.push("G".charCodeAt());
					else if (code == 287)
						_local3.push("g".charCodeAt());
					else if (code == 305)
						_local3.push("I".charCodeAt());
					else if (code == 305)
						_local3.push("i".charCodeAt());
					else
						ExternalInterface.call("jSocket.flashCallback", "error", id, "Character error: "+String.fromCharCode(code));
				}
				_local1++;
			}
			return(_local3);
		}
		function munch():void {
			var _local2 = new Array(256);
			var _local1 = 0;
			while (_local1 < _local2.length) {
				_local2[_local1] = 0;
				_local1++;
			}
			sendRC4.engineCrypt(_local2);
			receiveRC4.engineCrypt(_local2);
		}
		function wiggle():void {
			sendKeyArray = strToChars(seed);
			receiveKeyArray = strToChars(seed);
			var _local5 = receiveKeyArray[0];
			var _local4 = receiveKeyArray[receiveKeyArray.length - 1];
			var _local3 = _local5 ^ _local4;
			var _local2 = receiveKeyArray[receiveKeyArray.length - 2];
			var _local1 = _local2 ^ 66;
			receiveKeyArray[0] = _local3;
			receiveKeyArray[receiveKeyArray.length - 2] = _local1;
			sendRC4.engineInit(sendKeyArray);
			receiveRC4.engineInit(receiveKeyArray);
		}
	}       
}

