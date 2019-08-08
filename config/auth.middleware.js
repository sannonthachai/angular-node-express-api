module.exports = {
    ensureAuthenticated: async (req, res, next) => {
        try {
            if (req.cookies['jwt']) {
                return next()
            }
            
            return res.status(401).json({ message: "Please login to view that resource" })
        }
        
        catch (err) {
            return next(err)
        }
    },
    forwardAuthenticated: async (req, res, next) => {
        try {
            if (!req.cookies['jwt']) {
                return next()
            }

            return res.status(301).redirect('http://localhost:4200/')
        }

        catch (err) {
            return next(err)
        }
    }
}