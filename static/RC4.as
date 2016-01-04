package {
	class RC4 {
		var sbox, i, j;
		function RC4 () {
		}
		function engineInit(key) {
			sbox = new Array(STATE_ARRAY_SIZE);
			if ((key == null) || (key == undefined)) {
				throw new Error("Error 0178");
			} else if ((key.length < 1) || (key.length > 256)) {
				throw new Error("Error 0179:" + key.length);
			}
			rc4Init(key);
		}
		function rc4Init(key) {
			var _local2 = 0;
			while (_local2 < STATE_ARRAY_SIZE) {
				sbox[_local2] = _local2;
				_local2++;
			}
			i = 0;
			var _local3;
			_local2 = 0;
			while (_local2 < STATE_ARRAY_SIZE) {
				i = (((key[_local2 % key.length] & 255) + sbox[_local2]) + i) & 255;
				_local3 = sbox[_local2];
				sbox[_local2] = sbox[i];
				sbox[i] = _local3;
				_local2++;
			}
			i = (j = 0);
		}
		function engineCrypt(plainText) {
			var _local6 = new Array();
			var _local4;
			var _local7;
			var _local2 = 0;
			while (_local2 < plainText.length) {
				i = (i + 1) & 255;
				j = (sbox[i] + j) & 255;
				_local4 = sbox[i];
				sbox[i] = sbox[j];
				sbox[j] = _local4;
				var _local3 = plainText[_local2] ^ sbox[(sbox[i] + sbox[j]) & 255];
				_local6.push(_local3);
				_local2++;
			}
			return(_local6);
		}
		static function toHex(num) {
			var _local1 = new String("");
			_local1 = hexes[num >> 4] + hexes[num & 15];
			return(_local1);
		}
		function charsToHex(chars) {
			var _local3 = new String("");
			var _local1 = 0;
			while (_local1 < chars.length) {
				_local3 = _local3 + (hexes[chars[_local1] >> 4] + hexes[chars[_local1] & 15]);
				_local1++;
			}
			return(_local3);
		}
		function hexToChars(hex) {
			var _local3 = new Array();
			var _local1 = ((hex.substr(0, 2) == "0x") ? 2 : 0);
			while (_local1 < hex.length) {
				_local3.push(parseInt(hex.substr(_local1, 2), 16));
				_local1 = _local1 + 2;
			}
			return(_local3);
		}
		function charsToStr(chars) {
			var _local3 = new String("");
			var _local1 = 0;
			while (_local1 < chars.length) {
				_local3 = _local3 + String.fromCharCode(chars[_local1]);
				_local1++;
			}
			return(_local3);
		}
		function strToChars(str) {
			var _local3 = new Array();
			var _local1 = 0;
			while (_local1 < str.length) {
				_local3.push(str.charCodeAt(_local1));
				_local1++;
			}
			return(_local3);
		}
		var STATE_ARRAY_SIZE = 256;
		static var hexes = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
	}
}
