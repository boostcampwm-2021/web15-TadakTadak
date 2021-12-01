import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ObjectKey } from 'aws-sdk/clients/s3';

export interface ObjectStorageData {
  ETag: string;
  Location: string;
  key: string;
  Bucket: string;
}

@Injectable()
export class ImageService {
  private s3: AWS.S3;

  constructor() {
    const endpoint = new AWS.Endpoint(process.env.NCP_OBJ_STORAGE_END_POINT ?? '');
    const region = process.env.NCP_REGION;
    this.s3 = new AWS.S3({
      endpoint,
      region,
      credentials: {
        accessKeyId: process.env.NCP_ACCESS_KEY,
        secretAccessKey: process.env.NCP_SECRET_KEY,
      },
    });
  }

  async uploadImage(image: Express.Multer.File): Promise<ObjectStorageData> {
    const param = {
      Bucket: process.env.NCP_BUCKET_NAME ?? '',
      Key: encodeURI(`${Date.now()}-${image.originalname}`),
      ACL: 'public-read',
      Body: image.buffer,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(param, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async deleteImage(imageName: ObjectKey) {
    const param = {
      Bucket: process.env.NCP_BUCKET_NAME ?? '',
      Key: imageName,
    };

    return new Promise((resolve, reject) => {
      this.s3.deleteObject(param, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
