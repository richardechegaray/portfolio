import { config } from "dotenv";
config({ path: ".env.local" });
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function main() {
  const testKey = "test/hello.txt";
  const testBody = Buffer.from("Hello from R2 test!");

  // Upload
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: testKey,
      Body: testBody,
      ContentType: "text/plain",
    })
  );
  const publicUrl = `${process.env.R2_PUBLIC_URL}/${testKey}`;
  console.log("Uploaded to R2:", publicUrl);

  // Verify public access
  const res = await fetch(publicUrl);
  if (res.ok) {
    const text = await res.text();
    console.log("Public access works! Content:", text);
  } else {
    console.error("Public access failed:", res.status, res.statusText);
  }

  // Clean up
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: testKey,
    })
  );
  console.log("Cleaned up test file. R2 is working!");
}

main().catch(console.error);
