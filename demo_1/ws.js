
"use strict"

//////////////////////////////////////////////////////////////////
// WsClient

// public methods:

function WsClient(wsAdd, connectionHandler) {

    var self = this;

    this.service = null;

    function connect() {
        self.service = new WebSocket(wsAdd);
        self.service.onmessage = function (event) {
            eval(event.data);
            // const result = eval(event.data);
            // self.service.send(result);
        };
        self.service.onopen = function () {
            console.log('WS connected');
            connectionHandler(true);
        };
        self.service.onclose = function () {
            console.log('WS closed');
            connectionHandler(false);
            setTimeout(function () {
                console.log('trying to reconnect');
                connect();
            }, 1000);
        };
        self.service.onerror = function () {
            console.log('WS error');
            self.service.close();
        };
    }

    connect();
}

/*
Acp.prototype.disconnect = function() {
    if (this.service == null) return;
    this.service.close();
    this.service = null;
}
*/

WsClient.prototype.send = function (msg) {
    if (this.service == null) return;

    if (this.service.readyState === this.service.OPEN)
        this.service.send(msg);
}

WsClient.prototype.sendObj = function (obj) {
    //console.log('sending %o', obj);
    const msg = JSON.stringify(obj);
    this.send(msg);
}

////////////////////////////////////////////////////////////

// connection

var proxy = null;

function connect() {
    const ip = "localhost";
    const port = "9971";

    const add = 'ws://' + ip + ':' + port;
    console.log('using ws address: ' + add);
    proxy = new WsClient(add, function (connected) {
        if (connected) console.log('connected');
        else console.log('disconnected');
    });
}

// init

$(function () {

    connect();

    // buttons
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.onclick = function () {
            const ev = {
                event: 'onclick',
                id: this.id
            };
            proxy.sendObj(ev);
        };
    }

    // input (sliders & checkboxes)
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var slider = inputs[i];
        slider.oninput = function () {
            const ev = {
                event: 'oninput',
                value: this.value,
                id: this.id
            };
            proxy.sendObj(ev);
        };
        slider.onclick = function () {
            const ev = {
                event: 'onclick',
                id: this.id
            };
            proxy.sendObj(ev);
        };
    }

});