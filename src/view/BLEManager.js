class BLEManager {

  constructor() {
    navigator.mozBluetooth.onattributechanged = function() {
      console.log('onattributechanged');
    }
  }

  getTodo1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = true;
            if(!error)
                resolve({ text: 'Complete Code Example' })
            else
                reject({error: 'Error occured' })
        }, 2000)
    })
  }

  startLeScan = () => {
    return new Promise((resolve, reject) => {
      navigator.mozBluetooth.defaultAdapter.startLeScan([])
      .then(function(handlerLE) {
        handlerLE.ondevicefound = function(eventLE) {
          if (eventLE.device.address === "ed:ec:90:87:5d:86") {
            navigator.mozBluetooth.defaultAdapter.stopLeScan(eventLE.target);
            console.log('FOUND:', 'Address:', eventLE.device.address, 'Name:', eventLE.device.name, 'Type:', eventLE.device.type);

            resolve({"eventLE":eventLE})
          }
        }
      })
      .catch(function(e) {
        console.log(e);
        reject({error: e })
      });
    })
  }

  connectToDevice = (deviceLE) =>  {
    return new Promise((resolve, reject) => {
      console.log('BLEManager connecting to device - ', deviceLE);

      deviceLE.device.gatt.onconnectionstatechanged = (evt) => {
        console.log("onconnectionstatechanged", evt)
      }

      deviceLE.device.gatt.connect(true)
      .then(() => {
        resolve()
        console.log('CONNECTED:', 'Address:', deviceLE.device.address, 'Name:', deviceLE.device.name, 'Type:', deviceLE.device.type);
      })
      .catch((e) => {
        reject({ "error": e })
        console.log(e);
      });
    })
  }

  discoverService = (deviceLE, serviceUUID) => {
    return new Promise((resolve, reject) => {
      console.log('BLEManager discovering service - ', serviceUUID);

      var discoveredService;

      deviceLE.device.gatt.discoverServices()
      .then(() => {
        deviceLE.device.gatt.services.forEach((service) => {
          console.log("Service:", service.uuid);
          console.log("----------------------------------------")

          if (service.uuid === serviceUUID) {
            discoveredService = service;
            resolve({"service": service});
          }
        });

        resolve({"service": discoveredService});
      })
      .catch((e) => {
        reject({ "error": e })
      });
    })
  }

  addDescriptorFor(characteristic) {
    characteristic.descriptors.forEach((descriptor) => {
      console.log("Descriptor UUID - ", descriptor.uuid)

      if (descriptor.uuid === "00002902-0000-1000-8000-00805f9b34fb") {
        descriptor.writeValue(new Uint8Array([0x01, 0x00]).buffer)
        .then(() => {
          console.log('Added descriptor for characteristic - ', characteristic.uuid);
        })
        .catch((err) => {
          console.warn(err.toString());
        });
      }
    });
  }
}

export default BLEManager
