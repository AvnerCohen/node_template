var supertest = require('supertest');
var request = supertest('http://127.0.0.1:7001');

describe('Check routes', function() {

  it('should response with statusCode 200', function(done) {
    request.get('/ping').expect(200).end(done);
  });

  it('should allow posting data to echo', function(done) {
    request.post('/echo').send({moshe: "pizza"}).expect("pizza", done);
  });

});
