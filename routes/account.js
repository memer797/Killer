let router = require('express').Router();

const sendNoAuth = (req, res) => {
	try {
		if(req.method.toLowerCase() === 'get') {
			res.send('login');	
		}else{
			res.json({
				error: true,
				type: 'account',
				authorized: false,
				alert: true,
				message: {
					type: 'warning',
					content: 'not authorise'
				},
			});
		}
	} catch {
		res.json({
				error: true,
				type: 'server',
				authorized: null,
				alert: true,
				message: {
					type: 'error',
					content: 'Internal Server Error :/ Talk with developers'
				},
			});
	}
}
const checkAuth = async (req, res, next) => {
	try{ 
	if(!req?.cookies?.userToken?.trim()){
		sendNoAuth(req, res);
		return;
	}
	} catch {
	}
}

router.use(checkAuth);

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
