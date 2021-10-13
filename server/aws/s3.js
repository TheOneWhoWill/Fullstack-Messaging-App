import fs from 'fs';
import AWS from "aws-sdk";
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const accessKeyId = process.env.AWS_ACCESS_KEY;

const s3 = new AWS.S3({
	region,
	bucketName,
	accessKeyId,
	secretAccessKey
})

// file upload to aws bucket will return 
// the url of the file back to wherever
// the function is called
async function awsFileUpload(file, uid) {
	const fileStream = fs.createReadStream(file.path)
	// Params
	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: `${uid}/${file.filename}`
	}
	// Response from AWS
	return s3.upload(uploadParams).promise()
}

function getFileStream(fileKey) {
  const downloadParams = {
    Key: 'bmN87QL0MIR299Mb6pwYazsE9no1/213.mp4',
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}

export { awsFileUpload, s3, getFileStream }