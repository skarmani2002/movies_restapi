'use strict';
const Joi = require("joi");
const debug = require("../libs/debug")('file-upload-handler');
const error = require("../libs/debug")('file-upload-handler:error');
const errors = require("../errors/response-errors");
const _ = require("underscore");
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);

const validations = {
    fileStorageName: Joi.compile({
        fileStorageName: Joi.string().required()
    }),
    destination: Joi.compile({
        destination: Joi.string().required()
    })
};


/*
*
* ---------------- Usage Example ------------------
* For single file => uploadUserImages('field_name')
* For indexed array of files => uploadUserImages({name: 'field_name', maxCount: 12})
* For key/value array of files => uploadUserImages([{name: 'avatar', maxCount: 1}, { name: 'gallery', maxCount: 8}])
*
* */
const uploadMedia = (media, options) => {
    options.overrideExisting = options.overrideExisting || true;
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let directory = global.constants.PHOTO;
            if (fs.existsSync(directory)) {
                cb(null, directory)
            } else {
                debug(`creating dir: ${directory}`);
                mkdir(directory).then(() => {
                    debug(`created dir: ${directory}`);
                    cb(null, directory)
                }).catch((err) => {
                    error(`exception creating dir: ${directory} ${err}`);
                    error('destination folder could not be created.');
                    console.log('destination folder is invalid.22');
                    return cb(errors.getError('ESS42208'), false);
                });
            }
        },
        filename: function (req, file, cb) {
            let fileStorageName = options.name(req);
            if (!fileStorageName) {
                console.log('###file name is invalid.');
                return cb(errors.getError('ESS42208'), false);
            }
            let name = file.originalname.substr(0, file.originalname.lastIndexOf('.'));
            let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
            if (options.overrideExisting) {
                //cb(null, (!_.isEmpty(fileStorageName)) ? fileStorageName + ext : file.originalname)
                cb(null, (fileStorageName || name) + '-' + (new Date()).getTime() + ext)
            } else {
                cb(null, (fileStorageName || name) + '-' + (new Date()).getTime() + ext)
            }
            req.body.photo = fileStorageName;
        },
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    });
    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            //options.allowedFile.join('|')
            // accept image only
           
            cb(null, true);
        }
    });
    return upload.single(media);
    
};
const uploadPhoto = (media,option) => {
    return uploadMedia(media, {
        name: (req) => {
            try {
                let name = req.body.name;
                return name;
            } catch (e) {
		        console.log("uploaderrorv2e",e);
                return false;
            }
        },
        destination: (req) => {
            try {
                let dest = `photo`;
                return dest;
            } catch (e) {
                return false;
            }
        },
        allowedFile: ['jpeg','jpg','png']
    });
};


module.exports = uploadPhoto;
