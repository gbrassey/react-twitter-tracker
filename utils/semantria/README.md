node-semantria
==============

NodeJS wrapper for SemantriaJavaScriptSDK (v.3.5.76)

### Quick Start

```
npm install semantria
```

### Usage
```js
var Semantria = require('semantria');
var SemantriaSession = Semantria.Session( consumerKey, consumerSecret, applicationName, format, useCompression );
```
Parameters are same as for <a href="https://semantria.com/developer">SemantriaJavaScriptSDK</a>.

| Parameter        | Description           | 
| :------------- |:-------------| 
| consumerKey | Semantria API key | 
| consumerSecret | Semantria API secret | 
| applicationName | (Optional) Reference name for application | 
| format | (Optional) Default: "json" | 
| useCompression | (Optional) | 

