var supertest = require('supertest');
var request = supertest('http://localhost:7001');

describe('Check routes', function() {

  it('should response with statusCode 200', function(done) {

    request.get('/api/v1/ping').expect(200).end(done());

  });

});
