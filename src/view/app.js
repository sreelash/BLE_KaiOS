import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import BLEManager from './BLEManager'

class App extends Component {
  state = {
    bleAdapter: null,
    bleHandler: null,
    device: null,
    serviceUUID: "0000fff0-0000-1000-8000-00805f9b34fb",
    readCharacteristicsUUID: "0000fff7-0000-1000-8000-00805f9b34fb",
    writeCharacteristic: null,
    readCharacteristic: null,
    bleManager: null,
    deviceLE: null
  }

  constructor(props) {
    super(props)

    console.log('Constructor')
  }

  componentDidMount() {
    this.setState({
      bleManager: new BLEManager(this)
    })

    console.log('componentDidMount', this.state.bleManager)

    document.activeElement.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
    // console.log('Handle Key Down', e.key)

    switch(e.key) {
      case 'ArrowUp':
        this.nav(-1);
        break;
      case 'ArrowDown':
        this.nav(1);
        break;
      case 'ArrowRight':
        this.nav(1);
        break;
      case 'ArrowLeft':
        this.nav(-1);
        break;
    }
  }

  nav = (move) => {
    const currentIndex = document.activeElement.tabIndex;
    // console.log('Current Index - ', currentIndex)

    const next = currentIndex + move;
    // console.log('Next - ', next)

    const items = document.querySelectorAll('.items');
    const targetElement = items[next];
    // console.log('Target element - ', targetElement)

    targetElement.focus();
  }

  clickMeHandler = async() => {
    this.startScanLE()
  }

  getTimeClickHandler = async() => {
    let writeCharacteristic = this.state.writeCharacteristic
    let readCharacteristic = this.state.readCharacteristic

    if (writeCharacteristic === null || writeCharacteristic === undefined || readCharacteristic === null || readCharacteristic === undefined) {
      return
    }

    var getTime = "41000000000000000000000000000041"
    var crc = 0x41 + 0x00

    console.log('CRC - ', crc.toString(16))

    this.startNotificationsToReadValues(readCharacteristic)

    var buffer = this.hexStringToArrayBuffer(getTime)
    writeCharacteristic.writeValue(buffer)
  }

  setTimeClickHandler = async() => {
    let writeCharacteristic = this.state.writeCharacteristic
    let readCharacteristic = this.state.readCharacteristic

    if (writeCharacteristic === null || writeCharacteristic === undefined || readCharacteristic === null || readCharacteristic === undefined) {
      return
    }

    var setTime = "012009081327000000000000000000"
    var setTimeCRC = 0x01 + 0x20 + 0x09 + 0x08 + 0x13 + 0x27

    console.log('Set Time CRC - ', setTimeCRC.toString(16))

    setTime = setTime + setTimeCRC.toString(16)

    this.startNotificationsToReadValues(readCharacteristic)

    var buffer = this.hexStringToArrayBuffer(setTime)
    writeCharacteristic.writeValue(buffer)
  }

  getRealTimeInfoClickHandler = async() => {
    let writeCharacteristic = this.state.writeCharacteristic
    let readCharacteristic = this.state.readCharacteristic

    if (writeCharacteristic === null || writeCharacteristic === undefined || readCharacteristic === null || readCharacteristic === undefined) {
      return
    }

    var getRealTime = "0901010000000000000000000000000B"
    var getRealTimeCRC = 0x09 + 0x01 + 0x01

    console.log('Get Real Time Info CRC - ', getRealTimeCRC)

    // getRealTime = getRealTime + getRealTimeCRC.toString(16)

    this.startNotificationsToReadValues(readCharacteristic)

    var buffer = this.hexStringToArrayBuffer(getRealTime)
    writeCharacteristic.writeValue(buffer)
  }

  stopRealTimeTrackClickHandler = async() => {
    let writeCharacteristic = this.state.writeCharacteristic
    let readCharacteristic = this.state.readCharacteristic

    if (writeCharacteristic === null || writeCharacteristic === undefined || readCharacteristic === null || readCharacteristic === undefined) {
      return
    }

    var stopRealTime = "09000000000000000000000000000009"
    // var getRealTimeCRC = 0x09 + 0x01 + 0x01
    //
    // console.log('Get Real Time Info CRC - ', getRealTimeCRC)

    // getRealTime = getRealTime + getRealTimeCRC.toString(16)

    this.startNotificationsToReadValues(readCharacteristic)

    var buffer = this.hexStringToArrayBuffer(stopRealTime)
    writeCharacteristic.writeValue(buffer)
  }

