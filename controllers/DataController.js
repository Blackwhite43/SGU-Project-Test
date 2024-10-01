const DataModel = require('../model/DataModel'); //Import sampleModel from Model folder
const factory = require('./handlerFactory');
const catchAsync = require("../utils/catchAsync");

exports.get_all = factory.getAll(DataModel); // factory.(choose_function)(Model)
exports.delete_all = factory.deleteAll(DataModel); // factory.(choose_function)(Model)
exports.create_one = factory.createOne(DataModel); // factory.(choose_function)(Model)
exports.mass_create = catchAsync(async (req, res, next) => {
    await DataModel.deleteMany();
    const data = req.body;
    await DataModel.create(data);
    // console.log(data);
    res.status(201).json({
        status: 'success'
    })
})

exports.query = catchAsync(async (req, res, next) => {
    const data = await DataModel.create({
        jenis_kelamin: "Laki-Laki"
    });
    res.status(200).json({
        status: 'success',
        data: data
    })
})