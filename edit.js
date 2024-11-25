const { application } = require("express");
const { db } = require("./models/UserModel");

const getaJobs = expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const Job = query.Job || "";
    const pageSize = query.pageSize || 10;

    const functionalFilter = functional ? { functional } : {};

    const sortJob = Job === "is_featured" ? { createdAt: -1 } : { _id: -1 };

    const Jobs = await Jobs.find({
        ...functionalFilter,
    })
        .populate("title")
        .sort(sortJob)
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    const countJobs = await Job.countDocuments({
        ...functionalFilter,
    });

    res.json({
        Job,
        countJobs,
        page,
        pages: Math.ceil(countJobs / pageSize),
        catch(error) {
            throw new Error(error);
        }
    });
});


app.get('/books',(req,res) =>{
    const page = req.query.page || 0
    const booksPerPage = 3
    let books = []
    db.collection('books')
    .find()
    .sort({author:1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error: "Not"})
    })
});
const getJobsList = asyncHandler(async (req, res) => {
    try {
      const allJobs = await Jobs.find();
      res.json(allJobs);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getaJobsList = asyncHandler(async (req, res) => {
    try {
    const page = req.query.page || 0
    const booksPerPage = 3
    let books = []
    await Jobs.find()
    .sort({author:1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    res.json(books)
    } catch (error) {
        throw new Error(error);
    }
});