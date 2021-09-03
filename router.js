const generatePdf = require('./generatorService');
const Koa = require("koa");
const router = require("@koa/router")();
const bodyParser = require("koa-bodyparser");
const send = require('koa-send');
const serve = require('koa-static');
const  path = require('path');
const  fs = require('fs');
const { Console } = require('console');

const app = new Koa();

app.use(bodyParser());
//app.use(serve(__dirname + '/public'));//for development!!!
app.use(serve(__dirname + '../../my-app/dist'));


router.get('/', (ctx, next) => {
next();
  });
  router.get('/alive', (ctx, next) => {
    ctx.body = {
     message: 'server alive',
     time: new Date(),
    };
    ctx.status = 200;
   })

router.post("/api/pcr", async (ctx, next) => {
    if(ctx.request.body && Object.keys(ctx.request.body).length === 0)
    {
        ctx.throw(400,'Bad request, body is empty!');
    }
    var person = generatePdf.CreatePerson(ctx.request.body.user);
        var report = {
            FinalReportFrom :  ctx.request.body.user.FinalReportFrom,//'30.08.2021',
            SampleTakenAt : ctx.request.body.user.SampleTakenAt,//'31.08.2021',
            SampleTakenAtTime : ctx.request.body.user.SampleTakenAtTime//'12:34:54'
        };
    
        const pdfBuffer = await generatePdf.GetPCRTest(person, report);
    
        ctx.type = 'application/pdf';
        ctx.body = pdfBuffer;}
).post("/api/fast", async (ctx, next) => {
    if(ctx.request.body && Object.keys(ctx.request.body).length === 0)
    {
        ctx.throw(400,'Bad request, body is empty!');
    }
    var person = generatePdf.CreatePerson(ctx.request.body.user);
    var report = {
        SampleTakenAt: ctx.request.body.user.SampleTakenAt,//'27.05.2021',
        SampleTakenAtTime: ctx.request.body.user.SampleTakenAtTime//'10:41:23'
        };

    const pdfBuffer = await generatePdf.GetFastTest(person, report);
    
    ctx.type = 'application/pdf';
    ctx.body = pdfBuffer;}
).get("/api/users", async (ctx, next) => {
        ctx.body = generatePdf.GetPersons();
    }
);


app.use(router.routes());
//app.listen(3080);//development
const port = process.env.port || 8080;
app.listen(port);

