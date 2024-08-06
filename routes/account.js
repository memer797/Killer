let router = require('express').Router();
let db = {
	
};
router.use('*', async(req, res, next) => {
  next();
});

router.get('/', async(req, res) => {
	res.send('@account "/"');
});

router.get('/settings', async(req, res) => {
	res.json({ error: false, data: {
		name: 'sujoy',
		username: 'duplicate2991',
		userId: 1234567890,
	}});
});

router.post('/settings', async(req, res) => {
	let newData = {
		name: "Sujoy",
		username: "sujoy2991",
		lastUpdated: Date.now(), 
		};
	db.save('userId', newData);
	res.json({
		error: false,
		data: {
			name: "Sujoy",
			username: "sujoy2991",
			userId: 1234567890,
			lastUpdated: Date.now(),
			},
		alert: true, 
		message: { 
			type: 'success', 
			content: "Profile Saved Successfully" 
			}
	 });
});

module.exports = router;