  notificationTest = async() => {
    console.log('Debug 1, ', Notification.permission, '.')
    // Notification.requestPermission().then(function(result) {
    //   console.log(result);
    // });
    //
    // var img = null
    // var text = 'HEY! Your task is now overdue.';
    // var notification = new Notification('To do list', { body: text, icon: img });
    // notification.show()

    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      console.log('Debug 2')
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }

    console.log('Debug 3')
  }

  startNotificationsToReadValues(readCharacteristic) {
    let connectedDevice = this.state.deviceLE

    if (connectedDevice === null || connectedDevice === undefined) { return }

    readCharacteristic.startNotifications().then(function onResolve() {
      console.log('Read characteristics notification registered');

      connectedDevice.device.gatt.oncharacteristicchanged = (evt) => {
        console.log("oncharacteristicchanged", evt);

        let view = new Uint8Array(evt.characteristic.value);
        let commandCode = view[0].toString(16)

        console.log("Data received")
        console.log("Buffer - ", view)
        console.log("Command code - ", commandCode)

        if (commandCode === '41') {
          console.log("Year - ", view[1].toString(16))
          console.log("Month - ", view[2].toString(16))
          console.log("Date - ", view[3].toString(16))
          console.log("Hour - ", view[4].toString(16))
          console.log("Minutes - ", view[5].toString(16))
        } else if (commandCode === '9') {
          let steps = view[1] | (view[2]<<8) | (view[3]<<16) | (view[4]<<24)
          let calories = view[5] | (view[6]<<8) | (view[7]<<16) | (view[8]<<24)
          let distance = view[9] | (view[10]<<8) | (view[11]<<16) | (view[12]<<24)
          let hr = view[21]
          let temperature = view[22]

          console.log("Total Steps - ", steps, ' Steps');
          console.log("Total Calories - ", calories/100, ' CAL');
          console.log("Walking Distance - ", distance/100, ' KM');
          console.log("Heart Rate - ", hr);
          console.log("temperature - ", temperature);
        }
      }
    }, function onReject(reason) {
      console.log('Read notification failed: reason = ' + reason);
    });
  }

  startScanLE() {
    let bleManager = this.state.bleManager

    bleManager.startLeScan()
    .then(callback => {
      this.setState({
        deviceLE: callback.eventLE
      })

      this.connectToDevice(callback.eventLE)
    })
    .catch(e => {
      console.log(e)
    })
  }

  connectToDevice(deviceLE) {
    if (deviceLE === null || deviceLE === undefined) { return }

    let bleManager = this.state.bleManager

    bleManager.connectToDevice(deviceLE)
    .then(() => {
      console.log('App.js connected to device - ', deviceLE);

      this.discoverService(deviceLE)
    })
    .catch(error => {
      console.log(error)
    })
  }

  discoverService(deviceLE) {
    if (deviceLE === null || deviceLE === undefined) { return }

    let serviceUUID = this.state.serviceUUID
    let bleManager = this.state.bleManager

    bleManager.discoverService(deviceLE, serviceUUID)
    .then(callback => {
      let service = callback.service

      console.log("App.js discovered service - ", callback.service);

      this.processCharacteristics(service)
    })
    .catch(error => {
      console.log(error)
    })
  }

  processCharacteristics(service) {
    if (service === null || service === undefined) { return }

    let bleManager = this.state.bleManager

    service.characteristics.forEach((characteristic) => {
      console.log("\tCharacteristic:", characteristic.uuid);

      if (characteristic.uuid == "0000fff7-0000-1000-8000-00805f9b34fb") {
        this.setState({
          readCharacteristic: characteristic
        })
      } else if (characteristic.uuid == "0000fff6-0000-1000-8000-00805f9b34fb") {
        this.setState({
          writeCharacteristic: characteristic
        })
      }
    });

    bleManager.addDescriptorFor(this.state.readCharacteristic)

    this.startNotificationsToReadValues(this.state.readCharacteristic)

    console.log("Write - ", this.state.writeCharacteristic, "Read - ", this.state.readCharacteristic);
  }

  dec2hexString(dec) {
     return '0x' + (dec+0x10000).toString(16).substr(-4).toUpperCase();
  }

  toHexString(arrayBuffer) {
    var str = '';
    if (arrayBuffer) {
      console.log(arrayBuffer);
      var uint8Array = new Uint8Array(arrayBuffer);
      for (var i = 0; i < uint8Array.length; i++) {
        var b = uint8Array[i].toString(16);
        if (b.length == 1) {
          str += '0'
        }
        str += b;
      }
    }
    return str;
  }

  hexStringToArrayBuffer(hexString) {
    // remove the leading 0x
    hexString = hexString.replace(/^0x/, '');

    // ensure even number of characters
    if (hexString.length % 2 != 0) {
        console.log('WARNING: expecting an even number of characters in the hexString');
    }

    // check for some non-hex characters
    var bad = hexString.match(/[G-Z\s]/i);
    if (bad) {
        console.log('WARNING: found non-hex characters', bad);
    }

    // split the string into pairs of octets
    var pairs = hexString.match(/[\dA-F]{2}/gi);

    // convert the octets to integers
    var integers = pairs.map(function(s) {
        return parseInt(s, 16);
    });

    var array = new Uint8Array(integers);
    console.log(array);

    return array.buffer;
  }

  crcCalculation() {
    console.log('CRC Result - 1')
    // var crc = require('node-crc');
    var setTime = "012007130724000000000000000000"
    var getTime = "410000000000000000000000000000"
    // console.log('CRC Result - 2')

    const { crc8, crc16, crc32 } = require('easy-crc');

    // CRC8
    let data = '12345';
    let checksum = crc8('CRC-8', getTime);

    console.log("CRC Result - ", checksum);
  }

  splitString(str) {
    console.log("Splitting string - ", str.toString())
    // var arr=[];
    // for (var i = 0; i<str.length-1; i++) {
    //  arr.push(Number(str[i]+''+str[i+1]));
    // }

    // var arr = String(str.toString())
    //           .split("")
    //           .map((value, index, array) => [value, array[index + 1]].join(''))
    //           .map(item => Number(item))

              //01200713072400000000000000000065
    // console.log("o/p - ", this.getChunks(BigInt("01200713072400000000000000000065"), 2));
  }

  getChunks(value, size) {
    let str = value,
        length = str.length - size + 1;

    return Array.from({ length }, (_,i) => +str.slice(i, i + size))
  }

  render() {
    const testLog = () => {
      console.log("Test function 1 invoked")
    }

    navigator.mozBluetooth.onattributechanged = () => {
      this.setState({ bleAdapter: navigator.mozBluetooth.defaultAdapter })
      // this.startScan()
      // testLog()
    }

    return (
      <div>
        <div className="items" tabIndex="0" style={{marginTop:"0px"}}>
          <header style={{ background: "Gray", padding: "10px"}}>
            <h1 className="h1" style={{marginBottom: "5px"}}>COVE 9</h1>
          </header>
        </div>
        <div>
          <button className="items" tabIndex="1" onClick={this.clickMeHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>
            Scan & Connect Device
          </button>
        </div>
        <div>
          <button className="items" tabIndex="2" onClick={this.getTimeClickHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>
            Get Time
          </button>
        </div>
        <div>
          <button className="items" tabIndex="3" onClick={this.setTimeClickHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Set Time</button>
        </div>
        <div>
          <button className="items" tabIndex="4" onClick={this.getRealTimeInfoClickHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Start Real Time Tracking</button>
        </div>
        <div>
          <button className="items" tabIndex="5" onClick={this.stopRealTimeTrackClickHandler} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Stop Real Time Tracking</button>
        </div>
        <div>
          <button className="items" tabIndex="6" onClick={this.notificationTest} style={{backgroundColor: "lightgray", margin: "10px", padding:"10px"}}>Test Notification</button>
        </div>
      </div>
    );
  }
}

export default App;
