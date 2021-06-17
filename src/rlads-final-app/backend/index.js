'use strict';

const express = require('express');
const cors = require('cors');
const child_process = require('child_process');

const PORT = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:3000'];


const execReviewTfidf = async (query, cb) => {
  const exec = child_process.exec;
  const R_File_Path = './Rscripts/ex_review_tfidf.R';
  const R_Parameters = `${query.i} ${query.n} ${query.st} ${query.ed}`;
  const cmd = 'Rscript' + ' ' + R_File_Path + ' ' + R_Parameters;

  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.error('ex-review-tfidf throws error', error);
      return cb(stderr, null)
    }
    console.error('ex-review-tfidf success result');
    return cb(null, stdout)
  })
}

const execWordFilter = async (query, cb) => {
  const exec = child_process.exec;
  const R_File_Path = './Rscripts/ex_word_filter.R';
  const R_Parameters = `${query.w} ${query.t} ${query.n} ${query.s}`;
  const cmd = 'Rscript' + ' ' + R_File_Path + ' ' + R_Parameters;

  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.error('ex-word-filter throws error', error);
      return cb(stderr, null)
    }
    console.error('ex-word-filter success result');
    return cb(null, stdout)
  })
}

const execRatingTfidf = async (cb) => {
  const exec = child_process.exec;
  const R_File_Path = './Rscripts/ex_rating_tfidf.R';
  const R_Parameters = '';
  const cmd = 'Rscript' + ' ' + R_File_Path + ' ' + R_Parameters;

  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.error('ex-rating-tfidf throws error', error);
      return cb(stderr, null)
    }
    console.error('ex-rating-tfidf success result');
    return cb(null, stdout)
  })
}

const execMultiType = async (query, cb) => {
  const exec = child_process.exec;
  const R_File_Path = './Rscripts/ex_multi_type.R';
  const R_Parameters = `${query.t} ${query.n}`;
  const cmd = 'Rscript' + ' ' + R_File_Path + ' ' + R_Parameters;

  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.error('ex-multi-type throws error', error);
      return cb(stderr, null)
    }
    console.error('ex-multi-type success result');
    return cb(null, stdout)
  })
}

const execMultiRating = async (query, cb) => {
  const exec = child_process.exec;
  const R_File_Path = './Rscripts/ex_multi_rating.R';
  const R_Parameters = `${query.r} ${query.n}`;
  const cmd = 'Rscript' + ' ' + R_File_Path + ' ' + R_Parameters;

  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.error('ex-multi-rating throws error', error);
      return cb(stderr, null)
    }
    console.error('ex-multi-rating success result');
    return cb(null, stdout)
  })
}

run().catch((err) => console.log(err));

async function run() {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  )
  
  // app.get('/api', async function(req, res) {
  //   console.log("Got /events");
  //   let input = req.query.input;
  //   console.log(`Got input: ${input}`);
  //   res.set({
  //     'Cache-Control': 'no-cache',
  //     'Content-Type': 'text/event-stream',
  //     Connection: 'keep-alive',
  //   });
  //   res.flushHeaders();

  //   // Tell the client to retry every 10 seconds if connectivity is lost
  //   res.write('retry: 10000\n\n');

  //   res.write(`data: {"status" : "server_get_msg"}\n\n`);
  //   res.write(`data: {"return" : "hello ${input}"}\n\n`)
  // })

  app.get('/ex-review-tfidf', async function(req, res) {
    await execReviewTfidf(req.query, function(error, result) {
      if (error) {
        return res.send(error);
      }
      console.log("Return: ", result)
      return res.send(result)
    })
  })

  app.get('/ex-word-filter', async function(req, res) {
    await execWordFilter(req.query, function(error, result) {
      if (error) {
        return res.send(error);
      }
      console.log("Return: ", result)
      return res.send(result)
    })
  })

  app.get('/ex-rating-tfidf', async function(req, res) {
    await execRatingTfidf(function(error, result) {
      if (error) {
        return res.send(error);
      }
      console.log("Return: ", result)
      return res.send(result)
    })
  })

  app.get('/ex-multi-type', async function(req, res) {
    await execMultiType(req.query, function(error, result) {
      if (error) {
        return res.send(error);
      }
      console.log("Return: ", result)
      return res.send(result)
    })
  })

  app.get('/ex-multi-rating', async function(req, res) {
    await execMultiRating(req.query, function(error, result) {
      if (error) {
        return res.send(error);
      }
      console.log("Return: ", result)
      return res.send(result)
    })
  })

  await app.listen(PORT, () => {
    console.log('Listening on port 4000');
  });
}

