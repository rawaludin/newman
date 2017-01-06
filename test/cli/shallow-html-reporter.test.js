var fs = require('fs');

describe('HTML reporter', function () {
    var outFile = 'out/newman-report.html';

    beforeEach(function (done) {
        fs.stat('out', function (err) {
            if (err) {
                return fs.mkdir('out', done);
            }

            done();
        });
    });

    afterEach(function (done) {
        fs.stat(outFile, function (err) {
            if (err) {
                return done();
            }

            fs.unlink(outFile, done);
        });
    });

    it('should correctly generate the html report for a successful run', function (done) {
        exec(`node ./bin/newman.js run test/cli/single-get-request.json -r html --reporter-html-export ${outFile}`,
        function (code) {
            expect(code).be(0);
            fs.stat(outFile, done);
        });
    });

    it('should correctly generate the html report for a failed run', function (done) {
        exec(`node ./bin/newman.js run test/cli/single-request-failing.json -r html --reporter-html-export ${outFile}`,
        function (code) {
            expect(code).be(1);
            fs.stat(outFile, done);
        });
    });

    it('should correctly produce the html report for a run with TypeError', function (done) {
        exec(`node ./bin/newman.js run test/cli/html-report-test.json -r html --reporter-html-export ${outFile}`,
        function (code) {
            expect(code).be(1);
            fs.stat(outFile, done);
        });
    });
});
