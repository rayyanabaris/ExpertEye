const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const AES = require("./utils/aes256")
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const UserRouter = require("./routes/UserRoute");
const JobsRouter = require("./routes/JobsRoute");
const SkillsRouter = require("./routes/JobSkillsRoute");
const CountriesRouter = require("./routes/CountriesRoute");
const StatesRouter = require("./routes/StatesRoute");
const CitiesRouter = require("./routes/CitiesRoute");
const CurrencyRouter = require("./routes/CurrenciesRoute");
const CompaniesRouter = require("./routes/CompaniesRoute");
const SalaryRouter = require("./routes/SalaryPeriodRoute");
const CarrierRouter = require("./routes/CarrierRoute");
const FunAreaRouter = require("./routes/FunAreaRoute");
const JobTypeRouter = require("./routes/JobTypeRoute");
const JobShiftRouter = require("./routes/JobShiftRoute");
const GenderRouter = require("./routes/GenderRoute");
const ExperienceRouter = require("./routes/JobExpRoute");
const DegreeRouter = require("./routes/DegreeLevelRoute");
const LanguagesRouter = require("./routes/LanguagesRoute");
const IndustriesRouter = require("./routes/IndustriesRoute");
const DegreeTypeRouter = require("./routes/DegreeTypeRoute");
const MajorSubjectRouter = require("./routes/MajorSubRoute");
const ResultTypeRouter = require("./routes/ResultTypeRoute");
const MaritalStatusRouter = require("./routes/MaritalStatusRoute");
const OwnershipRouter = require("./routes/OwnershipRoute");
const QuizQuestionRouter = require("./routes/QuizQuestionRoute");
const QuizAnswerRouter = require("./routes/QuizAnswerRoute");
const QuizResultRouter = require("./routes/QuizResultRoute");
const UploadRouter = require("./routes/UploadsRoute");

const ApplyJob = require("./routes/ApplyJobsRoutes");



const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/skills", SkillsRouter);
app.use("/api/carrier", CarrierRouter);
app.use("/api/cities", CitiesRouter);
app.use("/api/company", CompaniesRouter);
app.use("/api/countries", CountriesRouter);
app.use("/api/functional-area", FunAreaRouter);
app.use("/api/jobs", JobsRouter);
app.use("/api/job-type", JobTypeRouter);
app.use("/api/job-shift", JobShiftRouter);
app.use("/api/states", StatesRouter);
app.use("/api/salary-period", SalaryRouter);
app.use("/api/degree-level", DegreeRouter);
app.use("/api/currency", CurrencyRouter);
app.use("/api/gender", GenderRouter);
app.use("/api/job-experience", ExperienceRouter);
app.use("/api/language", LanguagesRouter);
app.use("/api/industries", IndustriesRouter);
app.use("/api/result-type", ResultTypeRouter);
app.use("/api/degree-type", DegreeTypeRouter);
app.use("/api/major-subject", MajorSubjectRouter);
app.use("/api/marital-status", MaritalStatusRouter);
app.use("/api/ownership", OwnershipRouter);
app.use("/api/quiz-question", QuizQuestionRouter);
app.use("/api/quiz-answer", QuizAnswerRouter);
app.use("/api/quiz-result", QuizResultRouter);
app.use("/api/upload", UploadRouter);
app.use("/api/user", UserRouter);
app.use("/api/apply", ApplyJob);

app.post('/aes-encrypt', async(req,res,next)=>{
  let data = AES.encrypt(JSON.stringify(req.body),"b3885c485dc58d47687c99ff6a4de54846911fe87cd5bc76c2b02c33a5a67735", "92df48d25386f2ec3a28eef0b908635c");
  res.json(data)
})

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT http://localhost:${PORT}`);
});
