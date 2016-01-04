
all: static/jSocket.swf


static/jSocket.swf: static/*.as
	~/Downloads/flex/bin/mxmlc static/jSocket.as

