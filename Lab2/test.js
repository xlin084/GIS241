// Require client library and private key.
// var ee = require('@google/earthengine');
// var privateKey = require('./privatekey.json');

import ee from "@google/earthengine";
import privateKey from "./privatekey.json";

// Initialize client library and run analysis.
var runAnalysis = function() {
    ee.initialize(null, null, function() {
        // ... run analysis ...
    }, function(e) {
        console.error('Initialization error: ' + e);
    });
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
    console.error('Authentication error: ' + e);
});