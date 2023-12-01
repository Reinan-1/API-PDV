const { Endpoint, S3 } = require("aws-sdk");

const endpoint = new Endpoint(process.env.BUCKET_ENDPOINT);

const s3 = new S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.BUCKET_KEY_ID,
        secretAccessKey: process.env.BUCKET_APP_KEY
    }
});

module.exports = {
    uploadFile: async (path, buffer, mimetype) => {
        const image = await s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: path,
            Body: buffer,
            ContentType: mimetype,
        }).promise();

        return {
            url: `https://${process.env.BUCKET_NAME}.${process.env.BUCKET_ENDPOINT}/${image.Key}`
        }
    },

    deleteFile: async (path) => {
        await s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: path
        }).promise();
    }
}