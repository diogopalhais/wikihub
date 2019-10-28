'use strict';

const {
  promisify
} = require('util');
const path = require('path');
const fs = require('fs-extra');
const recReadDir = promisify(require('recursive-readdir'));
const elasticlunr = require('elasticlunr');
const Matcher = require('./matcher');

const EXCLUSIONS = ['node_modules'];

class Indexer {
  constructor(basePath) {
    this.basePath = basePath;
    this.index = elasticlunr(function () {
      this.setRef('file');
      this.addField('filename');
      this.addField('content');
    });
    this.files = [];
  }

  indexFiles() {
    return recReadDir(this.basePath, EXCLUSIONS).then(files => {
      files = files.filter(file => Matcher.isMarkdown(file));
      files = files.filter(file => {
        // Filter files/folder starting with a "."
        file = path.relative(this.basePath, file);
        const pathComponents = file.split(path.sep);
        return !pathComponents.some(c => c.length && c[0] === '.');
      });
      return Promise.all(files.map(this.updateIndexForFile.bind(this)));
    });
  }

  updateIndexForDeletedFile(file) { 
    const filePath = path.relative(this.basePath, file);
    //delete all -filePath
    var index = this.files.indexOf(filePath);
    while (index > -1) {
      this.files.splice(index, 1);
      index = this.files.indexOf(filePath);
    }
  }

  updateIndexForFile(file) {
    const filePath = path.relative(this.basePath, file);
    console.log("updateIndexForFile :" + file)
    this.files.push(filePath);

    return fs.readFile(path.join(this.basePath, filePath), 'utf8')
      .then(content => {
        const doc = {
          file: filePath,
          filename: path.basename(filePath, path.extname(filePath)),
          content
        };
        this.index[this.index.documentStore.hasDoc(filePath) ? 'updateDoc' : 'addDoc'](doc);
        return doc;
      });
  }

  getContent(file) {
    return this.index.documentStore.getDoc(file).content;
  }

  getFiles() {
    console.log(this.files)
    return this.files;
  }

  search(string) {
    return this.index.search(string, {
      expand: true
    });
  }
}

module.exports = Indexer;
