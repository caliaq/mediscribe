import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.prod.env') });


// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadFile = async (filePath: string, bucketName: string, key: string) => {
    try {
        const fileContent = fs.readFileSync(filePath);
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: fileContent
        };

        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
    } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
    }
};

// Example usage
const filePath = path.join(__dirname, 'your-file.txt');
const bucketName = 'your-bucket-name';
const key = 'your-file-key';

uploadFile(filePath, bucketName, key);