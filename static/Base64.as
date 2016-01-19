package {
	class Base64 {
		function Base64 () {
		}
		static function encode(src) {
			var _local1 = 0;
			var _local8 = new String("");
			var _local6;
			var _local4;
			var _local3;
			var _local10;
			var _local9;
			var _local7;
			var _local2;
			while (_local1 < src.length) {
				_local6 = src.charCodeAt(_local1++);
				_local4 = src.charCodeAt(_local1++);
				_local3 = src.charCodeAt(_local1++);
				_local10 = _local6 >> 2;
				_local9 = ((_local6 & 3) << 4) | (_local4 >> 4);
				_local7 = ((_local4 & 15) << 2) | (_local3 >> 6);
				_local2 = _local3 & 63;
				if (isNaN(_local4)) {
					_local2 = 64;
					_local7 = _local2;
				} else if (isNaN(_local3)) {
					_local2 = 64;
				}
				_local8 = _local8 + (base64chars.charAt(_local10) + base64chars.charAt(_local9));
				_local8 = _local8 + (base64chars.charAt(_local7) + base64chars.charAt(_local2));
			}
			return(_local8);
		}
		static function encodeFromArray(src) {
			var _local1 = 0;
			var _local8 = new String("");
			var _local6;
			var _local4;
			var _local3;
			var _local10;
			var _local9;
			var _local7;
			var _local2;
			while (_local1 < src.length) {
				_local6 = src[_local1++];
				_local4 = src[_local1++];
				_local3 = src[_local1++];
				_local10 = _local6 >> 2;
				_local9 = ((_local6 & 3) << 4) | (_local4 >> 4);
				_local7 = ((_local4 & 15) << 2) | (_local3 >> 6);
				_local2 = _local3 & 63;
				if (isNaN(_local4)) {
					_local2 = 64;
					_local7 = _local2;
				} else if (isNaN(_local3)) {
					_local2 = 64;
				}
				_local8 = _local8 + (base64chars.charAt(_local10) + base64chars.charAt(_local9));
				_local8 = _local8 + (base64chars.charAt(_local7) + base64chars.charAt(_local2));
			}
			return(_local8);
		}
		static function decode(src) {
			var _local2 = 0;
			var _local1 = new String("");
			var _local7;
			var _local10;
			var _local9;
			var _local8;
			var _local6;
			var _local4;
			var _local5;
			while (_local2 < src.length) {
				_local8 = base64chars.indexOf(src.charAt(_local2++));
				_local6 = base64chars.indexOf(src.charAt(_local2++));
				_local4 = base64chars.indexOf(src.charAt(_local2++));
				_local5 = base64chars.indexOf(src.charAt(_local2++));
				_local7 = (_local8 << 2) | (_local6 >> 4);
				_local10 = ((_local6 & 15) << 4) | (_local4 >> 2);
				_local9 = ((_local4 & 3) << 6) | _local5;
				_local1 = _local1 + String.fromCharCode(_local7);
				if (_local4 != 64) {
					_local1 = _local1 + String.fromCharCode(_local10);
				}
				if (_local5 != 64) {
					_local1 = _local1 + String.fromCharCode(_local9);
				}
			}
			return(_local1);
		}
		static function decodeToArray(src) {
			var _local11 = src.length % 4;
			if (_local11 > 0) {
				_local11 = 4 - _local11;
				while ((_local11--) > 0) {
					src = src + "=";
				}
			}
			var _local2 = 0;
			var _local4 = new Array();
			var _local7;
			var _local10;
			var _local9;
			var _local8;
			var _local6;
			var _local3;
			var _local5;
			while (_local2 < src.length) {
				_local8 = base64chars.indexOf(src.charAt(_local2++));
				_local6 = base64chars.indexOf(src.charAt(_local2++));
				_local3 = base64chars.indexOf(src.charAt(_local2++));
				_local5 = base64chars.indexOf(src.charAt(_local2++));
				_local7 = (_local8 << 2) | (_local6 >> 4);
				_local10 = ((_local6 & 15) << 4) | (_local3 >> 2);
				_local9 = ((_local3 & 3) << 6) | _local5;
				_local4.push(_local7);
				if (_local3 != 64) {
					_local4.push(_local10);
				}
				if (_local5 != 64) {
					_local4.push(_local9);
				}
			}
			return(_local4);
		}
		static var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	}
}
