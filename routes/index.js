const usersRoute = require('./apis/users')
const beneficiariesRoute = require('./apis/beneficiaries')
const estatesRoute = require('./apis/estates')
const financialsRoute = require('./apis/financials')
const personsRoute = require('./apis/persons')
const documentsRoute = require('./apis/documents')


module.exports = (app) => {
  
    usersRoute(app);
    beneficiariesRoute(app);
    estatesRoute(app);
    financialsRoute(app);
    personsRoute(app);
    documentsRoute(app);
   
}