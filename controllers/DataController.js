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
    // Can only run one function at one time please uncomment only one function 

    // .find() below means "select * from DataModel"
    // const data = await DataModel.find();

    // .find({}) example below means "select * from DataModel where ipk >= 3.4"
    // const data = await DataModel.find({
    //     ipk: {$gte: 3.4}
    // });

    // Create Data, also can create many data like insertMany (use [] array)
    // const data = await DataModel.create([
        // {
            // nim: "2506594521",
            // nama: "random_name",
            // program_studi: "Master of Information Technology",
            // jenis_kelamin: "Laki-Laki",
            // no_telepon: "+6285265412397",
            // ipk: 4
        // },
        // {
            // nim: "2506594521",
            // nama: "random_name",
            // program_studi: "Master of Information Technology",
            // jenis_kelamin: "Perempuan",
            // no_telepon: "+6285265412397",
            // ipk: 4
        // }
    // ]);


    // Mass Insert Data into MongoDB (Should be more faster than create)
    // const data = await DataModel.insertMany([
    //     {
    //         nim: "2506594521",
    //         nama: "random_name",
    //         program_studi: "Master of Information Technology",
    //         jenis_kelamin: "Laki-Laki",
    //         no_telepon: "+6285265412397",
    //         ipk: 4
    //     },
    //     {
    //         nim: "2506594521",
    //         nama: "random_name",
    //         program_studi: "Master of Information Technology",
    //         jenis_kelamin: "Perempuan",
    //         no_telepon: "+6285265412397",
    //         ipk: 4
    //     }
    // ]);

    // Find by MongoDB ID and Delete, change "66fb57492963f8b509abd80c" with the data ID in your MongoDB data
    // const data = await DataModel.findByIdAndDelete("66fb57492963f8b509abd80c");

    // Find by MongoDB ID and update, change "66cec24ad39c547d16506c93" with the data ID in your MongoDB data
    // const data = await DataModel.findByIdAndUpdate("66cec24ad39c547d16506c93", {
    //     $set: {
    //         program_studi: "Master of Information Technology"
    //     }
    // });

    // Aggregate the data and count the total value
    const data = await DataModel.aggregate([
        {
            '$group': {
                '_id': '$program_studi', 
                'total': {
                    '$sum': 1
                },
                'Average GPA': {
                    '$avg': '$ipk'
                }
            }
        },
        {
            '$sort': {
                'Average GPA': -1
            }
        }
    ])
    res.status(200).json({
        status: 'success',
        data: data
    })
})