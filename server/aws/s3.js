import fs from 'fs';
import dotenv from 'dotenv';
import AWS from "aws-sdk";

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
function awsFileUpload(file) {
	const fileStream = fs.createReadStream(file.path)

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename
	}

	return s3.upload(uploadParams).promise()
}

export { awsFileUpload }