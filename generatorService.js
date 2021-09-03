const pdftk = require("node-pdftk");
const persons = [
    {
        FirstName: 'Nikola',
        LastName: 'Dukanac',
        Sex: 'Männlich',
        PcrSex: 'male',
        Street: 'Flutstr.',
        HouseNumber: '5',
        Postcode: '12439',
        City: 'Berlin',
        BirthDate: '20.05.1985',
        MobileNumber: '015204915060',
        Email: 'mail@nikolad.uk',
        Passport: '014782086'
  }
];
module.exports = {
GetFastTest:function async (person, report) {

    const sourcePdf = './PDF/brzi_fields.pdf';
    const fieldMap = {
        'FirstName':person.FirstName,
        'LastName':person.LastName,
        'Sex':person.Sex,
        'Street':person.Street,
        'HouseNumber':person.HouseNumber,
        'Postcode':person.Postcode,
        'City':person.City,
        'BirthDate':person.BirthDate,
        'MobileNumber':person.MobileNumber,
        'Email':person.Email,
        'TakenAt':report.SampleTakenAt + ' ' + report.SampleTakenAtTime
      };
     
        return pdftk
        .input(sourcePdf)
        .fillForm(fieldMap)
        .needAppearances()
        .flatten()
        .output("./PDF/"+person.FirstName+'_'+person.LastName+"_CovidTest.pdf")
        .then(pdfBuffer => pdfBuffer)
        .catch(err => { 
            throw err;
         });
    },
GetPCRTest:function async (person, report) {

        const sourcePdf = './PDF/pcr_fields.pdf';
        const fieldMap = {
            'FirstLastName':person.FirstName+' '+person.LastName,
            'StreetAndNumber':person.Street+' '+person.HouseNumber,
            'PostcodeAndCity':person.Postcode+' '+person.City,
            'OrderCode':getRandomInt(100000000),
            'PatientId':getRandomInt(1000000),
            'BirthDateAndSex':person.BirthDate+' / '+ person.PcrSex,
            'PassportNumber':person.Passport,
            'ReportFrom':customFormatDate(report.FinalReportFrom),
            'TakenAtDateTime':customFormatDate(report.SampleTakenAt)+ ' '+report.SampleTakenAtTime,
            'TakenAtDate':customFormatDate(report.SampleTakenAt)
          };
         
            return pdftk
            .input(sourcePdf)
            .fillForm(fieldMap)
            .needAppearances()
            .flatten()
            .output("./PDF/"+person.FirstName+'_'+person.LastName+"_PCR.pdf")
            .then(pdfBuffer => pdfBuffer)
            .catch(err => { 
                throw err;
             });
        },
CreatePerson:function (request){
    var person = persons.find(x => x.FirstName === request.FirstName && x.LastName === request.LastName);
    if(!person)
    {
        person = {
            FirstName: request.FirstName,
            LastName: request.LastName,
            Sex: request.Sex,
            PcrSex:request.PcrSex,
            Street: request.Street,
            HouseNumber:request.HouseNumber,
            Postcode:request.Postcode,
            City: request.City,
            BirthDate: request.BirthDate,
            MobileNumber: request.MobileNumber,
            Email: request.Email,
            Passport: request.Passport
        }
    }
    return person;
},
GetPersons:function (){
    console.log("get users");
    return persons;
}
}
function customFormatDate(date) {
    return [date.split('.')[2], date.split('.')[1], date.split('.')[0]].join('-');
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }