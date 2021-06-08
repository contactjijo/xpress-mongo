var PostsModel = require('../models/postsModel.js');

/**
 * postsController.js
 *
 * @description :: Server-side logic for managing postss.
 */

const filter = {}
const projection = {
    __v: false,
    _id: true,
};
const options = {};

module.exports = {

    /**
     * postsController.list()
     */
    list: async (req, res) => {
        await PostsModel.find(filter, projection, options, (err, posts) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting posts.',
                    error: err
                });
            }

            return res.json(posts);
        });
    },

    /**
     * postsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PostsModel.findOne({ _id: id }, projection, options, function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting posts.',
                    error: err
                });
            }

            if (!posts) {
                return res.status(404).json({
                    message: 'No such posts'
                });
            }

            return res.json(posts);
        });
    },

    /**
     * postsController.create()
     */
    create: function (req, res) {
        var posts = new PostsModel({
            title: req.body.title,
            description: req.body.description
        });

        posts.save(function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating posts',
                    error: err
                });
            }

            return res.status(201).json(posts);
        });
    },

    /**
     * postsController.update()
     */
    update: async (req, res) => {
        var id = req.params.id;

        await PostsModel.findOne({ _id: id }, function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting posts',
                    error: err
                });
            }

            if (!posts) {
                return res.status(404).json({
                    message: 'No such posts'
                });
            }

            posts.title = req.body.title ? req.body.title : posts.title;
            posts.description = req.body.description ? req.body.description : posts.description;

            posts.save(filter, projection, options, function (err, posts) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating posts.',
                        error: err
                    });
                }

                return res.json(posts);
            });
        });
    },

    /**
     * postsController.remove()
     */
    remove: async (req, res) => {
        var id = req.params.id;

        await PostsModel.findByIdAndRemove(id, function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the posts.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
