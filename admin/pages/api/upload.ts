import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";

type Data = {
  name: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = new multiparty.Form();
  const {fields, files} = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    }); 
  })

  console.log(files.files.length)
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  })

  const links = []
  for (const file of files.files) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + "." + ext    

    await client.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: newFilename,
      Body: fs.readFileSync(file.path),
      ACL: 'public-read',
      ContentType: mime.lookup(file.path)
    }))
    const link = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFilename}`
    links.push(link)
  }
  return res.json({links})
}

export const config = {
  api: {bodyParser: false}
}