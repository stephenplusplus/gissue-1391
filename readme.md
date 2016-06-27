1. Clone repo

1. `cd` into it

1. Edit `test.js` with your credentials (not necessary if logged in with gcloud SDK):

  ```diff
- var gcs = gcloud.storage();
+ var gcs = gcloud.storage({
+   keyFilename: '/path/to/service/key.json'
+ });
```

1. Edit `test.js` with the name of your bucket:

  ```diff
- var myBucket = gcs.bucket('stephen-has-a-new-bucket');
+ var myBucket = gcs.bucket('YOUR_BUCKET_NAME');
```

1. Install npm dependencies and run tests:
  ```sh
$ npm install
$ npm test
  ```
