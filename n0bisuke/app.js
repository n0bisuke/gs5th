/**
 * 最終コミットを知る
 */

'use strict'

const Git = require("nodegit");
const PATH = '../.git';

let getMostRecentCommit = (repository) => {
  return repository.getBranchCommit("master");
};

let getCommitMessage = (commit) => {
  return commit;
};

Git.Repository.open(PATH)
  .then(getMostRecentCommit)
  .then(getCommitMessage)
  .then((commit) => {
    console.log(commit.message());
    console.log(commit.author().name());
  });