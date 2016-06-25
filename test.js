'use strict';

var assert = require('assert');
var gcloud = require('gcloud');
var request = require('request');

var gcs = gcloud.storage();
var myBucket = gcs.bucket('stephen-has-a-new-bucket');
var file = myBucket.file(Date.now());

var authClient = gcs.authClient;

function saveThenCheckIfItSavedHttp(newContent, callback) {
  authClient.authorizeRequest({
    method: 'POST',
    uri: 'https://www.googleapis.com/upload/storage/v1/b/' + myBucket.name + '/o',
    qs: {
      name: file.name,
      uploadType: 'media'
    },
    body: newContent
  }, function(err, reqOpts) {
    assert.ifError(err);

    request(reqOpts, function(err) {
      assert.ifError(err);

      var publicUrl = 'https://storage.googleapis.com/' + myBucket.name + '/' + file.name;

      request.get(publicUrl, function(err, resp, body) {
        assert.ifError(err);
        assert.strictEqual(body.toString(), newContent);
        callback();
      });
    });
  });
}

function saveThenCheckIfItSavedGcloud(newContent, callback) {
  file.save(newContent, function(err) {
    assert.ifError(err);

    file.download(function(err, contents) {
      assert.ifError(err);
      assert.strictEqual(contents.toString(), newContent);
      callback();
    });
  });
}

describe('Double Search Test', function() {
  it('writes first text', function(done) {
    saveThenCheckIfItSavedHttp('old', done);
  });

  it('writes new text', function(done) {
    saveThenCheckIfItSavedHttp('new', done);
  });
});