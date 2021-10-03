import AWS from 'aws-sdk';

AWS.config.update({region: 'REGION'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

console.log('Microsoft Azure sucks');