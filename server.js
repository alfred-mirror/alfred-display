const express = require('express');

express().use(express.static(__dirname + '/build')).listen(8081, () => console.log('mirror server up on PORT: 8081'));
