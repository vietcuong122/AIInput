import React, {useEffect} from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import Container from '../../../../components/Common/Container/index';
import HomeComponent from './components/HomeComponent';
import RNFS from 'react-native-fs';
import moment from 'moment';
import {set} from 'react-native-reanimated';
import DataWedgeIntents from 'react-native-datawedge-intents';

const AIInput = () => {
  const [form, setForm] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [content, setContent] = React.useState('');
  const [state, setState] = React.useState({
    lastApiVisible: false,
    lastApiText: 'Messages from DataWedge will go here',
    checkBoxesDisabled: true,
    scanButtonVisible: false,
    dwVersionText:
      'Pre 6.3.  Please create and configure profile manually.  See the ReadMe for more details',
    dwVersionTextStyle: {},
    activeProfileText: 'Requires DataWedge 6.3+',
    enumeratedScannersText: 'Requires DataWedge 6.3+',
    scans: [],
  });
  // const [sendCommandResult, setSendCommandResult] = React.useState(false);
  let sendCommandResult = false;

  useEffect(() => {
    console.log(`call use effect`);
    state.deviceEmitterSubscription = DeviceEventEmitter.addListener(
      'datawedge_broadcast_intent',
      intent => {
        console.log(`call use effect`, intent);
        broadcastReceiver(intent);
      },
    );
    registerBroadcastReceiver();
    determineVersion();
    return () => {
      state.deviceEmitterSubscription.remove();
    };
  }, [state]);

  const registerBroadcastReceiver = () => {
    console.log('call registerBroadcastReceiver');
    DataWedgeIntents.registerBroadcastReceiver({
      filterActions: [
        'com.zebra.reactnativedemo.ACTION',
        'com.symbol.datawedge.api.RESULT_ACTION',
      ],
      filterCategories: ['android.intent.category.DEFAULT'],
    });
  };

  const _onPressScanButton = () => {
    sendCommand(
      'com.symbol.datawedge.api.SOFT_SCAN_TRIGGER',
      'TOGGLE_SCANNING',
    );
  };

  const determineVersion = () => {
    sendCommand('com.symbol.datawedge.api.GET_VERSION_INFO', '');
  };

  const setDecoders = () => {
    //  Set the new configuration
    var profileConfig = {
      PROFILE_NAME: 'ZebraReactNativeDemo',
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'BARCODE',
        PARAM_LIST: {
          //"current-device-id": this.selectedScannerId,
          scanner_selection: 'auto',
          decoder_ean8: true,
          decoder_ean13: true,
          decoder_code128: true,
          decoder_code39: true,
        },
      },
    };
    sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig);
  };

  const commandReceived = commandText => {
    state.lastApiText = commandText;
    setState(this.state);
  };

  const broadcastReceiver = intent => {
    //  Broadcast received
    console.log('Received Intent: ' + JSON.stringify(intent));
    if (intent.hasOwnProperty('RESULT_INFO')) {
      var commandResult =
        intent.RESULT +
        ' (' +
        intent.COMMAND.substring(
          intent.COMMAND.lastIndexOf('.') + 1,
          intent.COMMAND.length,
        ) +
        ')'; // + JSON.stringify(intent.RESULT_INFO);
      commandReceived(commandResult.toLowerCase());
    }

    if (
      intent.hasOwnProperty('com.symbol.datawedge.api.RESULT_GET_VERSION_INFO')
    ) {
      //  The version has been returned (DW 6.3 or higher).  Includes the DW version along with other subsystem versions e.g MX
      var versionInfo =
        intent['com.symbol.datawedge.api.RESULT_GET_VERSION_INFO'];
      console.log('Version Info: ' + JSON.stringify(versionInfo));
      var datawedgeVersion = versionInfo['DATAWEDGE'];
      console.log('Datawedge version: ' + datawedgeVersion);

      //  Fire events sequentially so the application can gracefully degrade the functionality available on earlier DW versions
      if (datawedgeVersion >= '6.3') datawedge63();
      if (datawedgeVersion >= '6.4') datawedge64();
      if (datawedgeVersion >= '6.5') datawedge65();

      setState(state);
    } else if (
      intent.hasOwnProperty(
        'com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS',
      )
    ) {
      //  Return from our request to enumerate the available scanners
      var enumeratedScannersObj =
        intent['com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS'];
      enumerateScanners(enumeratedScannersObj);
    } else if (
      intent.hasOwnProperty(
        'com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE',
      )
    ) {
      //  Return from our request to obtain the active profile
      var activeProfileObj =
        intent['com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE'];
      activeProfile(activeProfileObj);
    } else if (!intent.hasOwnProperty('RESULT_INFO')) {
      //  A barcode has been scanned
      barcodeScanned(intent, new Date().toLocaleString());
    }
  };

  const datawedge63 = () => {
    console.log('Datawedge 6.3 APIs are available');
    //  Create a profile for our application
    sendCommand(
      'com.symbol.datawedge.api.CREATE_PROFILE',
      'ZebraReactNativeDemo',
    );

    state.dwVersionText =
      '6.3.  Please configure profile manually.  See ReadMe for more details.';

    //  Although we created the profile we can only configure it with DW 6.4.
    sendCommand('com.symbol.datawedge.api.GET_ACTIVE_PROFILE', '');

    //  Enumerate the available scanners on the device
    sendCommand('com.symbol.datawedge.api.ENUMERATE_SCANNERS', '');

    //  Functionality of the scan button is available
    state.scanButtonVisible = true;
  };

  const datawedge64 = () => {
    console.log('Datawedge 6.4 APIs are available');

    //  Documentation states the ability to set a profile config is only available from DW 6.4.
    //  For our purposes, this includes setting the decoders and configuring the associated app / output params of the profile.
    state.dwVersionText = '6.4.';
    state.dwVersionTextStyle = {};
    //document.getElementById('info_datawedgeVersion').classList.remove("attention");

    //  Decoders are now available
    state.checkBoxesDisabled = false;

    //  Configure the created profile (associated app and keyboard plugin)
    var profileConfig = {
      PROFILE_NAME: 'ZebraReactNativeDemo',
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'BARCODE',
        RESET_CONFIG: 'true',
        PARAM_LIST: {},
      },
      APP_LIST: [
        {
          PACKAGE_NAME: 'com.aiinput',
          ACTIVITY_LIST: ['*'],
        },
      ],
    };
    sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig);

    //  Configure the created profile (intent plugin)
    var profileConfig2 = {
      PROFILE_NAME: 'ZebraReactNativeDemo',
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'INTENT',
        RESET_CONFIG: 'true',
        PARAM_LIST: {
          intent_output_enabled: 'true',
          intent_action: 'com.zebra.reactnativedemo.ACTION',
          intent_delivery: '2',
        },
      },
    };
    sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig2);

    //  Give some time for the profile to settle then query its value
    setTimeout(() => {
      sendCommand('com.symbol.datawedge.api.GET_ACTIVE_PROFILE', '');
    }, 1000);
  };

  const datawedge65 = () => {
    console.log('Datawedge 6.5 APIs are available');

    state.dwVersionText = '6.5 or higher.';

    //  Instruct the API to send
    sendCommandResult = true;
    console.log(`sendCommandResult`, sendCommandResult);
    state.lastApiVisible = true;
  };

  const sendCommand = (extraName, extraValue) => {
    console.log(
      'Sending Command: ' + extraName + ', ' + JSON.stringify(extraValue),
    );
    var broadcastExtras = {};
    broadcastExtras[extraName] = extraValue;
    broadcastExtras['SEND_RESULT'] = sendCommandResult;
    console.log(`broadcastExtras`, broadcastExtras);
    DataWedgeIntents.sendBroadcastWithExtras({
      action: 'com.symbol.datawedge.api.ACTION',
      extras: broadcastExtras,
    });
  };

  const enumerateScanners = enumeratedScanners => {
    var humanReadableScannerList = '';
    for (var i = 0; i < enumeratedScanners.length; i++) {
      console.log(
        'Scanner found: name= ' +
          enumeratedScanners[i].SCANNER_NAME +
          ', id=' +
          enumeratedScanners[i].SCANNER_INDEX +
          ', connected=' +
          enumeratedScanners[i].SCANNER_CONNECTION_STATE,
      );
      humanReadableScannerList += enumeratedScanners[i].SCANNER_NAME;
      if (i < enumeratedScanners.length - 1) humanReadableScannerList += ', ';
    }
    state.enumeratedScannersText = humanReadableScannerList;
  };

  const activeProfile = theActiveProfile => {
    console.log(`call active profile`, theActiveProfile);
    state.activeProfileText = theActiveProfile;
    setState(state);
  };

  const barcodeScanned = (scanData, timeOfScan) => {
    console.log(`call barcode scanned`, scanData);
    var scannedData = scanData['com.symbol.datawedge.data_string'];
    var scannedType = scanData['com.symbol.datawedge.label_type'];
    console.log('Scan: ' + scannedData);
    state.scans.unshift({
      data: scannedData,
      decoder: scannedType,
      timeAtDecode: timeOfScan,
    });
    console.log(state.scans);
    setState(state);
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value.toUpperCase()});
    if (value !== '') {
      setErrors(pre => {
        return {...pre, [name]: null};
      });
    } else {
      setErrors(pre => {
        return {...pre, [name]: 'This field is required'};
      });
    }
  };

  const onSubmit = () => {
    if (!form.userCode) {
      setErrors(pre => {
        return {...pre, userCode: 'Please input user code'};
      });
    }
    if (!form.zone) {
      setErrors(pre => {
        return {...pre, zone: 'Please input zone'};
      });
    }
    if (!form.alley) {
      setErrors(pre => {
        return {...pre, alley: 'Please input alley'};
      });
    }
    if (form.userCode && form.zone && form.alley)
      setForm({...form, editable: false, showQrSection: true});
  };

  const onSave = () => {
    if (!form.barcode) {
      setErrors(pre => {
        return {...pre, barcode: 'Please input barcode'};
      });
    }
    if (!form.qty) {
      setErrors(pre => {
        return {...pre, qty: 'Please input quantity'};
      });
    }
    if (form.barcode && form.qty) {
      writeFile();
    }
  };
  const onStop = () => {
    setForm({
      ...form,
      barcode: '',
      qty: '',
      showQrSection: false,
      editable: true,
    });
    setErrors({});
    setContent('');
  };

  const writeFile = () => {
    const filePath = `file://${RNFS.ExternalStorageDirectoryPath}/AI-${form.userCode}-${form.zone}.txt`;

    RNFS.readFile(filePath, 'utf8')
      .then(result => {
        setContent(result);
      })
      .catch(err => {
        console.log(err.message);
      });
    let tmpContent = content;
    let currentTime = moment(new Date()).format('YYYY/MM/DD,HH:mm:ss');
    console.log(`moment`, currentTime);
    if (tmpContent === '') {
      tmpContent = `NHAN VIEN,${form.userCode},${currentTime}\nADRESSE,${form.zone},${form.alley}`;
    }
    RNFS.writeFile(
      filePath,
      `${tmpContent}\nARTICLE,${form.barcode},${form.qty}`,
      'utf8',
    )
      .then(success => {
        setForm({...form, barcode: '', qty: ''});
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        setErrors(pre => {
          return {...pre, writeFile: 'Cannot write file'};
        });
      });
  };
  return (
    <HomeComponent
      onChange={onChange}
      onSubmit={onSubmit}
      onSave={onSave}
      onStop={onStop}
      onPressScanButton={_onPressScanButton}
      form={form}
      errors={errors}
    />
  );
};

export default AIInput;
