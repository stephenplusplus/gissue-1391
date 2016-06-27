1. Clone repo

1. `cd` into it

1. Edit `test.js` with your project ID\* and credentials\**

  ```diff
- var gcs = gcloud.storage();
+ var gcs = gcloud.storage({
+   projectId: 'project-id',
+   keyFilename: '/path/to/service/key.json'
+ });
  ```

  \* not necessary if you have `GCLOUD_PROJECT` env var set
<br>  \** not necessary if you are logged in with the gcloud SDK

1. Edit `test.js` with the name of your bucket:

  ```diff
- var myBucket = gcs.bucket('stephen-has-a-new-bucket');
+ var myBucket = gcs.bucket('YOUR_BUCKET_NAME');
  ```

1. Install npm dependencies and run tests:
  ```sh
$ npm install
$ NODE_DEBUG=request npm test
  ```
