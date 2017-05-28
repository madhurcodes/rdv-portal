/**
 * Created by Nikhil on 22/05/17.
 */
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const authorize = require('./controllers/adminController');
const sessionController = require('./controllers/sessionController');
const teamController = require('./controllers/teamController');
const categoryController = require('./controllers/categoryController');
const venueController = require('./controllers/venueController');

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use('/*' ,express.static('client/build'));
}

app.use(bodyParser.json());

app.post('/api/admin/login', sessionController.login);
app.get('/api/admin/validate-token', sessionController.validateToken);

app.get('/api/team', teamController.getTeam);
app.get('/api/team/:email', teamController.getTeamMember);
app.post('/api/admin/team', authorize('fest', 'add_team'), teamController.addTeamMember);
app.post('/api/admin/team/:email', authorize('fest', 'update_team'), teamController.updateTeamMember);
app.delete('/api/admin/team/:email', authorize('fest', 'update_team') ,teamController.deleteTeamMember);
app.post('/api/admin/update-permissions/:email', authorize('perms', 'update_perms'), teamController.updatePermissions);
app.post('/api/admin/self-update', authorize('self-update'), teamController.selfUpdate);

app.get('/api/category', categoryController.getCategories);
app.post('/api/admin/category', authorize('fest', 'manage_event_categories'), categoryController.addCategory);
app.delete('/api/admin/category/:key', authorize('fest', 'manage_event_categories'), categoryController.deleteCategory);

app.get('/api/venue', venueController.getVenues);
app.post('/api/admin/venue', authorize('fest', 'manage_venues'), venueController.addVenue);
app.delete('/api/admin/venue/:venue', authorize('fest', 'manage_venues'), venueController.deleteVenue);

app.listen(app.get('port'),function(){
    console.log("Started listening on port", app.get('port'));
});