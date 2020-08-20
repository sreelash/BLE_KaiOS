import React, { Component } from 'react';
import './app.css';
// import * as Bluetooth from 'react-bluetooth'; certified, privileged

class App extends Component {


  componentDidMount() {
    document.activeElement.addEventListener('keydown', this.handleKeydown);
    let activeElement = document.activeElement;
    console.log('Active element - ', activeElement)
  }

  clickMeHandler = async() => {
    var bleManager = navigator.mozBluetooth;
    // alert('Clicked Me')
    console.log('Clicked Me');
    console.log('BLE Manager - ', bleManager);

    setTimeout(() => {
      console.log("BLE Adapter - ", bleManager.defaultAdapter)

      var adapter = bleManager.defaultAdapter;
      var serviceUuids = ["0000fff0-0000-1000-8000-00805f9b34fb"];
      var discoveryHandle;

      adapter.startLeScan(serviceUuids).then ( function onResolve(handle) {
        console.log("Resolved with discoveryHandle");

        // Keep reference to handle in order to listen to ondevicefound event handler
        discoveryHandle = handle;
        discoveryHandle.ondevicefound = function onDeviceFound(evt) {
          var device = evt.device;
          var rssi = evt.rssi;
          var scanRecord = evt.scanRecord;

          console.log("Device - ", device, "Scan record - ", scanRecord);
          // console.log("Found remote LE device. Address:", device.address, "rssi:", rssi, "Name:", device.name);
        };
      }, function onReject(aReason) {
        console.log("Rejected with this reason: " + aReason);
      });
    }, 500);
  }

  handleKeydown = (e) => {
    console.log('Handle Key Down', e.key)
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
    console.log('Current Index - ', currentIndex)

    const next = currentIndex + move;
    console.log('Next - ', next)

    const items = document.querySelectorAll('.items');
    const targetElement = items[next];
    console.log('Target element - ', targetElement)

    targetElement.focus();
  }

  render() {
    var bluetooth = navigator.mozBluetooth;
    console.log("BLE Manager - ", bluetooth);

    setTimeout(()=>{
      console.log("BLE Adapter - ", bluetooth.defaultAdapter)
    }, 500);

    return (
      <div>
        <div className="items" tabIndex="0">1</div>
        <div className="items" tabIndex="1">2</div>
        <div className="items" tabIndex="2">3</div>
        <div className="items" tabIndex="3">4</div>
        <div>
          <input type="text" placeholder="Text 1" className="items" tabIndex="4"/>
          <input type="text" placeholder="Text 2" className="items" tabIndex="5"/>
        </div>
        <div>
          <button className="items" tabIndex="6" onClick={this.clickMeHandler}>Scan Devices</button>
        </div>
      </div>
    );
  }
}

export default App;
